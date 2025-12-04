import styled from "styled-components";

const colors = {
  dark: "#2a2a2a",
  beigeBg: "#F7F3E8",
  white: "#ffffff",
  accentBlue: "#0056b3",
  accentBlueHover: "#004494",
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

export const Select = styled.select`
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid ${colors.dark};
  background: ${colors.white};
  font-size: 1rem;
  color: ${colors.dark};
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%232a2a2a%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem top 50%;
  background-size: 0.65rem auto;

  &:focus {
    outline: none;
    border-color: ${colors.accentBlue};
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.1);
  }
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
  margin-top: -8px;

  &:hover {
    background: rgba(42, 42, 42, 0.05);
    border-color: #000;
  }
`;
