import React, { Suspense, use, useMemo, useState } from "react";
import * as Styled from "./AddMovementModal.styles";
import type { AddMovementModalProps } from "./AddMovementModal.types";
import { DEFAULT_CATEGORY, type Category } from "../../../types/Category";
import { getCategories, type CategoryResponse } from "../../../api/category";
import { useAuth } from "../../../context/auth";
import { autoCategorize } from "../../../api/category";

export const SelectCategory = React.memo(function SelectCategory({
  category,
  setCategory,
  categoriesPromise,
}: {
  category: Category;
  setCategory: (cat: Category) => void;
  categoriesPromise: Promise<CategoryResponse[]>;
}) {
  const categoriesRaw = use(categoriesPromise);

  const categories = categoriesRaw.map(
    (category) =>
      ({
        id: category.id,
        title: category.name,
        color: category.color ?? "",
        icon: category.icon ?? "",
      } satisfies Category)
  );

  return (
    <Styled.Select
      value={category.title}
      onChange={(e) => {
        const selectedTitle = e.target.value;
        const selectedCategory = categories.find(
          (cat) => cat.title === selectedTitle
        );
        if (selectedCategory) {
          setCategory(selectedCategory);
        }
      }}
    >
      <option value="">-- Choisir une catégorie --</option>
      {categories.map((cat, index) => (
        <option key={index} value={cat.title}>
          {cat.icon + " " + cat.title}
        </option>
      ))}
    </Styled.Select>
  );
});

export const AddMovementModal: React.FC<AddMovementModalProps> = (
  props: AddMovementModalProps
) => {
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>(DEFAULT_CATEGORY);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [loadingGuess, setLoadingGuess] = useState(false);

  const { getAuthorizationNonNull } = useAuth();

  const categoriesPromise = useMemo(
    () => getCategories(getAuthorizationNonNull),
    [getAuthorizationNonNull]
  );

  const handleAutoGuess = async () => {
    if (!label.trim()) return;

    setLoadingGuess(true);

    try {
      const guess = await autoCategorize(
        { transaction_description: label },
        getAuthorizationNonNull
      );

      const categoriesResolved = await categoriesPromise;

      const matched = categoriesResolved.find(
        (c) => c.name.toLowerCase() === guess.category.toLowerCase()
      );

      if (matched) {
        setCategory({
          id: matched.id,
          title: matched.name,
          color: matched.color ?? "",
          icon: matched.icon ?? "",
        });
      }
    } catch (err) {
      console.error("Auto-categorization failed:", err);
    }

    setLoadingGuess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim() || !date || !amount) return;

    props.onAdd({
      label,
      value: parseFloat(amount),
      category: category,
      date: new Date(date),
    });
    props.onClose();
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

          <Suspense fallback="Loading categories...">
            <Styled.CategoryRow>
              <SelectCategory
                category={category}
                setCategory={setCategory}
                categoriesPromise={categoriesPromise}
              />

              {loadingGuess ? (
                <Styled.Loader />
              ) : (
                <Styled.MagicButton type="button" onClick={handleAutoGuess}>
                  ✨
                </Styled.MagicButton>
              )}
            </Styled.CategoryRow>
          </Suspense>

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

        <Styled.CloseButton onClick={props.onClose}>Annuler</Styled.CloseButton>
      </Styled.Modal>
    </Styled.Backdrop>
  );
};
