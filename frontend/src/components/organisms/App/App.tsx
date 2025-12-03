import * as Styled from "./App.styles";
import Summary from "../../molecules/Summary/Summary";
import { Movements } from "../../molecules/Movements/Movements";
import type { MovementProps } from "../../atoms/Movement/Movement.types";

export default function App() {
  const movements: MovementProps[] = [
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
    {
      value: 300,
      label: "Salary",
      category: null,
      date: new Date("2025-01-31"),
    },
    {
      value: 300,
      label: "Salary",
      category: null,
      date: new Date("2025-12-02"),
    },
  ]; // TODO API Call

  return (
    <Styled.Wrapper>
      <Summary
        amount={movements
          .map((mov) => mov.value)
          .reduce((acc, movValue) => acc + movValue)}
      />
      <h1>Liste des dépenses</h1>
      <Movements items={movements} />
    </Styled.Wrapper>
  );
}
