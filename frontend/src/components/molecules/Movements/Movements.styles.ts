import styled from "styled-components";

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 80%;
  padding-bottom: 0;
    margin-left: 20px;
    scroll-behavior: auto;
`;

export const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  .date {
    align-self: flex-start;
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    opacity: 0.75;
  }
`;
