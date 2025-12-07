import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as Styled from "./App.styles";

import Summary from "../../molecules/Summary/Summary";
import { Movements } from "../../molecules/Movements/Movements";
import type { MovementProps } from "../../atoms/Movement/Movement.types";
import { AddMovementModal } from "../../molecules/AddMovementModal/AddMovementModal";
import { AddCategoryModal } from "../../molecules/AddCategoryModal/AddCategoryModal";
import type { Category } from "../../../types/Category";
import { MonthYearPicker } from "../../molecules/MonthYearPicker/MonthYearPicker";

export default function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(12);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [activeTab, setActiveTab] = useState<'all' | 'expense' | 'income'>('all');

  const [categories, setCategories] = useState<Category[]>([
    { title: "Courses", color: "#FFD700", icon: "🛒" },
    { title: "Loyer", color: "#FF4500", icon: "🏠" },
    { title: "Salaire", color: "#32CD32", icon: "💰" },
    { title: "Loisirs", color: "#87CEEB", icon: "🎉" },
    { title: "Transport", color: "#808080", icon: "🚌" },
    { title: "Santé", color: "#FF69B4", icon: "❤️" },
    { title: "Cadeaux", color: "#ff8a80", icon: "🎁" },
    { title: "Famille", color: "#ba68c8", icon: "👶" },
  ]);

  const [movements, setMovements] = useState<MovementProps[]>([
    { value: -98, label: "Resto", category: categories[1], date: new Date("2025-12-03") },
    { value: -30, label: "Ciné", category: categories[3], date: new Date("2025-12-05") },
    { value: -89, label: "Navigo", category: categories[4], date: new Date("2025-12-01") },
    { value: -2500, label: "Loyer", category: categories[1], date: new Date("2025-12-01") },
    { value: 2500, label: "Salaire", category: categories[2], date: new Date("2025-12-28") },
  ]);

  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // --- FILTRES ---
  const movementsByDate = movements.filter((mov) => {
    const movDate = new Date(mov.date);
    return (
      movDate.getMonth() + 1 === selectedMonth &&
      movDate.getFullYear() === selectedYear
    );
  });

  const displayedMovements = movementsByDate.filter((mov) => {
    if (activeTab === 'expense') return mov.value < 0;
    if (activeTab === 'income') return mov.value > 0;
    return true;
  });

  const chartData = movementsByDate.filter(mov => {
      if (activeTab === 'income') return mov.value > 0;
      return mov.value < 0;
  });

  const globalBalance = movements.reduce((acc, m) => acc + m.value, 0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else setIsAuthenticated(true);
  }, [navigate]);

  const addMovement = (mov: MovementProps) => {
    setMovements((prev) => [mov, ...prev]);
    setIsMovementModalOpen(false);
  };

  const addCategory = (cat: Category) => {
    setCategories((prev) => [...prev, cat]);
    setIsCategoryModalOpen(false);
  };

  if (!isAuthenticated) return null;

  return (
    <Styled.PageWrapper>

      <Styled.LeftSection>

        <div style={{ marginTop: 10, width: "100%", display: "flex", justifyContent: "center" }}>
            <MonthYearPicker
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onMonthChange={setSelectedMonth}
                onYearChange={setSelectedYear}
            />
        </div>

        <Styled.TabsContainer>
          <Styled.TabButton $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>Tout</Styled.TabButton>
          <Styled.TabButton $active={activeTab === 'expense'} onClick={() => setActiveTab('expense')}>Dépenses</Styled.TabButton>
          <Styled.TabButton $active={activeTab === 'income'} onClick={() => setActiveTab('income')}>Entrées</Styled.TabButton>
        </Styled.TabsContainer>

        <Summary
            data={chartData}
            globalBalance={globalBalance}
            activeTab={activeTab}
        />

      </Styled.LeftSection>

      <Styled.RightSection>
        <Styled.ActionsHeader>
            <Styled.ControlButton onClick={() => setIsCategoryModalOpen(true)}>
                + Catégorie
            </Styled.ControlButton>
            <Styled.ControlButton onClick={() => setIsMovementModalOpen(true)}>
                + Transaction
            </Styled.ControlButton>
        </Styled.ActionsHeader>

        <h3 style={{marginTop: 0, marginBottom: 15}}>
            Historique ({displayedMovements.length})
        </h3>

        <Styled.HistoryScrollArea>
            <Movements items={displayedMovements} />
        </Styled.HistoryScrollArea>
      </Styled.RightSection>

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

    </Styled.PageWrapper>
  );
}