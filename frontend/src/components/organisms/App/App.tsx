import { useEffect, useState } from "react";
import * as Styled from "./App.styles";

import Summary from "../../molecules/Summary/Summary";
import { Movements } from "../../molecules/Movements/Movements";
import type { MovementProps } from "../../atoms/Movement/Movement.types";
import { AddMovementModal } from "../../molecules/AddMovementModal/AddMovementModal";
import { AddCategoryModal } from "../../molecules/AddCategoryModal/AddCategoryModal";
import type { Category } from "../../../types/Category";
import { MonthYearPicker } from "../../molecules/MonthYearPicker/MonthYearPicker";
import { useAuth } from "../../../context/auth";
import { createTransaction, getTransactions } from "../../../api/transaction";
import { getCategories } from "../../../api/category";

export default function App() {
  const { getAuthorizationNonNull } = useAuth();

  const [selectedMonth, setSelectedMonth] = useState(12);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [activeTab, setActiveTab] = useState<"all" | "expense" | "income">(
    "all"
  );

  const [categories, setCategories] = useState<Category[]>([]);

  const [movements, setMovements] = useState<MovementProps[]>([]);

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
    if (activeTab === "expense") return mov.value < 0;
    if (activeTab === "income") return mov.value > 0;
    return true;
  });

  const chartData = movementsByDate.filter((mov) => {
    if (activeTab === "income") return mov.value > 0;
    return mov.value < 0;
  });

  const globalBalance = movements.reduce((acc, m) => acc + m.value, 0);

  const addMovement = async (mov: MovementProps) => {
    try {
      if (!mov.category) throw new Error("Missing category");

      const created = await createTransaction(
        {
          title: mov.label,
          amount: mov.value,
          date: mov.date.toISOString().split("T")[0],
          category_id: mov.category?.id ?? 1,
        },
        getAuthorizationNonNull
      );

      const formatted: MovementProps = {
        label: created.title,
        value: created.amount,
        date: new Date(created.date),
        category: mov.category,
      };

      setMovements((prev) => [formatted, ...prev]);
      setIsMovementModalOpen(false);
    } catch (error) {
      console.error("Error creating movement:", error);
    }
  };

  const addCategory = (cat: Category) => {
    setCategories((prev) => [...prev, cat]);
    setIsCategoryModalOpen(false);
  };

  // Fetch all transactions on initial load (WITHOUT category mapping).
  // This runs before categories are available, so categories will be null here.
  // The real mapping happens in the next useEffect once categories are loaded.
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactions = await getTransactions({}, getAuthorizationNonNull);

        const mapped = transactions.map((t) => ({
          label: t.title,
          value: t.amount,
          date: new Date(t.date),
          category: categories.find((c) => c.id === t.category_id),
        }));

        setMovements(mapped);
      } catch (error) {
        console.error("Error while fetching the transactions:", error);
      }
    };

    fetchTransactions();
  }, [categories, getAuthorizationNonNull]);

  // Fetch all categories from the backend on initial load.
  // Once loaded, categories are stored globally in state and used for mapping.
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories(getAuthorizationNonNull);

        const formatted = result.map((c) => ({
          id: c.id,
          title: c.name,
          color: c.color ?? "",
          icon: c.icon ?? "",
        }));

        setCategories(formatted);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [getAuthorizationNonNull]);

  // Once categories are loaded, re-fetch transactions and map each transaction
  // to its matching Category object (using category_id).
  useEffect(() => {
    if (categories.length === 0) return;

    const fetchTransactions = async () => {
      const transactions = await getTransactions({}, getAuthorizationNonNull);

      const mapped = transactions.map((t) => ({
        label: t.title,
        value: t.amount,
        date: new Date(t.date),
        category: categories.find((c) => c.id === t.category_id),
      }));

      setMovements(mapped);
    };

    fetchTransactions();
  }, [categories, getAuthorizationNonNull]);

  return (
    <Styled.PageWrapper>
      <Styled.LeftSection>
        <div
          style={{
            marginTop: 10,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MonthYearPicker
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
          />
        </div>

        <Styled.TabsContainer>
          <Styled.TabButton
            $active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          >
            Tout
          </Styled.TabButton>
          <Styled.TabButton
            $active={activeTab === "expense"}
            onClick={() => setActiveTab("expense")}
          >
            Dépenses
          </Styled.TabButton>
          <Styled.TabButton
            $active={activeTab === "income"}
            onClick={() => setActiveTab("income")}
          >
            Entrées
          </Styled.TabButton>
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

        <h3 style={{ marginTop: 0, marginBottom: 15 }}>
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
