// AuthGuard.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export function AuthGuard({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    //auth is initialized and there is no user
    if (!user) {
      // redirect
      router.push("/login");
    }
  }, [router, user]);

  // if auth initialized with a valid user show protected page
  if (user) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
