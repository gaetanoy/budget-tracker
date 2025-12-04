import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 2px solid #2a2a2a;
`;

export const Title = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 1.5rem;
  color: #2a2a2a;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #333;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #555;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px;
  border-radius: 8px;
  background-color: #2a2a2a;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #444;
  }
`;

export const CloseButton = styled.button`
  background: #2a2a2a;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background: #444;
  }
`;
