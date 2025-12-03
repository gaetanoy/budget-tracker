import * as Styled from "./App.styles";
import Summary from "../../molecules/Summary/Summary";
import { Movements } from "../../molecules/Movements/Movements";

export default function App() {
  return (
    <Styled.Wrapper>
      <Summary amount={-1.0} />
      <h1>Liste des dépenses</h1>
      <Movements
        items={[
          { value: -45, label: "Groceries", category: "Food" },
          { value: 120, label: "Freelance", category: "Income" },
          { value: 0, label: "No movement", category: null },
          { value: 300, label: "Salary", category: null },
        ]}
      />
    </Styled.Wrapper>
  );
}
