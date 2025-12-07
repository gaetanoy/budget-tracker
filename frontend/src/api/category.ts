import fetchApi, { getAuthHeaders } from "./fetch";

export interface CategoryCreate {
  name: string;
  color: string;
  icon: string;
}

export interface CategoryUpdate {
  name: string;
  color: string;
  icon: string;
}

export interface CategoryResponse {
  id: number;
  name: string;
  color: string | null;
  icon: string | null;
}

export interface MessageResponse {
  message: string;
}

export interface CategoryGuessRequest {
  transaction_description: string;
}

export interface CategoryGuessResponse {
  category: string;
}

export async function createCategory(
  category: CategoryCreate,
  getAuth: () => string,
): Promise<CategoryResponse> {
  return await fetchApi(
    "/categories/create",
    "post",
    category,
    "application/json",
    getAuthHeaders(getAuth),
  );
}

export async function getCategories(
  getAuth: () => string,
): Promise<CategoryResponse[]> {
  return await fetchApi(
    "/categories",
    "get",
    undefined,
    "application/json",
    getAuthHeaders(getAuth),
  );
}

export async function removeCategory(
  id: number,
  getAuth: () => string,
): Promise<MessageResponse> {
  return await fetchApi(
    `/categories/${id}`,
    "delete",
    undefined,
    "application/json",
    getAuthHeaders(getAuth),
  );
}

export async function modifyCategory(
  id: number,
  data: CategoryUpdate,
  getAuth: () => string,
): Promise<CategoryResponse> {
  return await fetchApi(
    `/categories/${id}`,
    "patch",
    data,
    "application/json",
    getAuthHeaders(getAuth),
  );
}

export async function autoCategorize(
  guess: CategoryGuessRequest,
  getAuth: () => string,
): Promise<CategoryGuessResponse> {
  return await fetchApi(
    "/categories/auto-categorize",
    "post",
    guess,
    "application/json",
    getAuthHeaders(getAuth),
  );
}
