import styled from "styled-components";
import MyAccount from "./MyAccount";

const Wrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  width: 100%;
  padding: 0.5em;
  margin: 0.5em;
  background-color: whitesmoke;
  width: calc(100% - 4 * 0.5em);
  border-radius: 10px;
`;

export default function Navigation() {
  return (
    <Wrapper>
      <MyAccount />
    </Wrapper>
  )
}
