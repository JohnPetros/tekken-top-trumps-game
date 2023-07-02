import styled from "styled-components";
import { motion } from "framer-motion";

interface Player {
  isBot: boolean;
}

export const Container = styled.div<Player>`
  display: flex;
  justify-content: ${({ isBot }) => (isBot ? "flex-end" : "flex-start")};
  align-items: flex-end;
  position: relative;

  > div {
    height: 64rem;
  }

  > div:first-child {
  }
`;

interface Background {
  isBot: boolean;
}

export const Background = styled(motion.div)<Background>`
  width: 24rem;
  border-radius: 8px 8px 0 0;

  order: ${({ isBot }) => (isBot ? 2 : 1)};
  transform: ${({ isBot }) => (isBot ? "scaleX(-1)" : "scaleX(1)")};

  background: ${({ isBot, theme }) => {
    const color = theme.colors[isBot ? "red" : "blue_300"];
    return `linear-gradient(90deg, ${color}, transparent 95%)`;
  }};
  z-index: 1;
`;

interface Fighter {
  image: string;
}

export const Fighter = styled(motion.div)<Player & Fighter>`
  width: 100%;
  padding: ${({ isBot }) => (isBot ? "0 0 0 8rem" : "0 8rem 0 0")};

  position: absolute;
  left: ${({ isBot }) => (isBot ? 0 : 0)}rem;
  order: ${({ isBot }) => (isBot ? 1 : 2)};
  z-index: 5;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${({ image }) => `url(${image})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: -20rem center;
    transform: ${({ isBot }) => (isBot ? "scaleX(-1)" : "scaleX(1)")};
    z-index: -1;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ isBot }) => (isBot ? "flex-start" : "flex-end")};

  strong {
    display: block;
    color: ${({ theme }) => theme.colors.white};
    align-self: ${({ isBot }) => (isBot ? "flex-start" : "flex-end")};

    font-size: 2.4rem;
    font: ${({ theme }) => theme.fonts.title};

    margin-top: 2.4rem;
  }
`;

export const Attributes = styled.div`
  background-color: ${({ theme }) => theme.colors.blue_700};

  width: max-content;
  padding: 2.4rem;
  border-radius: 8px;
  opacity: 0.9;

  transform: skew(-15deg);

  dl {
    width: 100%;
    display: grid;
  }

  dt {
    margin-top: 8px;
  }

  dd {
    margin-top: 8px;
  }

  span + span {
    margin-left: 6px;
  }
`;

interface Attribute {
  isBot: boolean;
}

export const Attribute = styled.button<Attribute>`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.white};
  text-align: start;
  background: transparent;
  text-transform: capitalize;

  &:hover {
    color: ${({ isBot, theme }) => theme.colors[isBot ? "red" : "blue_300"]};
  }
`;

interface Stat {
  isFilled: boolean;
  isBot: boolean;
  isSelected: boolean;
}

export const Stat = styled.span<Stat>`
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  background: ${({ isFilled, isSelected, isBot, theme }) => {
    if (isFilled) {
      return isSelected
        ? theme.colors[isBot ? "red" : "blue_300"]
        : "linear-gradient(90deg, #9b28a1, #d638dd)";
    } else {
      return theme.colors.gray;
    }
  }};
  transform: skew(2deg, -2deg);
`;
