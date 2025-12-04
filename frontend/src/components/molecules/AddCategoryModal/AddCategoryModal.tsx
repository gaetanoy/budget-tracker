import React, { useState } from "react";
import * as Styled from "./AddCategoryModal.styles";
import type { AddCategoryModalProps } from "./AddCategoryModal.types";

export const AddCategoryModal: React.FC<AddCategoryModalProps> = (
  props: AddCategoryModalProps
) => {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("#000000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !icon.trim()) return;

    props.onAdd({
      title,
      icon,
      color,
    });
    props.onClose();
  };

  return (
    <Styled.Backdrop>
      <Styled.Modal>
        <Styled.Title>Nouvelle catégorie</Styled.Title>

        <Styled.Form onSubmit={handleSubmit}>
          <Styled.Input
            type="text"
            placeholder="Titre (ex: Vacances)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />

          <Styled.Input
            type="text"
            placeholder="Emoji (ex: 🌴)"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            maxLength={2}
            required
          />

          {/* Input pour la couleur */}
          <Styled.ColorInputContainer>
            <label style={{ fontWeight: 600 }}>Couleur</label>
            <Styled.Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                padding: "5px",
                height: "50px",
                width: "100%",
                cursor: "pointer",
              }}
              required
            />
          </Styled.ColorInputContainer>

          <Styled.SubmitButton type="submit">
            Créer la catégorie
          </Styled.SubmitButton>
        </Styled.Form>

        <Styled.CloseButton onClick={props.onClose}>Annuler</Styled.CloseButton>
      </Styled.Modal>
    </Styled.Backdrop>
  );
};
