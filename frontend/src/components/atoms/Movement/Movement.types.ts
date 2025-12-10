import type { Category } from "../../../types/Category";

export type Transaction = {
  id: number;
  value: number;
  label: string;
  date: Date;
  category?: Category;
};
