import React, { useState } from "react";
import * as Styled from "./AddCategoryModal.styles";
import type { AddCategoryModalProps } from "./AddCategoryModal.types";
import { createCategory, type CategoryCreate } from "../../../api/category";
import { useAuth } from "../../../context/auth";

const EMOJI_LIST = [
  "🏠",
  "💼",
  "🛒",
  "🍔",
  "🚗",
  "✈️",
  "🏋️",
  "🎮",
  "💡",
  "💰",
  "🎓",
  "🎁",
  "🏥",
  "🎬",
  "📱",
  "🐶",
  "👶",
  "🎉",
  "🔧",
  "🌿",
  "☕",
  "🍕",
  "🏖️",
  "📚",
];

export const AddCategoryModal: React.FC<AddCategoryModalProps> = (
  props: AddCategoryModalProps,
) => {
  const { getAuthorizationNonNull } = useAuth();

  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("#000000");
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !icon.trim()) return;

    const newCategory = {
      icon,
      name: title,
      color,
    } satisfies CategoryCreate;

    await createCategory(newCategory, getAuthorizationNonNull);
    props.onClose();
  };

  const handleEmojiSelect = (selectedEmoji: string) => {
    setIcon(selectedEmoji);
    setShowPicker(false);
  };

  return (
    <Styled.Backdrop onClick={props.onClose}>
      <Styled.Modal onClick={(e) => e.stopPropagation()}>
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

          <Styled.EmojiPickerContainer>
            <Styled.EmojiDisplayButton
              type="button"
              onClick={() => setShowPicker(!showPicker)}
            >
              {icon ? (
                <span>{icon} &nbsp; Emoji sélectionné</span>
              ) : (
                <span className="placeholder">Choisir un emoji (ex: 🌴)</span>
              )}
              <span>{showPicker ? "▲" : "▼"}</span>
            </Styled.EmojiDisplayButton>

            {showPicker && (
              <Styled.EmojiGrid>
                {EMOJI_LIST.map((emoji) => (
                  <Styled.EmojiItem
                    type="button"
                    key={emoji}
                    onClick={() => handleEmojiSelect(emoji)}
                    $isSelected={icon === emoji}
                  >
                    {emoji}
                  </Styled.EmojiItem>
                ))}
              </Styled.EmojiGrid>
            )}
          </Styled.EmojiPickerContainer>

          <Styled.ColorInputContainer>
            <label style={{ fontWeight: 600 }}>Couleur</label>
            <Styled.Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                padding: "4px",
                height: "45px",
                flex: 1,
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
