import type { Category } from "../../../types/Category";
import type { MovementProps } from "../../atoms/Movement/Movement.types";

export type AddMovementModalProps = {
  onAdd: (movement: MovementProps) => void;
  onClose: () => void;
  categories: Category[];
};
