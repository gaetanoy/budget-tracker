import { useNavigate } from "react-router";
import * as Styled from "./Account.styles.ts";
import { IoPerson } from "react-icons/io5";

export default function Account() {
  const navigate = useNavigate();

  // Données simulées (Hardcoded pour le test UI)
  const mockUser = {
    username: "TestUser",
    email: "test@exemple.com",
    id: 1,
  };

  const handleLogout = () => {
    // Simulation de déconnexion
    alert("Déconnexion (Simulation)");
    navigate("/");
  };

  return (
    <Styled.Container>
      <Styled.ProfileCard>
        <Styled.Avatar>
          <IoPerson />
        </Styled.Avatar>

        <h2 style={{ margin: 0, textTransform: "uppercase" }}>Mon Profil</h2>

        <Styled.InfoGroup>
          <Styled.Label>Nom d'utilisateur</Styled.Label>
          <Styled.Value>{mockUser.username}</Styled.Value>
        </Styled.InfoGroup>

        <Styled.InfoGroup>
          <Styled.Label>Email</Styled.Label>
          <Styled.Value>{mockUser.email}</Styled.Value>
        </Styled.InfoGroup>

        <Styled.ButtonGroup>
          <Styled.ActionButton onClick={() => navigate("/")} $variant="neutral">
            Retour à l'accueil
          </Styled.ActionButton>

          <Styled.ActionButton onClick={handleLogout} $variant="danger">
            Se déconnecter
          </Styled.ActionButton>
        </Styled.ButtonGroup>

      </Styled.ProfileCard>
    </Styled.Container>
  );
}