import React, { useState } from "react";
import * as Styled from "./AddMovementModal.styles";
import type { AddMovementModalProps } from "./AddMovementModal.types";

export const AddMovementModal: React.FC<AddMovementModalProps> = ({
  onAdd,
  onClose,
}) => {
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim() || !date || !amount) return;

    onAdd({
      label,
      value: parseFloat(amount),
      category: category,
      date: new Date(date),
    });
    onClose();
  };

  return (
    <Styled.Backdrop>
      <Styled.Modal>
        <Styled.Title>Nouveau mouvement</Styled.Title>

        <Styled.Form onSubmit={handleSubmit}>
          <Styled.Input
            type="text"
            placeholder="Titre (ex: Courses)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
            autoFocus
          />

          <Styled.Input
            type="number"
            placeholder="Montant (ex: -45.50)"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <Styled.Input
            type="text"
            placeholder="Catégorie"
            value={category || ""}
            onChange={(e) => setCategory(e.target.value || null)}
          />

          <Styled.Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <Styled.SubmitButton type="submit">
            Ajouter le mouvement
          </Styled.SubmitButton>
        </Styled.Form>

        <Styled.CloseButton onClick={onClose}>Annuler</Styled.CloseButton>
      </Styled.Modal>
    </Styled.Backdrop>
  );
};
