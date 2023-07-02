import { Player } from "../Player";
import { Fighters } from "../Fighters";
// import { Scoreboard } from "../Scoreboard";
import { Button } from "../Button";
import { Container, Scoreboard } from "./styles";

export function Game() {
  return (
    <Container>
      <Player />
      <div className="middle">
        {/* <h1>Select your fighter</h1> */}
        <Scoreboard>
          Player 1 <span>8</span> VS <span>8</span> Player 2
        </Scoreboard>
        <Fighters />
        <Button title="Sort fighter" index={1} />
        <Button title="Fight" index={2} />
        <Button title="Next round" index={3} />
      </div>
      <Player isBot={true} />
    </Container>
  );
}
