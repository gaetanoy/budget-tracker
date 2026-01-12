import { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import {
  getProfile,
  login as apiLogin,
  logout as apiLogout,
  type ProfileResponse,
  type UserLogin,
} from "../../api/auth";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<ProfileResponse | null>(null);

  const getAuthNonNull = () => {
    const auth = localStorage.getItem("authorization");
    if (auth === null) {
      throw new Error("Authorization shouldn't be null here");
    }
    return auth;
  };

  // Fetch user profile on mount if token exists
  useEffect(() => {
    const auth = localStorage.getItem("authorization");
    if (auth && !user) {
      getProfile(getAuthNonNull)
        .then(setUser)
        .catch(() => {
          localStorage.removeItem("authorization");
          setUser(null);
        });
    }
  }, []);

  const login = async (login: UserLogin) => {
    const token = await apiLogin(login);
    const authorization = `Bearer ${token.access_token}`;
    localStorage.setItem("authorization", authorization);
    const profile = await getProfile(() => authorization);
    setUser(profile);
  };

  const logout = async () => {
    await apiLogout();
    localStorage.removeItem("authorization");
    setUser(null);
  };

  const getAuth = () => {
    return localStorage.getItem("authorization");
  };

  return (
    <AuthContext
      value={{
        user,
        getAuthorization: getAuth,
        getAuthorizationNonNull: getAuthNonNull,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
}
