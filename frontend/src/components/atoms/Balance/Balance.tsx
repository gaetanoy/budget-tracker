import React from "react";
import * as Styled from "./Balance.styles";
import type { BalanceProps } from "./Balance.types";

export const Balance: React.FC<BalanceProps> = (props: BalanceProps) => {
  return (
    <Styled.Container amount={props.amount}>
      {props.amount.toFixed(2)} €
    </Styled.Container>
  );
};
