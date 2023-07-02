import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.blue_900};
  color: ${({ theme }) => theme.colors.white};

  margin-bottom: 2.4rem;
  padding: 1.2rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.white};

  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export const Score = styled.span`
  font-size: 2.4rem;
  color: ${({ color }) => color};
`;
