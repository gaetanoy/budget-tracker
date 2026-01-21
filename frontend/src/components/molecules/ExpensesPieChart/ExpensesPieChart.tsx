import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import styled from "styled-components";
import type { Transaction } from "../../../types/Transaction";

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  /* On retire le fond beige et les bordures pour un look plus "App" comme l'image 1 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  data: Transaction[];
  title?: string; // Gardé pour compatibilité mais on l'affiche différemment
};

export const ExpensesPieChart: React.FC<Props> = ({ data, title }) => {
  const aggregatedData = data.reduce(
    (acc, curr) => {
      // On prend la valeur absolue pour le camembert
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
    },
    [] as { name: string; value: number; color: string }[],
  );

  const totalAmount = aggregatedData.reduce((acc, item) => acc + item.value, 0);

  if (aggregatedData.length === 0) {
    return <p style={{ color: "#aaa", marginTop: 20 }}>Pas de données</p>;
  }

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={aggregatedData}
            cx="50%"
            cy="50%"
            innerRadius={80} // Anneau plus fin
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            cornerRadius={10} // Bords arrondis comme sur l'image
          >
            {aggregatedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}

            {/* Texte au centre du Donut */}
            <Label
              value={title?.split(" ")[0] || "Total"}
              position="center"
              dy={-10}
              style={{ fontSize: "14px", fill: "#666", fontWeight: 600 }}
            />
            <Label
              value={`${totalAmount.toFixed(0)} €`}
              position="center"
              dy={15}
              style={{ fontSize: "24px", fill: "#2a2a2a", fontWeight: "800" }}
            />
          </Pie>
          <Tooltip
            formatter={(value: number) => `${value.toFixed(2)} €`}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
