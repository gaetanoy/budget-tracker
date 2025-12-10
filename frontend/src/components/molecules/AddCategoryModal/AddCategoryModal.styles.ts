import styled from "styled-components";

const colors = {
  dark: "#2a2a2a",
  beigeBg: "#F7F3E8",
  white: "#ffffff",
  accentBlue: "#0056b3",
  lightGrey: "#e0e0e0",
};

// ... (Garde tes composants Backdrop, Modal, Title, Form existants ici) ...

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Modal = styled.div`
  background: ${colors.beigeBg};
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 3px solid ${colors.dark};
  box-shadow: 6px 6px 0px ${colors.dark};
  animation: slideUp 0.3s ease-out;
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const Title = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 1.8rem;
  color: ${colors.dark};
  font-weight: 800;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Input = styled.input`
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid ${colors.dark};
  background: ${colors.white};
  font-size: 1rem;
  color: ${colors.dark};
  font-weight: 500;
  transition: all 0.2s;

  &::placeholder {
    color: #888;
  }
  &:focus {
    outline: none;
    border-color: ${colors.accentBlue};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.1);
  }
`;

export const ColorInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SubmitButton = styled.button`
  padding: 16px;
  border-radius: 12px;
  background-color: ${colors.dark};
  color: ${colors.white};
  border: 3px solid ${colors.dark};
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 8px;

  &:hover {
    background-color: ${colors.accentBlue};
    border-color: ${colors.accentBlue};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 86, 179, 0.3);
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  color: ${colors.dark};
  border: 2px solid ${colors.dark};
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: rgba(42, 42, 42, 0.05);
    border-color: #000;
  }
`;

export const EmojiPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const EmojiDisplayButton = styled.button`
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid ${colors.dark};
  background: ${colors.white};
  font-size: 1rem;
  color: ${colors.dark};
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #fafafa;
    border-color: ${colors.accentBlue};
  }

  span.placeholder {
    color: #888;
    font-weight: 400;
  }
`;

export const EmojiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  padding: 12px;
  background: ${colors.white};
  border: 2px solid ${colors.dark};
  border-radius: 12px;
  max-height: 150px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.dark};
    border-radius: 4px;
  }
`;

export const EmojiItem = styled.button<{ $isSelected: boolean }>`
  background: ${(props) =>
    props.$isSelected ? colors.beigeBg : "transparent"};
  border: ${(props) =>
    props.$isSelected
      ? `2px solid ${colors.accentBlue}`
      : "1px solid transparent"};
  font-size: 1.5rem;
  padding: 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.2);
    background: #f0f0f0;
  }
`;
