import styled from "styled-components";

export const Container = styled.div<{ amount: number }>`
  background-color: #eaf4ff;
  border: 3px solid #2a2a2a;
  border-radius: 14px;

  padding: 16px 22px;
  width: fit-content;

  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.5px;

  color: ${({ amount }) =>
    amount > 0 ? "green" : amount < 0 ? "red" : "gray"};
`;
