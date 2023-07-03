import styled from "styled-components";

export const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 100%;
  height: 100%;

  p {
    font-size: 3.2rem;
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 2.4rem;
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

  #lottie {
    width: 12rem;
    height: 12rem;
  }
`;
