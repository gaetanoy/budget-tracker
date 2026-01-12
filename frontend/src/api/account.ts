import fetchApi, { getAuthHeaders } from "./fetch";

export interface AccountCreate {
  name: string;
  bank_id: number;
}

export interface AccountUpdate {
  name?: string;
  bank_id?: number;
}

export interface AccountResponse {
  id: number;
  name: string;
  user_id: number;
  bank_id: number;
}

export interface MessageResponse {
  message: string;
}

export async function createAccount(
  account: AccountCreate,
  getAuth: () => string
): Promise<AccountResponse> {
  return await fetchApi(
    "/accounts/create",
    "post",
    account,
    "application/json",
    getAuthHeaders(getAuth)
  );
}

export async function getAccounts(
  getAuth: () => string
): Promise<AccountResponse[]> {
  return await fetchApi(
    "/accounts/",
    "get",
    undefined,
    "application/json",
    getAuthHeaders(getAuth)
  );
}

export async function removeAccount(
  account_id: number,
  getAuth: () => string
): Promise<MessageResponse> {
  return await fetchApi(
    `/accounts/${account_id}`,
    "delete",
    undefined,
    "application/json",
    getAuthHeaders(getAuth)
  );
}

export async function modifyAccount(
  account_id: number,
  data: AccountUpdate,
  getAuth: () => string
): Promise<AccountResponse> {
  return await fetchApi(
    `/accounts/${account_id}`,
    "patch",
    data,
    "application/json",
    getAuthHeaders(getAuth)
  );
}
