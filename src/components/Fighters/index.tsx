import { useGame } from "../hooks/useGame";
import { fighters } from "../../utils/fighters";
import { Container, Fighter } from "./styles";
import theme from "../../styles/theme";
import { Variants } from "framer-motion";

export function Fighters() {
  const {
    state: { playerOne, playerTwo },
    dispatch,
  } = useGame();

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
              `0`,
              `0px 0px 12px 4px ${color}`,
              `0px 0px 12px 8px ${color}`,
            ],
            transition: {
              duration: 0.2,
              repeat: Infinity,
              repeatType: "mirror",
            },
          },
        };

        return (
          <Fighter
            key={id}
            image={`https://i.postimg.cc/${image}`}
            variants={shadowAnimation}
            animate={isPlayer && "active"}
            whileHover={"active"}
          >
            {isPlayer && <span>{isPlayerOne ? "1P" : "2P"}</span>}
            <button />
          </Fighter>
        );
      })}
    </Container>
  );
}
