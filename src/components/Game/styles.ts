import styled from "styled-components";

export const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 100%;
  height: 100%;

  .middle {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
