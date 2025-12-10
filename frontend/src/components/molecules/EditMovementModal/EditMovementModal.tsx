import React, { Suspense, useState } from "react";
import * as Styled from "./EditMovementModal.styles";
import { DEFAULT_CATEGORY, type Category } from "../../../types/Category";
import type { Transaction } from "../../atoms/Movement/Movement.types";
import { getCategories } from "../../../api/category";
import { useAuth } from "../../../context/auth";
import { SelectCategory } from "../AddMovementModal/AddMovementModal";

export type EditMovementModalProps = {
  movement: Transaction;
  onSave: (updated: Transaction) => void;
  onClose: () => void;
};

export const EditMovementModal: React.FC<EditMovementModalProps> = ({
  movement,
  onSave,
  onClose,
}) => {
  const [label, setLabel] = useState(movement.label);
  const [amount, setAmount] = useState(movement.value.toString());
  const [category, setCategory] = useState<Category>(
    movement.category ?? DEFAULT_CATEGORY
  );
  const [date, setDate] = useState(movement.date.toISOString().split("T")[0]);

  const { getAuthorizationNonNull } = useAuth();
  const categories = getCategories(getAuthorizationNonNull);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...movement,
      label,
      value: parseFloat(amount),
      category,
      date: new Date(date),
    });
    onClose();
  };

  return (
    <Styled.Backdrop>
      <Styled.Modal>
        <Styled.Title>Modifier la transaction</Styled.Title>

        <Styled.Form onSubmit={handleSubmit}>
          <Styled.Input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />

          <Styled.Input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <Suspense fallback="Chargement des catégories...">
            <SelectCategory
              category={category}
              setCategory={setCategory}
              categoriesPromise={categories}
            />
          </Suspense>

          <Styled.Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <Styled.SubmitButton type="submit">Enregistrer</Styled.SubmitButton>
        </Styled.Form>

        <Styled.CloseButton onClick={onClose}>Annuler</Styled.CloseButton>
      </Styled.Modal>
    </Styled.Backdrop>
  );
};
