import { Player } from "../Player";
import { Fighters } from "../Fighters";
import { Scoreboard } from "../Scoreboard";
import { Button } from "../Button";
import { Container } from "./styles";

export function Game() {
  return (
    <Container>
      <Player />
      <div className="middle">
        <h1>Select your fighter</h1>
        <Scoreboard />
        <Fighters />
        <Button title="Sort fighter" />
        <Button title="Fight" />
        <Button title="Next round" />
      </div>
      <Player isBot={true} />
    </Container>
  );
}
