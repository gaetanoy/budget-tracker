import React, { useState } from "react";
import * as Styled from "./App.styles";
import Summary from "../../molecules/Summary/Summary";
import { Movements } from "../../molecules/Movements/Movements";
import type { MovementProps } from "../../atoms/Movement/Movement.types";
import { AddMovementModal } from "../../molecules/AddMovementModal/AddMovementModal";
import type { Category } from "../../../types/Category";

export default function App() {
  const [categories] = useState<Category[]>([
    { title: "Courses", color: "#FFD700", icon: "🛒" },
    { title: "Loyer", color: "#FF4500", icon: "🏠" },
    { title: "Salaire", color: "#32CD32", icon: "💰" },
    { title: "Loisirs", color: "#87CEEB", icon: "🎉" },
    { title: "Transport", color: "#808080", icon: "🚌" },
    { title: "Santé", color: "#FF69B4", icon: "❤️" },
  ]); // TODO API Call

  const [movements, setMovements] = useState<MovementProps[]>([
    {
      value: -45,
      label: "Groceries",
      category: categories[0],
      date: new Date("2025-12-03"),
    },
    {
      value: 120,
      label: "Freelance",
      category: categories[2],
      date: new Date("2025-01-12"),
    },
    {
      value: 0,
      label: "No movement",
      category: undefined,
      date: new Date("2025-12-03"),
    },
  ]); // TODO API Call

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addMovement = (mov: MovementProps) => {
    setMovements((prev) => [...prev, mov]);
    setIsModalOpen(false);
  };

  return (
    <Styled.Wrapper>
      <Summary amount={movements.reduce((acc, m) => acc + m.value, 0)} />
      <h1>Liste des mouvements</h1>

      <Styled.ControlButton onClick={() => setIsModalOpen(true)}>
        Ajouter un mouvement
      </Styled.ControlButton>

      {isModalOpen && (
        <AddMovementModal
          onClose={() => setIsModalOpen(false)}
          onAdd={addMovement}
          categories={categories}
        />
      )}
      <Movements items={movements} />
    </Styled.Wrapper>
  );
}
