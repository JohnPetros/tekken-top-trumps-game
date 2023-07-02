import { useGame } from "../../hooks/useGame";
import { Container, Score } from "./styles";
import theme from "../../styles/theme";

export function Scoreboard() {
  const {
    state: { playerOne, playerTwo },
  } = useGame();

  return (
    <Container>
      Player 1 <Score color={theme.colors.blue_300}>8</Score> vs{" "}
      <Score color={theme.colors.red}>8</Score> Player 2
    </Container>
  );
}
