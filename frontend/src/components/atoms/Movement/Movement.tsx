import React from "react";
import { type Transaction } from "./Movement.types";
import * as Styled from "./Movement.styles";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";
import { DEFAULT_CATEGORY } from "../../../types/Category";

export const Movement: React.FC<
  Transaction & { onDelete: () => void; onEdit: () => void }
> = (props) => {
  return (
    <Styled.Container>
      <Styled.Label>{props.label}</Styled.Label>

      <CategoryBadge category={props.category ?? DEFAULT_CATEGORY} />

      <Styled.Value value={props.value}>{props.value} €</Styled.Value>

      <Styled.EditButton onClick={props.onEdit}>✏️</Styled.EditButton>

      <Styled.DeleteButton onClick={props.onDelete}>X</Styled.DeleteButton>
    </Styled.Container>
  );
};
