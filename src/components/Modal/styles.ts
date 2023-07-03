import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;

  width: 375px;
  max-width: 90%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  background: ${({ theme }) => theme.colors.blue_700};
  padding: 2.4rem;
`;
