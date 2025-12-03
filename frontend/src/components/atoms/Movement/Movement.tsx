import React from "react";
import { type MovementProps } from "./Movement.types";
import * as Styled from "./Movement.styles";

export const Movement: React.FC<MovementProps> = (props: MovementProps) => {
  return (
    <Styled.Container>
      <Styled.Label>{props.label}</Styled.Label>
      <Styled.Category>{props.category ?? "Non catégorisée"}</Styled.Category>
      <Styled.Value value={props.value}>{props.value}</Styled.Value>
    </Styled.Container>
  );
};
