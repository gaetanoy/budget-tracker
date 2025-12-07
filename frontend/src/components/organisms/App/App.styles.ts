import styled from "styled-components";

// Le conteneur global qui fait toute la page
export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh; /* Prend toute la hauteur de l'écran */
  overflow: hidden; /* Empêche le scroll global, on veut scroller dans les zones */
  background-color: #fcfcfc;
`;

// --- SECTION GAUCHE (60%) ---
export const LeftSection = styled.div`
  width: 60%;
  height: 100%;
  padding: 40px;
  overflow-y: auto; /* Scroll si le contenu dépasse */
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #e0e0e0; /* Petite séparation visuelle */
`;

// --- SECTION DROITE (40%) ---
export const RightSection = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 30px;
  box-shadow: -5px 0 15px rgba(0,0,0,0.02); /* Ombre légère pour la profondeur */
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
  background: #2a2a2a; /* Changement style pour être plus visible */
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 12px 20px;
  border-radius: 10px;
  transition: transform 0.1s ease, background 0.2s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  &:hover {
    background: #000;
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  background-color: #e0e0e0;
  padding: 4px;
  border-radius: 12px;
  width: fit-content;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background-color: ${({ $active }) => ($active ? "#2a2a2a" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#666")};
  box-shadow: ${({ $active }) => ($active ? "0px 2px 4px rgba(0,0,0,0.2)" : "none")};

  &:hover {
    color: ${({ $active }) => ($active ? "#ffffff" : "#000")};
  }
`;