import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

export const ControlButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px;
  transition: color 0.1s ease-in-out;

  &:hover {
    color: black;
  }
`;
