import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  width: 100%;
  justify-content: center;
`;

const Select = styled.select`
  padding: 10px 16px;
  border-radius: 12px;
  border: 2px solid #2a2a2a;
  background: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  box-shadow: 4px 4px 0px #2a2a2a;
  transition: transform 0.1s ease;

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #2a2a2a;
  }
`;

type Props = {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (m: number) => void;
  onYearChange: (y: number) => void;
};

export const MonthYearPicker = ({ selectedMonth, selectedYear, onMonthChange, onYearChange }: Props) => {
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const currentYear = new Date().getFullYear();
  // Génère les 5 dernières années (ex: 2025, 2024, 2023...)
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <Container>
      <Select
        value={selectedMonth}
        onChange={(e) => onMonthChange(Number(e.target.value))}
      >
        {months.map((m, index) => (
          <option key={index} value={index + 1}>{m}</option>
        ))}
      </Select>

      <Select
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
      >
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </Select>
    </Container>
  );
};
