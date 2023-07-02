import { Fighter as FighterData, useGame } from "../../hooks/useGame";
import { Variants } from "framer-motion";

import { Container, Fighter } from "./styles";
import theme from "../../styles/theme";
import { fighters } from "../../utils/fighters";

export function Fighters() {
  const {
    state: { playerOne, playerTwo },
    dispatch,
  } = useGame();

  function getFighter(id: number) {
    return fighters.find((fighter) => fighter.id === id)!;
  }

  function handleFigtherMouseOver(id: number) {
    const fighter: FighterData = getFighter(id);
    dispatch({ type: "setPreviewFighter", payload: fighter });
  }

  function handleFigtherMouseLeave() {
    dispatch({ type: "setPreviewFighter", payload: null });
  }

  function handleFighterClick(id: number) {
    const fighter: FighterData = getFighter(id);
    dispatch({ type: "setPlayerOneFighter", payload: fighter });
  }

  return (
    <Container>
      {fighters.map(({ id, image }) => {
        const isPlayerOne = playerOne?.fighter?.id === id;
        const isPlayerTwo = playerTwo?.fighter?.id === id;
        const isPlayer = isPlayerOne || isPlayerTwo;

        const color =
          theme.colors[
            isPlayerOne ? "blue_300" : isPlayerTwo ? "red" : "purple"
          ];

        const shadowAnimation: Variants = {
          active: {
            boxShadow: [
              `0px 0px 12px 4px ${color}`,
              `0px 0px 12px 8px ${color}`,
            ],
            transition: {
              duration: 0.2,
              repeat: Infinity,
              repeatType: "mirror",
            },
          },
          desactive: {
            boxShadow: `0`,
          },
        };

        return (
          <Fighter
            key={id}
            image={`https://i.postimg.cc/${image}`}
            variants={shadowAnimation}
            animate={isPlayer ? "active" : "desactive"}
            onMouseOver={() => handleFigtherMouseOver(id)}
            onMouseLeave={handleFigtherMouseLeave}
            onClick={() => handleFighterClick(id)}
          >
            {isPlayer && <span>{isPlayerOne ? "1P" : "2P"}</span>}
            <button />
          </Fighter>
        );
      })}
    </Container>
  );
}
