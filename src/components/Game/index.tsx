import { Player } from "../Player";
import { Fighters } from "../Fighters";
// import { Scoreboard } from "../Scoreboard";
import { useGame } from "../hooks/useGame";
import { Button } from "../Button";
import { Container, Scoreboard } from "./styles";

export function Game() {
  const {
    state: { playerOne, playerTwo },
    dispatch,
  } = useGame();

  return (
    <Container>
      <Player fighter={playerOne.fighter} />

      <div className="middle">
        <Scoreboard>
          Player 1 <span>{playerOne.score}</span> VS{" "}
          <span>{playerTwo.score}</span> Player 2
        </Scoreboard>
        <Fighters />
        <Button title="Sort fighter" index={1} />
        <Button title="Fight" index={2} />
        <Button title="Next round" index={3} />
      </div>

      <Player fighter={playerTwo.fighter} isBot={true} />
    </Container>
  );
}
