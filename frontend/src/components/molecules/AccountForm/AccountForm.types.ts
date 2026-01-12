import type { BankResponse } from "../../../api/bank";

export interface AccountFormProps {
  banks: BankResponse[];
  onSubmit: (name: string, bankId: number) => void;
  onCancel?: () => void;
  initialName?: string;
  initialBankId?: number;
  isEditing?: boolean;
}
