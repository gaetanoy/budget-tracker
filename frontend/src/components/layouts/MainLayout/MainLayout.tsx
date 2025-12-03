import { Outlet } from "react-router";
import Navigation from "../../molecules/Navigation/Navigation";
import * as Styled from "./MainLayout.styles";

export default function MainLayout() {
  return (
    <Styled.LayoutWrapper>
      <Navigation />
      <Styled.Main>
        <Outlet />
      </Styled.Main>
    </Styled.LayoutWrapper>
  );
}
