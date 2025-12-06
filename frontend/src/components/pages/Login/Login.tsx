import { useState } from "react";
import { useNavigate, Link } from "react-router"; // react-router v7 (ou react-router-dom v6)
import * as Styled from "./Login.styles";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulation de connexion réussie
    console.log("Login avec:", email, password);

    // On simule le stockage d'un token
    localStorage.setItem("token", "fake-jwt-token");

    // Redirection vers le Dashboard (Accueil)
    navigate("/");
  };

  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.Title>Connexion</Styled.Title>

        <Styled.Form onSubmit={handleSubmit}>
          <Styled.Input
            type="email"
            placeholder="Email (ex: test@test.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Styled.Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Styled.Button type="submit">Se connecter</Styled.Button>
        </Styled.Form>

        <Styled.FooterText>
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </Styled.FooterText>
      </Styled.Card>
    </Styled.Container>
  );
}