import fetchApi, { getAuthHeaders } from "./fetch";

export interface UserCreate {
  email: string;
  username: string;
  password: string;
}

export interface UserLogin {
  identifier: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface ProfileResponse {
  email: string;
  username: string;
  id: number;
}

export async function register(create: UserCreate) {
  await fetchApi("/auth/register", "post", create, "application/json");
}

export async function login(login: UserLogin): Promise<Token> {
  return await fetchApi("/auth/login", "post", login, "application/json");
}

export async function logout() {
  await fetchApi("/auth/logout", "post", undefined, "application/json");
}

export async function getProfile(
  getAuth: () => string,
): Promise<ProfileResponse> {
  return await fetchApi(
    "/auth/account",
    "get",
    undefined,
    "application/json",
    getAuthHeaders(getAuth),
  );
}
