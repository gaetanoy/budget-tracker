import fetchApi, { getAuthHeaders } from "./fetch";

export interface BankResponse {
  id: number;
  name: string;
  icon: string;
}

export async function getBanks(getAuth: () => string): Promise<BankResponse[]> {
  return await fetchApi(
    "/banks/",
    "get",
    undefined,
    "application/json",
    getAuthHeaders(getAuth)
  );
}
