import type { Category } from "../../../types/Category";

export type MovementProps = {
  value: number;
  label: string;
  date: Date;
  category?: Category;
};
