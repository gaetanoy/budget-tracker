import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as Styled from "./App.styles";
import Summary from "../../molecules/Summary/Summary";
import { Movements } from "../../molecules/Movements/Movements";
import type { MovementProps } from "../../atoms/Movement/Movement.types";
import { AddMovementModal } from "../../molecules/AddMovementModal/AddMovementModal";
import { AddCategoryModal } from "../../molecules/AddCategoryModal/AddCategoryModal";
import type { Category } from "../../../types/Category";

export default function App() {
  const navigate = useNavigate(); // <--- Hook navigation
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    { title: "Courses", color: "#FFD700", icon: "🛒" },
    { title: "Loyer", color: "#FF4500", icon: "🏠" },
    { title: "Salaire", color: "#32CD32", icon: "💰" },
    { title: "Loisirs", color: "#87CEEB", icon: "🎉" },
    { title: "Transport", color: "#808080", icon: "🚌" },
    { title: "Santé", color: "#FF69B4", icon: "❤️" },
  ]); // TODO API Call

  const [movements, setMovements] = useState<MovementProps[]>([
    {
      value: -45,
      label: "Groceries",
      category: categories[0],
      date: new Date("2025-12-03"),
    },
    {
      value: 120,
      label: "Freelance",
      category: categories[2],
      date: new Date("2025-01-12"),
    },
    {
      value: 0,
      label: "No movement",
      category: undefined,
      date: new Date("2025-12-03"),
    },
  ]); // TODO API Call

  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // 1. Vérification auth au chargement
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // <--- Redirection automatique si pas connecté
    } else {
      setIsAuthenticated(true);
      // fetchData(); // Décommentez quand on reconnectera l'API
    }
  }, [navigate]); // Ajouter navigate aux dépendances

  const addMovement = (mov: MovementProps) => {
    setMovements((prev) => [...prev, mov]);
    // POST API Call
    setIsMovementModalOpen(false);
  };

  const addCategory = (cat: Category) => {
    setCategories((prev) => [...prev, cat]);
    // POST API Call
    setIsCategoryModalOpen(false);
  };
  if (!isAuthenticated) return null;

  return (
    <Styled.Wrapper>
      <Summary amount={movements.reduce((acc, m) => acc + m.value, 0)} />
      <h1>Liste des mouvements</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <Styled.ControlButton onClick={() => setIsMovementModalOpen(true)}>
          Ajouter un mouvement
        </Styled.ControlButton>

        <Styled.ControlButton onClick={() => setIsCategoryModalOpen(true)}>
          Ajouter une catégorie
        </Styled.ControlButton>
      </div>

      {isMovementModalOpen && (
        <AddMovementModal
          onClose={() => setIsMovementModalOpen(false)}
          onAdd={addMovement}
          categories={categories}
        />
      )}

      {isCategoryModalOpen && (
        <AddCategoryModal
          onClose={() => setIsCategoryModalOpen(false)}
          onAdd={addCategory}
        />
      )}

      <Movements items={movements} />
    </Styled.Wrapper>
  );
}
