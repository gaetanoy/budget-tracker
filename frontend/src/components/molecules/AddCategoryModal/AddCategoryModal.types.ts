import type { Category } from "../../../types/Category";

export type AddCategoryModalProps = {
  onAdd: (category: Category) => void;
  onClose: () => void;
};
