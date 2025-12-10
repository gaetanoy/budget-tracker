import * as Styled from "./CategoryBadge.styles";
import type { CategoryBadgeProps } from "./CategoryBadge.types";

export const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  return (
    <Styled.Badge $color={category.color}>
      <Styled.Emoji>{category.icon}</Styled.Emoji>
      {category.title}
    </Styled.Badge>
  );
};
