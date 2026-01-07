import type { Transaction } from "../../../types/Transaction";

export type SummaryProps = {
  data: Transaction[];
  globalBalance: number;
  activeTab: "all" | "expense" | "income";
};
