import styled from "styled-components";

export const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 100%;
  height: 100%;

  p {
    text-align: center;
    font-size: 3.2rem;
    color: ${({ theme }) => theme.colors.white};
  }

  p + p {
    margin: 1.2rem;
  }

  p#attribute {
    font-size: 2.4rem;
    height: 6rem;
  }

  p#attribute > span {
    color: ${({ theme }) => theme.colors.purple};
    font-size: 2.4rem;
    text-transform: uppercase;
  }

  .middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  strong {
    display: block;

    font-size: 2.4rem;
    text-align: center;

    margin: 0 0 3.6rem;
  }
`;
