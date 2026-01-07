import * as Styled from "./Container.styles";
import type { ContainerProps } from "./Container.types";

export const Container = ({ children, ...props }: ContainerProps) => {
  return <Styled.StyledContainer {...props}>{children}</Styled.StyledContainer>;
};
