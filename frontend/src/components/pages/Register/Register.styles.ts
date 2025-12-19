import { Link } from "react-router";
import styled from "styled-components";

const colors = {
  dark: "#2a2a2a",
  beigeBg: "#F7F3E8",
  white: "#ffffff",
  blue: "#007bff",
};

export const Card = styled.div`
  background: ${colors.beigeBg};
  border: 3px solid ${colors.dark};
  border-radius: 16px;
  box-shadow: 8px 8px 0px ${colors.dark};
  padding: 40px;
  margin: 10px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 2rem;
  color: ${colors.dark};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Input = styled.input`
  padding: 14px;
  border-radius: 8px;
  border: 2px solid ${colors.dark};
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${colors.blue};
  }
`;

export const Button = styled.button`
  padding: 16px;
  background-color: ${colors.dark};
  color: ${colors.white};
  border: none;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  transition: transform 0.1s;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const FooterText = styled.p`
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
`;

export const StyledLink = styled(Link)`
  color: ${colors.blue};
  font-weight: 700;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
