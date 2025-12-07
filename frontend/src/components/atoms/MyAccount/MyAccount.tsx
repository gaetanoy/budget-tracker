import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router";
import * as Styled from "./MyAccount.styles";

export default function MyAccount() {
  const navigate = useNavigate();

  return (
    <Styled.Button
      type="button"
      onClick={() => navigate("/account")}
      title="Voir mon profil"
    >
      <IoPersonCircle />
    </Styled.Button>
  );
}
