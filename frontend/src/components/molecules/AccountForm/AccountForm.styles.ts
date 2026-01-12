import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f7f3e8;
  border: 3px solid #2a2a2a;
  border-radius: 16px;
  box-shadow: 6px 6px 0px #2a2a2a;
  padding: 24px;
  margin-bottom: 20px;
`;

export const FormTitle = styled.h3`
  font-family: "Nunito", sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: #2a2a2a;
  margin: 0 0 8px 0;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-family: "Nunito", sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #2a2a2a;
`;

export const Input = styled.input`
  padding: 12px 16px;
  border: 3px solid #2a2a2a;
  border-radius: 10px;
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  background-color: #fff;
  outline: none;
  transition: box-shadow 0.2s ease;

  &:focus {
    box-shadow: 4px 4px 0px #2a2a2a;
  }
`;

export const BankSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 12px;
`;

export const BankOption = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 8px;
  border: 3px solid ${({ $selected }) => ($selected ? "#4ecdc4" : "#2a2a2a")};
  border-radius: 12px;
  background-color: ${({ $selected }) => ($selected ? "#4ecdc4" : "#fff")};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ $selected }) =>
    $selected ? "4px 4px 0px #2a2a2a" : "2px 2px 0px #2a2a2a"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 4px 4px 0px #2a2a2a;
  }
`;

export const BankIcon = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

export const BankName = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: #2a2a2a;
  text-align: center;
  line-height: 1.2;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background-color: #ffe66d;
  border: 3px solid #2a2a2a;
  border-radius: 10px;
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #2a2a2a;
  cursor: pointer;
  box-shadow: 4px 4px 0px #2a2a2a;
  transition: all 0.2s ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px #2a2a2a;
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #2a2a2a;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 4px 4px 0px #2a2a2a;
  }
`;

export const CancelButton = styled.button`
  padding: 14px 24px;
  background-color: #e0e0e0;
  border: 3px solid #2a2a2a;
  border-radius: 10px;
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #2a2a2a;
  cursor: pointer;
  box-shadow: 4px 4px 0px #2a2a2a;
  transition: all 0.2s ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px #2a2a2a;
  }
`;
