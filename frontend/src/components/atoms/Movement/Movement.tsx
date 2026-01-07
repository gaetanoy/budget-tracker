import React from "react";
import * as Styled from "./Movement.styles";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";
import { DEFAULT_CATEGORY } from "../../../types/Category";
import type { MovementProps } from "./Movement.types";

export const Movement: React.FC<MovementProps> = (props) => {
  return (
    <Styled.Container>
      <Styled.Label>{props.label}</Styled.Label>

      <CategoryBadge category={props.category ?? DEFAULT_CATEGORY} />

      <Styled.Value value={props.amount}>{props.amount} €</Styled.Value>

      <Styled.EditButton onClick={props.onEdit}>✏️</Styled.EditButton>

      <Styled.DeleteButton onClick={props.onDelete}>X</Styled.DeleteButton>
    </Styled.Container>
  );
};
