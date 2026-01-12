import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3`
  font-family: "Nunito", sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: #2a2a2a;
  margin: 0;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #4ecdc4;
  border: 3px solid #2a2a2a;
  border-radius: 10px;
  font-family: "Nunito", sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: #2a2a2a;
  cursor: pointer;
  box-shadow: 4px 4px 0px #2a2a2a;
  transition: all 0.2s ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px #2a2a2a;
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #2a2a2a;
  }
`;

export const AccountsList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 32px;
  background-color: #f7f3e8;
  border: 3px dashed #2a2a2a;
  border-radius: 12px;
`;

export const EmptyText = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  color: #666;
  margin: 0;
`;

export const LoadingText = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  color: #666;
  text-align: center;
`;

export const ErrorText = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  color: #ff6b6b;
  text-align: center;
`;