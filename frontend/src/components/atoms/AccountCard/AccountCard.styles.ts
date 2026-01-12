import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f3e8;
  border: 3px solid #2a2a2a;
  border-radius: 12px;
  box-shadow: 4px 4px 0px #2a2a2a;
  padding: 16px 20px;
  margin-bottom: 12px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const BankIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: contain;
  background-color: #fff;
  padding: 4px;
  border: 2px solid #2a2a2a;
`;

export const AccountDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AccountName = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #2a2a2a;
`;

export const BankName = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button<{ $variant?: "edit" | "delete" }>`
  background-color: ${({ $variant }) =>
    $variant === "delete" ? "#ff6b6b" : "#4ecdc4"};
  border: 2px solid #2a2a2a;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  color: #2a2a2a;
  box-shadow: 2px 2px 0px #2a2a2a;
  transition: all 0.2s ease;

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0px #2a2a2a;
  }

  &:active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0px #2a2a2a;
  }
`;
