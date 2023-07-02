import { Player } from "../Player";
import { Characters } from "../Characters";
import { Container } from "./styles";

export function Game() {
  return (
    <Container>
      <Player />
      <div className="middle">
        <h1>Tekken</h1>
        <Characters />
      </div>
      <Player isBot={true} />
    </Container>
  );
}
