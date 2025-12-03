import { Outlet } from "react-router";
import styled from "styled-components";
import Navigation from "./Navigation";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Main = styled.main`
  height: 100%;
`;

export default function MainLayout() {
  return (
    <LayoutWrapper>
      <Navigation />
      <Main>
        <Outlet />
      </Main>
    </LayoutWrapper>
  );
}
