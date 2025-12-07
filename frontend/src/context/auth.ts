import { createContext, useContext } from "react";
import type { UserLogin } from "../api/auth";

export interface UseAuth {
  getAuthorization(): string | null;

  login(data: UserLogin): Promise<void>;
  logout(): Promise<void>;
}

export const AuthContext = createContext<UseAuth | null>(null);

export function useAuth(): UseAuth {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("called hook useAuth not in an AuthProvider");
  }
  return ctx;
}
