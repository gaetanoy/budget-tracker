export interface AccountCardProps {
  id: number;
  name: string;
  bankName: string;
  bankIcon: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}
