import type { Transaction } from "../../../types/Transaction";

export type MovementsProps = {
  items: Transaction[];
  onDelete: (movement: Transaction) => void;
  onEdit: (movement: Transaction) => void;
};
