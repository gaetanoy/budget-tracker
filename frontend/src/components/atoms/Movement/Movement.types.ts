import type { Transaction } from "../../../types/Transaction";
export type MovementProps = Transaction & {
  onDelete: () => void;
  onEdit: () => void;
};
