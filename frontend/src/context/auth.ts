import { createContext, use } from "react";
import type { UserLogin } from "../api/auth";

export interface UseAuth {
  getAuthorization(): string | null;
  getAuthorizationNonNull(): string;

  login(data: UserLogin): Promise<void>;
  logout(): Promise<void>;
}

export const AuthContext = createContext<UseAuth | null>(null);

export function useAuth(): UseAuth {
  const ctx = use(AuthContext);
  if (ctx === null) {
    throw new Error("called hook useAuth not in an AuthProvider");
  }
  return ctx;
}
