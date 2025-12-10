import type { Category } from "./Category";

export type Transaction = {
  id: string;
  amount: number;
  label: string;
  date: string;
  category: Category;
};
