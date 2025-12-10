import styled from "styled-components";

const colors = {
  dark: "#2a2a2a",
  beigeBg: "#F7F3E8",
  white: "#ffffff",
  accentBlue: "#0056b3",
};

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  animation: fadeIn 0.15s ease-out;

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
  max-width: 420px;

  border: 3px solid ${colors.dark};
  box-shadow: 6px 6px 0px ${colors.dark};

  display: flex;
  flex-direction: column;
  gap: 24px;

  animation: slideUp 0.25s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
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

  &:focus {
    outline: none;
    border-color: ${colors.accentBlue};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.15);
  }
`;

export const Select = styled.select`
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid ${colors.dark};
  background: ${colors.white};
  font-size: 1rem;
  color: ${colors.dark};
  font-weight: 500;

  cursor: pointer;
`;

export const SubmitButton = styled.button`
  padding: 16px;
  border-radius: 12px;
  background: ${colors.dark};
  color: white;

  border: 3px solid ${colors.dark};

  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${colors.accentBlue};
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

  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(42, 42, 42, 0.05);
  }
`;
