import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  font-size: 2em;
  padding: 0.1em;
  border: solid transparent 1px;
  background-color: transparent;
  color: black;
  transition: background-color 0.1s ease-out, color 0.1s ease-out;

  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }
`;
