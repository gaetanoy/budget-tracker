import { Movement } from "../../atoms/Movement/Movement";
import { type MovementsProps } from "./Movements.types";
import * as Styled from "./Movements.styles";

export const Movements: React.FC<MovementsProps> = ({ items }) => {
  return (
    <Styled.List>
      {items.map((item, index) => (
        <Movement
          key={index}
          value={item.value}
          label={item.label}
          category={item.category}
        />
      ))}
    </Styled.List>
  );
};
