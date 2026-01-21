import { Movement } from "../../atoms/Movement/Movement";
import { type MovementsProps } from "./Movements.types";
import * as Styled from "./Movements.styles";

export const Movements: React.FC<MovementsProps> = ({
  items,
  onDelete,
  onEdit,
}) => {
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    const label = item.date;
    if (!acc[label]) acc[label] = [];
    acc[label].push(item);
    return acc;
  }, {});

  return (
    <Styled.List>
      {Object.entries(grouped).map(([dateLabel, movements]) => (
        <Styled.DateGroup key={dateLabel}>
          <p className="date">{dateLabel}</p>

          {movements.map((item, index) => (
            <Movement
              key={index}
              {...item}
              onDelete={() => onDelete(item)}
              onEdit={() => onEdit(item)}
            />
          ))}
        </Styled.DateGroup>
      ))}
    </Styled.List>
  );
};
