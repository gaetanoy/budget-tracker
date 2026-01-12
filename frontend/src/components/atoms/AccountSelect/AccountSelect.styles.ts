import styled from "styled-components";

export const Container = styled.div`
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

export const SelectWrapper = styled.div`
  position: relative;
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  padding-right: 40px;
  border: 3px solid #2a2a2a;
  border-radius: 10px;
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  background-color: #fff;
  cursor: pointer;
  appearance: none;
  outline: none;
  transition: box-shadow 0.2s ease;

  &:focus {
    box-shadow: 4px 4px 0px #2a2a2a;
  }
`;

export const Arrow = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 0.8rem;
`;
