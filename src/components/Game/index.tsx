import { useState, useEffect, useRef } from "react";
import { useGame, Fighter, Winner } from "../../hooks/useGame";

import { Player } from "../Player";
import { Fighters } from "../Fighters";
import { Scoreboard } from "../Scoreboard";
import { Button } from "../Button";
import { Modal } from "../Modal";

import { Container } from "./styles";
import { fighters } from "../../utils/fighters";
import theme from "../../styles/theme";

export function Game() {
  const {
    state: { playerOne, playerTwo, previewFighter, stage, selectedAttribute },
    dispatch,
  } = useGame();
  const [message, setMessage] = useState("Select your fighter");
  const [usedFightersIds, setUsedFightersIds] = useState<Fighter[]>([]);
  const selectedFightersIds = useRef<number[]>([]);

  function setWinner(winner: Winner) {
    dispatch({ type: "setWinner", payload: winner });
  }

  function compareFighters() {
    if (!selectedAttribute || !playerOne.fighter || !playerTwo.fighter) return;

    if (
      playerOne.fighter.attributes[selectedAttribute] >
      playerTwo.fighter.attributes[selectedAttribute]
    ) {
      setWinner("playerOne");
    } else {
      setWinner("playerTwo");
    }
  }

  function handleNextRound() {}

  function getRandomFighter() {
    let randomFighter = null;

    do {
      const randomIndex = Math.floor(Math.random() * fighters.length) + 1;
      randomFighter = fighters[randomIndex];
    } while (
      randomFighter.id === playerOne?.fighter?.id ||
      selectedFightersIds.current.includes(randomFighter.id)
    );

    return randomFighter;
  }

  function getPlayerTwoFighter() {
    return new Promise<Fighter>((resolve, reject) => {
      setTimeout(() => {
        const fighter = getRandomFighter();
        if (fighter) {
          resolve(fighter);
        } else {
          reject("Fail to get the fighter");
        }
      }, 1000);
    });
  }

  function setPlayerTwoFighter(fighter: Fighter) {
    dispatch({ type: "setPlayerTwoFighter", payload: fighter });
  }

  async function handleFighterTwoSelection() {
    try {
      selectedFightersIds.current = [];

      for (let i = 0; i < 5; i++) {
        const playerTwoFighter = await getPlayerTwoFighter();
        setPlayerTwoFighter(playerTwoFighter);
        selectedFightersIds.current.push(playerTwoFighter.id);
      }

      compareFighters();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    switch (stage) {
      case "fighterOne-selection":
        setMessage("Select your fighter");
        break;
      case "attribute-selection":
        setMessage("Select one attribute of the fighter");
        break;
      case "fighterTwo-selection":
        setMessage("Click on fight");
        break;
    }
  }, [stage]);

  return (
    <Container>
      <Player fighter={previewFighter ?? playerOne.fighter} />

      <div className="middle">
        <p>{message}</p>
        <Scoreboard />
        <Fighters />
        {stage === "fighterTwo-selection" && (
          <Button title="Fight!!" onClick={handleFighterTwoSelection} />
        )}
      </div>

      <Player fighter={playerTwo.fighter} isBot={true} />

      <Modal>
        <strong style={{ color: theme.colors.blue_300 }}>You wins!</strong>
        <Button title="Next Round" onClick={handleNextRound} />
      </Modal>
    </Container>
  );
}
