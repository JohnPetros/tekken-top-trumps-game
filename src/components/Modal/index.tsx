import { ReactNode } from "react";

import { Container } from "./styles";

interface ModalProps {
  children: ReactNode;
}

export function Modal({ children }: ModalProps) {
  return (
    <Container
      animate={{
        scale: [0, 1.2, 1],
        opacity: [0, 0.75, 1],
        x: "-50%",
        y: "-50%",
      }}
    >
      {children}
    </Container>
  );
}
