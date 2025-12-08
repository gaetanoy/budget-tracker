import { Outlet } from "react-router";
import * as Styled from "./MainLayout.styles";
import { useAuth } from "../../../context/auth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import MyAccount from "../../atoms/MyAccount/MyAccount";

export default function MainLayout() {
  const navigate = useNavigate();
  const { getAuthorization } = useAuth();

  useEffect(() => {
    if (getAuthorization() === null) {
      navigate("/login");
    }
  });

  return (
    <Styled.LayoutWrapper>
      <MyAccount />
      <Styled.Main>
        <Outlet />
      </Styled.Main>
    </Styled.LayoutWrapper>
  );
}
