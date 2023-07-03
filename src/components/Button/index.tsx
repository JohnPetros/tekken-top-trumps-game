import { Container } from "./styles";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

export function Button({ title, onClick }: ButtonProps) {
  return (
    <Container
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }}
      animate={{ rotate: [-90, 0], opacity: [0, 1] }}
      transition={{ scale: { duration: 0.2 }, duration: 0.4 }}
      onClick={onClick}
      // disabled={!isActive}
    >
      {title}
    </Container>
  );
}
