import styled from "styled-components";

export const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 100%;
  height: 100%;

  h1 {
    color: ${({ theme }) => theme.colors.white};
  }

  .middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const Scoreboard = styled.div`
  background-color: ${({ theme }) => theme.colors.blue_900};
  color: ${({ theme }) => theme.colors.white};

  margin-bottom: 2.4rem;
  padding: 1.2rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.white};

  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.purple};
  }
`;
