import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SummaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  border-radius: 10px;
  padding: 0.5em;
  margin: 0.5em;
  font-size: 2em;
  font-weight: bold;
`;

function Summary() {
  return (
    <SummaryWrapper>
      <p>12.23 €</p>
    </SummaryWrapper>
  );
}

export default function App() {
  return (
    <Wrapper>
      <Summary />
      <h1>Liste des dépenses</h1>
    </Wrapper>
  );
}
