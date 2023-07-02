import { Container } from "./styles";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

export function Button({ title, onClick }: ButtonProps) {
  return (
    <Container
      // animate={{ opacity: [0, isActive ? 1 : 0.5], scale: isActive ? 1 : 0.9 }}
      // transition={{ delay: 0.5 * index, duration: 0.4 }}
      onClick={onClick}
      // disabled={!isActive}
    >
      {title}
    </Container>
  );
}
