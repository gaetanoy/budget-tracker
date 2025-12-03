import * as Styled from "./Summary.styles";
import { Balance } from "../../atoms/Balance/Balance";
import type { SummaryProps } from "./Summary.types";

export default function Summary(props: SummaryProps) {
  return (
    <Styled.SummaryWrapper>
      <Styled.Title> ANAS </Styled.Title>
      <Balance amount={props.amount ?? 0} />
    </Styled.SummaryWrapper>
  );
}
