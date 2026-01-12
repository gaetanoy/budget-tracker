import type { Account } from "./Account";
import type { Category } from "./Category";

export type Transaction = {
  id: number;
  amount: number;
  label: string;
  date: string;
  category: Category;
  account: Account;
};
