import { useEffect, useState } from "react";
import * as Styled from "./Dashboard.styles";

import Summary from "../../molecules/Summary/Summary";
import { Movements } from "../../molecules/Movements/Movements";
import type { Transaction } from "../../atoms/Movement/Movement.types";
import { AddMovementModal } from "../../molecules/AddMovementModal/AddMovementModal";
import { AddCategoryModal } from "../../molecules/AddCategoryModal/AddCategoryModal";
import type { Category } from "../../../types/Category";
import { MonthYearPicker } from "../../molecules/MonthYearPicker/MonthYearPicker";
import { useAuth } from "../../../context/auth";

import {
  createTransaction,
  getTransactions,
  removeTransaction,
  modifyTransaction,
  type TransactionFilters,
} from "../../../api/transaction";

import { getCategories } from "../../../api/category";
import { EditMovementModal } from "../../molecules/EditMovementModal/EditMovementModal";

export default function Dashboard() {
  const [error, setError] = useState<unknown>(null);

  if (error !== null) {
    throw error;
  }

  const { getAuthorizationNonNull } = useAuth();

  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [activeTab, setActiveTab] = useState<"all" | "expense" | "income">(
    "all",
  );
  const [filters, setFilters] = useState<TransactionFilters>({});

  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [editingMovement, setEditingMovement] = useState<Transaction | null>(
    null,
  );

  const movementsByDate = transactions.filter((mov) => {
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

  const globalBalance = transactions.reduce((acc, m) => acc + m.value, 0);

  const addMovement = async (mov: Omit<Transaction, "id">) => {
    try {
      if (!mov.category) throw new Error("Missing category");

      const created = await createTransaction(
        {
          title: mov.label,
          amount: mov.value,
          date: mov.date.toISOString().split("T")[0],
          category_id: mov.category?.id ?? 1,
        },
        getAuthorizationNonNull,
      );

      const formatted: Transaction = {
        id: created.id,
        label: created.title,
        value: created.amount,
        date: new Date(created.date),
        category: mov.category,
      };

      setTransactions((prev) => [formatted, ...prev]);
      setIsMovementModalOpen(false);
    } catch (error) {
      console.error("Error creating movement:", error);
      setError(error);
    }
  };

  const deleteMovement = async (movement: Transaction) => {
    try {
      await removeTransaction(movement.id, getAuthorizationNonNull);
      setTransactions((prev) => prev.filter((m) => m.id !== movement.id));
    } catch (e) {
      console.error("Error deleting movement:", e);
      setError(e);
    }
  };

  // --- UPDATE (NEW) ---
  const updateMovement = async (updated: Transaction) => {
    try {
      const result = await modifyTransaction(
        updated.id,
        {
          title: updated.label,
          amount: updated.value,
          date: updated.date.toISOString().split("T")[0],
          category_id: updated.category?.id ?? 1,
        },
        getAuthorizationNonNull,
      );

      // Local update
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === updated.id
            ? {
                ...t,
                label: result.title,
                value: result.amount,
                date: new Date(result.date),
                category: updated.category,
              }
            : t,
        ),
      );

      setEditingMovement(null);
    } catch (error) {
      console.error("Error updating transaction:", error);
      setError(error);
    }
  };

  // Add category
  const addCategory = (cat: Category) => {
    setCategories((prev) => [...prev, cat]);
    setIsCategoryModalOpen(false);
  };

  // --- FETCH CATEGORIES ON LOAD ---
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
        setError(error);
      }
    };

    fetchCategories();
  }, [getAuthorizationNonNull]);

  // --- FETCH TRANSACTIONS (mapped to categories) ---
  useEffect(() => {
    if (categories.length === 0) return;

    const fetchTransactions = async () => {
      try {
        const transactions = await getTransactions(
          filters,
          getAuthorizationNonNull,
        );

        const mapped = transactions.map((t) => ({
          id: t.id,
          label: t.title,
          value: t.amount,
          date: new Date(t.date),
          category: categories.find((c) => c.id === t.category_id),
        }));

        setTransactions(mapped);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError(error);
      }
    };

    fetchTransactions();
  }, [
    categories,
    getAuthorizationNonNull,
    isMovementModalOpen,
    filters,
    isCategoryModalOpen,
  ]);

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

        <Styled.FiltersContainer>
          <h3 style={{ marginTop: 0, marginBottom: 15 }}>
            Historique ({displayedMovements.length})
          </h3>
          {filters.asc ? (
            <Styled.SortButton
              onClick={() =>
                setFilters((prev) => ({ ...prev, asc: !prev.asc }))
              }
            >
              ▼
            </Styled.SortButton>
          ) : (
            <Styled.SortButton
              onClick={() =>
                setFilters((prev) => ({ ...prev, asc: !prev.asc }))
              }
            >
              ▲
            </Styled.SortButton>
          )}
        </Styled.FiltersContainer>

        <Styled.HistoryScrollArea>
          <Movements
            items={displayedMovements}
            onDelete={deleteMovement}
            onEdit={(m) => setEditingMovement(m)}
          />
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

      {editingMovement && (
        <EditMovementModal
          movement={editingMovement}
          onSave={updateMovement}
          onClose={() => setEditingMovement(null)}
        />
      )}
    </Styled.PageWrapper>
  );
}
