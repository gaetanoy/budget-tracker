import React from "react";
import { type Transaction } from "./Movement.types";
import * as Styled from "./Movement.styles";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";
import { DEFAULT_CATEGORY } from "../../../types/Category";

export const Movement: React.FC<Transaction & { onDelete: () => void }> = (
  props
) => {
  return (
    <Styled.Container>
      <Styled.Label>{props.label}</Styled.Label>
      {props.category ? (
        <CategoryBadge category={props.category} />
      ) : (
        <CategoryBadge category={DEFAULT_CATEGORY} />
      )}
      <Styled.Value value={props.value}>{props.value} €</Styled.Value>
      <Styled.DeleteButton onClick={() => props.onDelete()}>
        X
      </Styled.DeleteButton>
    </Styled.Container>
  );
};
