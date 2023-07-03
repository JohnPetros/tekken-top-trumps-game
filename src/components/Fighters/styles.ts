import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;

  margin-bottom: 2.4rem;
`;

interface Fighter {
  image: string;
  hasEvents: boolean;
  isDisabled: boolean;
}

export const Fighter = styled(motion.div)<Fighter>`
  height: 8rem;
  padding: 4px;

  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.blue_700};
  background-size: 300%;
  background-position: 75% top;
  background-image: ${({ image }) => `url(${image})`};

  transition: transform 0.2s;

  cursor: ${({ hasEvents, isDisabled }) =>
    hasEvents && !isDisabled ? "auto" : "not-allowed"};

  filter: ${({ isDisabled }) =>
    isDisabled ? "grayscale(100%)" : "grayscale(0)"};

  span {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.6rem;
  }

  button {
    width: 100%;
    height: 100%;
    background: transparent;
    pointer-events: ${({ hasEvents, isDisabled }) =>
      hasEvents && !isDisabled ? "auto" : "none"};
  }

  &:hover {
    transform: scale(1.1);
  }
`;
