import fetchApi from "./fetch";

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
): Promise<CategoryResponse> {
  return await fetchApi(
    "/categories/create",
    "post",
    category,
    "application/json",
  );
}

export async function getCategories(): Promise<CategoryResponse[]> {
  return await fetchApi("/categories", "get");
}

export async function removeCategory(id: number): Promise<MessageResponse> {
  return await fetchApi(
    `/categories/${id}`,
    "delete",
    undefined,
    "application/json",
  );
}

export async function modifyCategory(
  id: number,
  data: CategoryUpdate,
): Promise<CategoryResponse> {
  return await fetchApi(`/categories/${id}`, "patch", data, "application/json");
}

export async function autoCategorize(
  guess: CategoryGuessRequest,
): Promise<CategoryGuessResponse> {
  return await fetchApi(
    "/categories/auto-categorize",
    "post",
    guess,
    "application/json",
  );
}
