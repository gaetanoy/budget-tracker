import styled from "styled-components";

const colors = {
  dark: "#2a2a2a",
  beigeBg: "#F7F3E8",
  white: "#ffffff",
};

export const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${colors.beigeBg};
  color: ${colors.dark};

  border: 3px solid ${colors.dark};
  border-radius: 16px;
  box-shadow: 6px 6px 0px ${colors.dark};

  padding: 24px;
  margin: 1rem auto 2rem auto;
  width: 100%;
  max-width: 400px;

  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px ${colors.dark};
  }
`;

export const Title = styled.h3`
  margin: 0 0 12px 0;
  font-size: 1.2rem;
  font-weight: 800;
  color: ${colors.dark};
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.8;
`;
