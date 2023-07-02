import { useState } from "react";
import { Container } from "./styles";

interface ButtonProps {
  title: string;
  index: number;
}

export function Button({ title, index }: ButtonProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <Container
      animate={{ opacity: [0, isActive ? 1 : 0.5], scale: isActive ? 1 : 0.9 }}
      transition={{ delay: 0.5 * index, duration: 0.4 }}
      disabled={!isActive}
    >
      {title}
    </Container>
  );
}
