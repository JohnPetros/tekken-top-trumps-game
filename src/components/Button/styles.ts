import styled from "styled-components";
import { motion } from "framer-motion";

interface Button {
  isDisable: boolean;
}

export const Container = styled(motion.button)<Button>`
  width: 14rem;
  padding: 1.2rem;

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue_900};
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 8px;

  font-size: 1.6rem;
  text-align: center;

  transition: all 0.2s ease;

  pointer-events: ${({ isDisable }) => (isDisable ? "none" : "auto")};

  &:hover {
    color: ${({ theme }) => theme.colors.purple};
    border-color: ${({ theme }) => theme.colors.purple};
  }

  & + & {
    margin-top: 1.2rem;
  }
`;
