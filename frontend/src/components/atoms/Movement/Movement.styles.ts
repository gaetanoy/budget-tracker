import styled from "styled-components";

export const Container = styled.div`
  background-color: #f7f1e4;
  border: 2px solid #2a2a2a;
  border-radius: 12px;
  padding: 12px 16px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #1e1e1e;
`;

export const Category = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
  color: #7a7a7a;
`;

export const Value = styled.div<{ value: number }>`
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 6px;

  color: ${({ value }) => (value > 0 ? "green" : value < 0 ? "red" : "gray")};
`;
