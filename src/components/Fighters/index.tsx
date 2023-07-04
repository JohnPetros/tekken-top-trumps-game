import { Fighter, useGame } from "../../hooks/useGame";

import { Container, FighterCard } from "./styles";
import { fighters } from "../../utils/fighters";

export function Fighters() {
  const {
    state: { playerOne, playerTwo, stage },
    dispatch,
  } = useGame();

  function getFighter(id: number) {
    return fighters.find((fighter) => fighter.id === id)!;
  }

  function setPlayerOneSelectedFighter(fighter: Fighter | null) {
    dispatch({ type: "setPlayerOneSelectedFighter", payload: fighter });
  }

  function setPlayerOneFighters(newFighter: Fighter) {
    dispatch({ type: "setPlayerOneFighters", payload: newFighter });
  }

  function handleFighterMouseOver(id: number) {
    const fighter: Fighter = getFighter(id);
    setPlayerOneSelectedFighter(fighter);
  }

  function handleFighterMouseLeave() {
    if (stage !== "fighterOne-selection") return;
    setPlayerOneSelectedFighter(null);
  }

  function handleFighterClick(id: number) {
    if (stage === "fighterOne-selection") {
      const fighter: Fighter = getFighter(id);
      setPlayerOneSelectedFighter(fighter);
      setPlayerOneFighters(fighter);
    } else if (stage === "attribute-selection") {
      const fighter: Fighter = getFighter(id);
      setPlayerOneSelectedFighter(fighter);
    }
  }

  return (
    <Container>
      {fighters.map(({ id, image }) => {
        const isPlayerOne = playerOne.fighters.some(
          (fighter) => fighter.id === id
        );
        const isPlayerTwo = playerTwo.fighters.some(
          (fighter) => fighter.id === id
        );
        const isPlayer = isPlayerOne || isPlayerTwo;

        return (
          <FighterCard
            key={id}
            image={`https://i.postimg.cc/${image}`}
            isPlayerOne={isPlayerOne}
            isPlayerTwo={isPlayerTwo}
            disabled={stage !== "fighterOne-selection"}
            onMouseOver={() => handleFighterMouseOver(id)}
            onMouseLeave={handleFighterMouseLeave}
            onClick={() => handleFighterClick(id)}
          >
            {isPlayer && <span>{isPlayerOne ? "1P" : "2P"}</span>}
          </FighterCard>
        );
      })}
    </Container>
  );
}
