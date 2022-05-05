import React, { createContext, FC, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import nookies from "nookies";

export type ContextState = {
  user: (User & { accessToken: string }) | null;
  signup?: (email: string, password: string) => Promise<UserCredential>;
  login?: (email: string, password: string) => Promise<UserCredential>;
  logout?: () => Promise<void>;
  resetPassword?: (password: string) => Promise<void>;
};

const AuthContext = createContext<ContextState>({
  user: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signup = async (
    email: string,
    password: string
  ): Promise<UserCredential> =>
    await createUserWithEmailAndPassword(auth, email, password);

  const login = async (
    email: string,
    password: string
  ): Promise<UserCredential> =>
    await signInWithEmailAndPassword(auth, email, password);

  const logout = async (): Promise<void> => {
    await auth.signOut();
    nookies.set(undefined, "token", "", { path: "/" });
  };

  const resetPassword = (email: string): Promise<void> =>
    sendPasswordResetEmail(auth, email);

  useEffect(() => {
    return onAuthStateChanged(
      auth,
      async (user: (User & { accessToken: string }) | null) => {
        if (!user) {
          setUser(null);
          nookies.set(undefined, "token", "", { path: "/" });
        } else {
          const token = await user.getIdToken(true);
          setUser(user);
          nookies.set(undefined, "token", token, { path: "/" });
        }
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(true);
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  const value: ContextState = {
    user,
    login,
    signup,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
