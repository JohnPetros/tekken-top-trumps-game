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
