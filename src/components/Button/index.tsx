import { Variants } from "framer-motion";
import { Container } from "./styles";

interface ButtonProps {
  title: string;
  onClick: () => void;
  isVisible?: boolean;
}

export function Button({ title, onClick, isVisible = true }: ButtonProps) {
  const visibility: Variants = {
    visible: { opacity: 1, rotate: 0 },
    invisible: { opacity: 0 },
  };

  return (
    <Container
      variants={visibility}
      initial={{ opacity: 0, rotate: -90 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      animate={isVisible ? "visible" : "invisible"}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      isDisable={!isVisible}
    >
      {title}
    </Container>
  );
}
