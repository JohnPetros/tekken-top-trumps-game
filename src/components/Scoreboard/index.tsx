import { useGame } from "../../hooks/useGame";
import { Container, Score } from "./styles";
import theme from "../../styles/theme";
const { blue_300, red } = theme.colors;

export function Scoreboard() {
  const {
    state: { playerOne, playerTwo },
  } = useGame();

  return (
    <Container>
      Player 1 <Score color={blue_300}>{playerOne.score}</Score> vs{" "}
      <Score color={red}>{playerTwo.score}</Score> Player 2
    </Container>
  );
}
