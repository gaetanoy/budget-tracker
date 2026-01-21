import type { Transaction } from "../../../types/Transaction";

export type AddMovementModalProps = {
  onAdd: (movement: Omit<Transaction, "id">) => void;
  onClose: () => void;
};
