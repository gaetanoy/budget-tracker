import styled from "styled-components";

export const Badge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: fit-content;
  width: 150px;

  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color};
  background-color: ${({ $color }) => `${$color}1A`};

  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 1;
`;

export const Emoji = styled.span`
  font-size: 1.1em;
  line-height: 1;
`;
