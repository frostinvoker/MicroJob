// Helper hook to get current user data from localStorage
import { useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "hire" | "work" | "both" | "admin" | "superadmin";
  phoneNumber?: string;
}

export const useAuth = (): AuthUser | null => {
  const readUser = () => {
    try {
      const stored = localStorage.getItem("auth_user");
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState<AuthUser | null>(() => readUser());

  useEffect(() => {
    const handleUpdate = () => setUser(readUser());
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("auth_user_updated", handleUpdate as EventListener);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("auth_user_updated", handleUpdate as EventListener);
    };
  }, []);

  return user;
};
