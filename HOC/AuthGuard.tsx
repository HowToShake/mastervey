import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@hooks/useAuth";

export function AuthGuard({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  if (user) {
    return <>{children}</>;
  }

  return null;
}
