import * as Styled from "./App.styles";
import Summary from "../../molecules/Summary/Summary";
import { Movements } from "../../molecules/Movements/Movements";
import type { MovementProps } from "../../atoms/Movement/Movement.types";
import { useState } from "react";
import { AddMovementModal } from "../../molecules/AddMovementModal/AddMovementModal";

export default function App() {
  const [movements, setMovements] = useState<MovementProps[]>([
    {
      value: -45,
      label: "Groceries",
      category: "Food",
      date: new Date("2025-12-03"),
    },
    {
      value: 120,
      label: "Freelance",
      category: "Income",
      date: new Date("2025-01-12"),
    },
    {
      value: 0,
      label: "No movement",
      category: null,
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
      <h1>Liste des dépenses</h1>
      <button onClick={() => setIsModalOpen(true)}>+</button>

      {isModalOpen && (
        <AddMovementModal
          onClose={() => setIsModalOpen(false)}
          onAdd={addMovement}
        />
      )}
      <Movements items={movements} />
    </Styled.Wrapper>
  );
}
