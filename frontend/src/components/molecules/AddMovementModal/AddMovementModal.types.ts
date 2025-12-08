import type { Transaction } from "../../atoms/Movement/Movement.types";

export type AddMovementModalProps = {
  onAdd: (movement: Omit<Transaction, "id">) => void;
  onClose: () => void;
};
