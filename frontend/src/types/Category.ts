export type Category = {
  id: number;
  title: string;
  color: string;
  icon: string;
};

export const DEFAULT_CATEGORY: Category = {
  id: 1,
  title: "Aucune catégorie",
  color: "#E0E0E0",
  icon: "❓",
};
