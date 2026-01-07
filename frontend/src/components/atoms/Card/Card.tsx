import React from "react";
import * as Styled from "./Card.styles";
import type { CardProps } from "./Card.types";

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <Styled.CardContainer className={className}>
      {children}
    </Styled.CardContainer>
  );
};
