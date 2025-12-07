import { AuthContext } from "../../context/auth";
import {
  login as apiLogin,
  logout as apiLogout,
  type UserLogin,
} from "../../api/auth";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const login = async (login: UserLogin) => {
    const token = await apiLogin(login);
    const authorization = `Bearer ${token.access_token}`;
    localStorage.setItem("authorization", authorization);
  };

  const logout = async () => {
    await apiLogout();
    localStorage.removeItem("authorization");
  };

  const getAuth = () => {
    return localStorage.getItem("authorization");
  };

  const getAuthNonNull = () => {
    const auth = getAuth();
    if (auth === null) {
      throw new Error("Authorization shouldn't be null here");
    }
    return auth;
  };

  return (
    <AuthContext
      value={{
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
