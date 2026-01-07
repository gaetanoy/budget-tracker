import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import * as Styled from "./Summary.styles";
import { Card } from "../../atoms/Card/Card";
import { CategoryBubbles } from "../CategoryBubbles/CategoryBubbles";
import type { SummaryProps } from "./Summary.types";

export default function Summary({
  data,
  globalBalance,
  activeTab,
}: SummaryProps) {
  // 1. Calculer le montant central
  let centerAmount = 0;
  let centerLabel = "";
  let centerColor = "#2a2a2a";

  if (activeTab === "all") {
    centerAmount = globalBalance;
    centerLabel = "Solde Actuel";
    centerColor = centerAmount >= 0 ? "#2a2a2a" : "#ff6b6b";
  } else {
    centerAmount = data.reduce((acc, m) => acc + m.amount, 0);
    centerLabel = activeTab === "income" ? "Revenus" : "Dépenses";
    centerColor = activeTab === "income" ? "#2ecc71" : "#ff6b6b";
  }

  // 2. Préparer les données graphiques
  const aggregatedData = data.reduce((acc, curr) => {
    const categoryName = curr.category?.title || "Autres";
    const color = curr.category?.color || "#ccc";
    const amount = Math.abs(curr.amount);

    const existing = acc.find((item) => item.name === categoryName);
    if (existing) {
      existing.value += amount;
    } else {
      acc.push({ name: categoryName, value: amount, color });
    }
    return acc;
  }, [] as { name: string; value: number; color: string }[]);

  const isGraphEmpty = aggregatedData.length === 0;
  const graphData = isGraphEmpty
    ? [{ name: "Vide", value: 1, color: "#e0e0e0" }]
    : aggregatedData;

  return (
    <Card>
      <Styled.ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={graphData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              paddingAngle={isGraphEmpty ? 0 : 5}
              dataKey="value"
              cornerRadius={isGraphEmpty ? 0 : 8}
              stroke="none"
            >
              {graphData.map(
                (
                  entry: { name: string; value: number; color: string },
                  index: number
                ) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                )
              )}

              <Label
                value={`${centerAmount.toFixed(2)} €`}
                position="center"
                dy={0}
                style={{
                  fontSize: "28px",
                  fill: centerColor,
                  fontWeight: "800",
                  fontFamily: "Inter, sans-serif",
                }}
              />
              <Label
                value={centerLabel}
                position="center"
                dy={25}
                style={{
                  fontSize: "14px",
                  fill: "#888",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              />
            </Pie>
            {!isGraphEmpty && (
              <Tooltip formatter={(value: number) => `${value.toFixed(2)} €`} />
            )}
          </PieChart>
        </ResponsiveContainer>
      </Styled.ChartContainer>

      {/* AJOUT DES BULLES ICI */}
      <CategoryBubbles movements={data} type={activeTab} />
    </Card>
  );
}
