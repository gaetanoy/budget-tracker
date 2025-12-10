import type { Transaction } from "../../atoms/Movement/Movement.types";

export type MovementsProps = {
  items: Transaction[];
  onDelete: (movement: Transaction) => void;
  onEdit: (movement: Transaction) => void;
};
