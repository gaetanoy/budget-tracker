import styled from "styled-components";
import type { Transaction } from "../../atoms/Movement/Movement.types";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
`;

const BubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
`;

const Label = styled.span`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 5px;
  font-weight: 600;
  white-space: nowrap;
`;

const Circle = styled.div<{ $color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ $color }) => `${$color}33`}; /* Opacité 20% approx */
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 5px;
  border: 2px solid ${({ $color }) => $color};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const Amount = styled.span<{ $isExpense: boolean }>`
  font-weight: 700;
  font-size: 0.9rem;
  color: ${({ $isExpense }) => ($isExpense ? "#ff6b6b" : "#2ecc71")};
`;

type Props = {
  movements: Transaction[];
  type: "expense" | "income" | "all";
};

export const CategoryBubbles = ({ movements, type }: Props) => {
  // 1. Agréger les données par catégorie
  const aggregated = movements.reduce((acc, curr) => {
    // Filtrage selon le type demandé
    if (type === "expense" && curr.value >= 0) return acc;
    if (type === "income" && curr.value <= 0) return acc;
    if (type === "all" && curr.value >= 0) return acc; // Par défaut "Tout" montre les dépenses

    const categoryId = curr.category?.title || "Autres";

    if (!acc[categoryId]) {
      acc[categoryId] = {
        title: categoryId,
        color: curr.category?.color || "#ccc",
        icon: curr.category?.icon || "?",
        total: 0,
      };
    }
    acc[categoryId].total += curr.value;
    return acc;
  }, {} as Record<string, { title: string; color: string; icon: string; total: number }>);

  const categories = Object.values(aggregated);

  if (categories.length === 0) return null;

  return (
    <Grid>
      {categories.map((cat) => (
        <BubbleContainer key={cat.title}>
          <Label>{cat.title}</Label>
          <Circle $color={cat.color}>{cat.icon}</Circle>
          <Amount $isExpense={cat.total < 0}>
            {Math.abs(cat.total).toFixed(0)} €
          </Amount>
        </BubbleContainer>
      ))}
    </Grid>
  );
};
