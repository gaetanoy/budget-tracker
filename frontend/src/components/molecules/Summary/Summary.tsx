import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from "recharts";
import styled from "styled-components";
import type { MovementProps } from "../../atoms/Movement/Movement.types";
import { CategoryBubbles } from "../CategoryBubbles/CategoryBubbles"; // <--- Import des bulles

// --- STYLES ---
const Card = styled.div`
  background-color: #F7F3E8;
  border: 3px solid #2a2a2a;
  border-radius: 16px;
  box-shadow: 6px 6px 0px #2a2a2a;
  padding: 20px;
  width: 100%;
  height: auto; /* Changement ici : hauteur automatique pour contenir les bulles */
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 300px; /* On fixe la hauteur du graph car le parent est en auto */
  margin-bottom: 20px;
`;

// --- TYPES ---
type Props = {
  data: MovementProps[];
  globalBalance: number;
  activeTab: 'all' | 'expense' | 'income';
};

export default function Summary({ data, globalBalance, activeTab }: Props) {

  // 1. Calculer le montant central
  let centerAmount = 0;
  let centerLabel = "";
  let centerColor = "#2a2a2a";

  if (activeTab === 'all') {
    centerAmount = globalBalance;
    centerLabel = "Solde Actuel";
    centerColor = centerAmount >= 0 ? "#2a2a2a" : "#ff6b6b";
  } else {
    centerAmount = data.reduce((acc, m) => acc + m.value, 0);
    centerLabel = activeTab === 'income' ? "Revenus" : "Dépenses";
    centerColor = activeTab === 'income' ? "#2ecc71" : "#ff6b6b";
  }

  // 2. Préparer les données graphiques
  const aggregatedData = data.reduce((acc, curr) => {
    const categoryName = curr.category?.title || "Autres";
    const color = curr.category?.color || "#ccc";
    const amount = Math.abs(curr.value);

    const existing = acc.find((item) => item.name === categoryName);
    if (existing) {
      existing.value += amount;
    } else {
      acc.push({ name: categoryName, value: amount, color });
    }
    return acc;
  }, [] as { name: string; value: number; color: string }[]);

  const isGraphEmpty = aggregatedData.length === 0;
  const graphData = isGraphEmpty ? [{ name: "Vide", value: 1, color: "#e0e0e0" }] : aggregatedData;

  return (
    <Card>

      <ChartContainer>
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
              {graphData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}

              <Label
                value={`${centerAmount.toFixed(2)} €`}
                position="center"
                dy={0}
                style={{ fontSize: '28px', fill: centerColor, fontWeight: '800', fontFamily: 'Inter, sans-serif' }}
              />
              <Label
                value={centerLabel}
                position="center"
                dy={25}
                style={{ fontSize: '14px', fill: '#888', fontWeight: '600', textTransform: 'uppercase' }}
              />
            </Pie>
            {!isGraphEmpty && <Tooltip formatter={(value: number) => `${value.toFixed(2)} €`} />}
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* AJOUT DES BULLES ICI */}
      <CategoryBubbles movements={data} type={activeTab} />

    </Card>
  );
}