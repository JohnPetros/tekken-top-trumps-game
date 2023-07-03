import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;

  margin: 2.4rem 0;

  transition: all 0.2s;
`;

interface FighterCard {
  image: string;
  isPlayerOne: boolean;
  isPlayerTwo: boolean;
}

export const FighterCard = styled(motion.button)<FighterCard>`
  height: 8rem;
  padding: 4px;

  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.blue_700};
  background-size: 300%;
  background-position: 75% top;
  background-image: ${({ image }) => `url(${image})`};

  border: 1px solid
    ${({ isPlayerOne, isPlayerTwo, theme }) =>
      isPlayerOne || isPlayerTwo
        ? theme.colors[isPlayerOne ? "blue_300" : "red"]
        : theme.colors.white};

  display: flex;

  transition: all 0.2s;

  pointer-events: ${({ isPlayerOne, isPlayerTwo }) =>
    isPlayerOne || isPlayerTwo ? "none" : "auto"};

  filter: ${({ isPlayerTwo }) =>
    isPlayerTwo ? "grayscale(100%)" : "grayscale(0)"};

  span {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.6rem;
  }

  &:hover {
    transform: scale(1.1);
  }
`;
