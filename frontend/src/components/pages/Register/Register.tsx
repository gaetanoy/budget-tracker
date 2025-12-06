import { useState } from "react";
import { useNavigate, Link } from "react-router";
import * as Styled from "./Register.styles";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulation d'inscription réussie
    console.log("Inscription:", { username, email, password });

    alert("Compte créé avec succès ! Veuillez vous connecter.");
    navigate("/login");
  };

  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.Title>Inscription</Styled.Title>

        <Styled.Form onSubmit={handleSubmit}>
          <Styled.Input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Styled.Input
            type="email"
            placeholder="Email"
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

          <Styled.Button type="submit">Créer mon compte</Styled.Button>
        </Styled.Form>

        <Styled.FooterText>
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </Styled.FooterText>
      </Styled.Card>
    </Styled.Container>
  );
}