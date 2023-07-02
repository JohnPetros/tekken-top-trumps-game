import styled from "styled-components";

export const Container = styled.button`
  width: 14rem;
  padding: 1.2rem;

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue_900};
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 8px;

  text-align: center;

  & + & {
    margin-top: 1.2rem;
  }
`;
