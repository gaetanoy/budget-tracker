import { IoPersonCircle } from "react-icons/io5";
import styled from "styled-components"

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  font-size: 2em;
  padding: 0.1em;
  border: solid transparent 1px;
  background-color: transparent;
  color: black;
  transition: background-color .1s ease-out, color .1s ease-out;

  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }
`;

export default function MyAccount() {
  return (
    <Button type="button">
      <IoPersonCircle />
    </Button>
  );
}