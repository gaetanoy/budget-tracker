import type { AccountResponse } from "../../../api/account";
import type { BankResponse } from "../../../api/bank";

export interface AccountSelectProps {
  accounts: AccountResponse[];
  banks: BankResponse[];
  selectedAccountId: number | null;
  onChange: (accountId: number) => void;
  label?: string;
  required?: boolean;
}
