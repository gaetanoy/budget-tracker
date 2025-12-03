import { Movement } from "../../atoms/Movement/Movement";
import { type MovementsProps } from "./Movements.types";
import * as Styled from "./Movements.styles";

export const Movements: React.FC<MovementsProps> = ({ items }) => {
  const formatDateLabel = (date: Date): string => {
    const today = new Date();
    const d = new Date(date);

    const isSameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (isSameDay(d, today)) return "Aujourd'hui";
    if (isSameDay(d, yesterday)) return "Hier";

    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    const label = formatDateLabel(item.date);
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
            <Movement key={index} {...item} />
          ))}
        </Styled.DateGroup>
      ))}
    </Styled.List>
  );
};
