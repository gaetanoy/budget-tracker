import styled from "styled-components";

// Le conteneur global qui fait toute la page
export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fcfcfc;
`;

// --- SECTION GAUCHE (60%) ---
export const LeftSection = styled.div`
  width: 60%;
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  padding: 40px 40px 80px 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #e0e0e0;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
`;

// --- SECTION DROITE (40%) ---
export const RightSection = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 30px;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.02);
`;

// Conteneur des boutons en haut à droite
export const ActionsHeader = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;

  /* CORRECTION ICI : Centrer les boutons */
  justify-content: center;

  flex-shrink: 0;
`;

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 15px;
`;

export const SortButton = styled.button<{ $active?: boolean }>`
  background-color: #faf6ee;
  color: #2a2a2a;
  margin-inline-start: 25px;

  border: 2px solid #2a2a2a;
  border-radius: 14px;
  box-shadow: 4px 4px 0px #2a2a2a;

  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  ${({ $active }) =>
    $active &&
    `
    background-color: #efe8d8;
    transform: translate(2px, 2px);
    box-shadow: inset 2px 2px 4px rgba(0,0,0,0.25);
  `}

  &:hover {
    ${({ $active }) =>
      !$active &&
      `
      background-color: #fff;
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0px #2a2a2a;
    `}
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25);
  }
`;

// Conteneur de l'historique avec Scrollbar
export const HistoryScrollArea = styled.div`
  flex: 1; /* Prend tout l'espace restant */
  min-height: 0;
  overflow-y: auto; /* Scroll vertical */

  width: 100%; /* Prend toute la largeur disponible */
  padding-right: 8px; /* Espace pour la scrollbar */
  padding-bottom: 40px; /* Marge en bas pour ne pas coller le dernier élément */

  /* Scrollbar stylisée */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
`;

// --- ELEMENTS EXISTANTS (Réutilisés) ---

export const ControlButton = styled.button`
  /* Mêmes couleurs que le Summary */
  background-color: #f7f3e8;
  color: #2a2a2a;

  /* Bordure et Ombre "Dure" */
  border: 2px solid #2a2a2a;
  border-radius: 12px;
  box-shadow: 4px 4px 0px #2a2a2a;

  /* Typographie */
  padding: 12px 20px;
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;

  /* Animation */
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: #ffffff; /* S'éclaircit légèrement au survol */
    transform: translate(-2px, -2px); /* Se déplace vers le haut/gauche */
    box-shadow: 6px 6px 0px #2a2a2a; /* L'ombre grandit */
  }

  &:active {
    transform: translate(2px, 2px); /* S'enfonce comme un bouton physique */
    box-shadow: 0px 0px 0px #2a2a2a; /* L'ombre disparaît */
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 12px;
  width: fit-content;
  /* L'ombre disparaît quand le bouton est actif (effet enfoncé) */
  box-shadow: 4px 4px 0px #2a2a2a;
  border: 2px solid #2a2a2a;
  border-radius: 12px;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  /* 1. Couleurs & Fond */
  /* Si actif : Fond Noir / Texte Beige. Si inactif : Fond Beige / Texte Noir */
  background-color: ${({ $active }) => ($active ? "#2a2a2a" : "#F7F3E8")};
  color: ${({ $active }) => ($active ? "#F7F3E8" : "#2a2a2a")};

  /* 2. Bordures & Ombres */
  border: 2px solid #2a2a2a;
  border-radius: 12px;

  /* L'ombre disparaît quand le bouton est actif (effet enfoncé) */
  box-shadow: ${({ $active }) =>
    $active ? "inset 2px 2px 5px rgba(0,0,0,0.2)" : "4px 4px 0px #2a2a2a"};

  /* 3. Typographie */
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;

  /* 4. Position & Animation */
  /* Si actif, on le déplace physiquement vers le bas à droite pour simuler l'appui */
  transform: ${({ $active }) =>
    $active ? "translate(2px, 2px)" : "translate(0, 0)"};
  transition: all 0.15s ease-in-out;

  &:hover {
    /* Au survol (seulement si non actif), on lève légèrement le bouton */
    ${({ $active }) =>
      !$active &&
      `
      background-color: #ffffff;
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0px #2a2a2a;
    `}
  }
`;
