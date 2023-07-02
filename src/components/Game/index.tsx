import { Player } from "../Player";
import { useGame, Fighter } from "../../hooks/useGame";
import { Fighters } from "../Fighters";
// import { Scoreboard } from "../Scoreboard";
import { Button } from "../Button";
import { Container, Scoreboard } from "./styles";

export function Game() {
  const {
    state: { playerOne, playerTwo, previewFighter },
    dispatch,
  } = useGame();

  return (
    <Container>
      <Player
        fighter={previewFighter ?? playerOne.fighter}
        hasFighter={!!playerOne.fighter}
      />

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

      <Player
        fighter={playerTwo.fighter}
        hasFighter={!!playerTwo.fighter}
        isBot={true}
      />
    </Container>
  );
}
