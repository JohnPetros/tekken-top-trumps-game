import { useState, useEffect, useRef } from "react";
import { useGame, Fighter, Winner } from "../../hooks/useGame";

import { Player } from "../Player";
import { Fighters } from "../Fighters";
import { Scoreboard } from "../Scoreboard";
import { Button } from "../Button";
import { Modal } from "../Modal";

import Success from "../../assets/animations/success.json";

import { Player as Animation } from "@lottiefiles/react-lottie-player";
import { Container } from "./styles";
import { fighters } from "../../utils/fighters";
import theme from "../../styles/theme";

export function Game() {
  const {
    state: { playerOne, playerTwo, previewFighter, stage, selectedAttribute },
    dispatch,
  } = useGame();
  const [message, setMessage] = useState("Select your fighter");
  const [usedFightersIds, setUsedFightersIds] = useState<number[]>([]);
  const [isFightButtonVisible, setIsFightButtonVisible] = useState(false);
  const [isRoundResultModalVisible, setIsRoundResultModalVisible] =
    useState(false);
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

    setUsedFightersIds((currentUsedFightersIds) => [
      ...currentUsedFightersIds,
      playerOne.fighter!.id,
      playerTwo.fighter!.id,
    ]);
  }

  function getRandomFighter() {
    let randomFighter = null;

    do {
      const randomIndex = Math.floor(Math.random() * fighters.length);
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

  async function handleFightButtonClick() {
    dispatch({ type: "setStage", payload: "fighterTwo-selection" });

    try {
      selectedFightersIds.current = [];

      for (let i = 0; i < 5; i++) {
        const playerTwoFighter = await getPlayerTwoFighter();
        setPlayerTwoFighter(playerTwoFighter);
        selectedFightersIds.current.push(playerTwoFighter.id);
      }

      dispatch({ type: "setStage", payload: "round-result" });
      console.log("oi");
    } catch (error) {
      console.error(error);
    }
  }

  function handleNextRoundButtonClick() {}

  useEffect(() => {
    setIsFightButtonVisible(!!selectedAttribute);
  }, [selectedAttribute]);

  useEffect(() => {
    console.log({ stage });

    switch (stage) {
      case "fighterOne-selection":
        setMessage("Select your fighter");
        break;
      case "attribute-selection":
        setMessage("Select one attribute of the fighter");
        break;
      case "fighterTwo-selection":
        setMessage("Fighting");
        break;
      case "round-result":
        setMessage("Result");
        compareFighters();
        setIsRoundResultModalVisible(true);
        break;
    }
  }, [stage]);

  return (
    <Container>
      <Player
        fighter={previewFighter ?? playerOne.fighter}
        isWinner={playerOne.isWinner}
      />

      <div className="middle">
        <p>{message}</p>
        <Scoreboard />
        <Fighters />
        <Button
          title="Fight!!"
          onClick={handleFightButtonClick}
          isVisible={isFightButtonVisible}
        />
      </div>

      <Player
        fighter={playerTwo.fighter}
        isBot={true}
        isWinner={playerTwo.isWinner}
      />

      {isRoundResultModalVisible && (
        <Modal>
          <Animation autoplay keepLastFrame src={Success}></Animation>
          <strong style={{ color: theme.colors.blue_300 }}>You wins!</strong>
          <Button title="Next Round" onClick={handleNextRoundButtonClick} />
        </Modal>
      )}
    </Container>
  );
}
