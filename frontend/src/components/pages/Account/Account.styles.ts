import styled from "styled-components";

const colors = {
  dark: "#2a2a2a",
  beigeBg: "#F7F3E8",
  white: "#ffffff",
  red: "#ff6b6b",
  blue: "#007bff",
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  width: 100%;
  height: 100%;
`;

export const ProfileCard = styled.div`
  background: ${colors.beigeBg};
  border: 3px solid ${colors.dark};
  border-radius: 16px;
  box-shadow: 6px 6px 0px ${colors.dark};
  padding: 40px;
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const Avatar = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${colors.dark};
  color: ${colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  border: 2px solid ${colors.dark};
`;

export const InfoGroup = styled.div`
  text-align: center;
  width: 100%;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 16px;

  &:last-of-type {
    border-bottom: none;
  }
`;

export const Label = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin: 0 0 6px 0;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 700;
`;

export const Value = styled.p`
  font-size: 1.3rem;
  color: ${colors.dark};
  font-weight: 800;
  margin: 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-top: 10px;
`;

export const ActionButton = styled.button<{ $variant?: "danger" | "neutral" }>`
  padding: 14px;
  background-color: ${({ $variant }) => ($variant === "danger" ? colors.red : colors.white)};
  color: ${({ $variant }) => ($variant === "danger" ? "white" : colors.dark)};
  border: 2px solid ${colors.dark};
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.1s ease;
  box-shadow: 3px 3px 0px ${colors.dark};

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 4px 4px 0px ${colors.dark};
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px ${colors.dark};
  }
`;