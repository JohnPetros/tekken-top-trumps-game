import { Container } from "./styles";

interface ButtonProps {
  title: string;
}

export function Button({ title }: ButtonProps) {
  return <Container>{title}</Container>;
}
