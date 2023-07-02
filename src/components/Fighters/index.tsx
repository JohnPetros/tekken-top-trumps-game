import { Container, Fighter } from "./styles";
import { fighters } from "../../utils/fighters";

export function Fighters() {
  return (
    <Container>
      {fighters.map(({ id, image }) => (
        <Fighter key={id} image={`https://i.postimg.cc/${image}`}>
          <button />
        </Fighter>
      ))}
    </Container>
  );
}
