import styled from "styled-components";

export const Container = styled.div`
  position: relative;
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

export const EditButton = styled.button`
  position: absolute;
  top: 8px;
  right: 48px;

  padding: 4px 8px;
  min-width: 32px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: white;
  color: #1e1e1e;
  font-size: 14px;
  font-weight: 700;
  border: 2px solid #1e1e1e;
  border-radius: 14px;

  box-shadow: 4px 4px 0px #1e1e1e;

  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px #1e1e1e;
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 2px 2px 0px #1e1e1e;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;

  padding: 4px 8px;
  min-width: 32px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: white;
  color: #1e1e1e;
  font-size: 14px;
  font-weight: 700;
  border: 2px solid #1e1e1e;
  border-radius: 14px;

  box-shadow: 4px 4px 0px #1e1e1e;

  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px #1e1e1e;
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 2px 2px 0px #1e1e1e;
  }
`;
