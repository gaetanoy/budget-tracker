import fetchApi, { getAuthHeaders } from "./fetch";

export interface TransactionCreate {
  amount: number;
  title: string;
  date: string; // YYYY-MM-DD
  category_id: number;
}

export interface TransactionUpdate {
  amount: number;
  title: string;
  date: string; // YYYY-MM-DD
  category_id: number;
}

export interface TransactionResponse {
  id: number;
  amount: number;
  title: string;
  date: string;
  category_id: number;
}

export interface MessageResponse {
  message: string;
}

export type TransactionType = "positive" | "negative";

export interface TransactionFilters {
  start_date?: string | null;
  end_date?: string | null;
  category_id?: number | null;
  transaction_type?: TransactionType | null;
  asc?: boolean;
}

export async function createTransaction(
  transaction: TransactionCreate,
  getAuth: () => string
): Promise<TransactionResponse> {
  return await fetchApi(
    "/transactions/create",
    "post",
    transaction,
    "application/json",
    getAuthHeaders(getAuth)
  );
}

export async function getTransactions(
  filters: TransactionFilters,
  getAuth: () => string
): Promise<TransactionResponse[]> {
  const params = new URLSearchParams();
  if (filters.start_date) params.set("start_date", filters.start_date);
  if (filters.end_date) params.set("end_date", filters.end_date);
  if (typeof filters.category_id === "number")
    params.set("category_id", String(filters.category_id));
  if (filters.transaction_type)
    params.set("transaction_type", filters.transaction_type);
  if (typeof filters.asc === "boolean") params.set("asc", String(filters.asc));

  const query = params.toString();
  const path = `/transactions${query ? `?${query}` : ""}`;

  return await fetchApi(
    path,
    "get",
    undefined,
    "application/json",
    getAuthHeaders(getAuth)
  );
}

export async function removeTransaction(
  transaction_id: number,
  getAuth: () => string
): Promise<MessageResponse> {
  return await fetchApi(
    `/transactions/${transaction_id}`,
    "delete",
    undefined,
    "application/json",
    getAuthHeaders(getAuth)
  );
}

export async function modifyTransaction(
  transaction_id: number,
  data: TransactionUpdate,
  getAuth: () => string
): Promise<TransactionResponse> {
  return await fetchApi(
    `/transactions/${transaction_id}`,
    "patch",
    data,
    "application/json",
    getAuthHeaders(getAuth)
  );
}
