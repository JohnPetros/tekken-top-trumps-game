import { useState, useEffect, useRef } from "react";
import { useGame, Fighter, PlayerName } from "../../hooks/useGame";

import { Player } from "../Player";
import { Fighters } from "../Fighters";
import { Button } from "../Button";
import { Modal } from "../Modal";

import Success from "../../assets/animations/success.json";
import Fail from "../../assets/animations/fail.json";
import Draw from "../../assets/animations/draw.json";

import { Player as Animation } from "@lottiefiles/react-lottie-player";
import { Variants, motion } from "framer-motion";
import { Container } from "./styles";
import { fighters } from "../../utils/fighters";
import theme from "../../styles/theme";

export function Game() {
  const {
    state: { playerOne, playerTwo, stage, selectedAttribute, turn, isEndGame },
    dispatch,
  } = useGame();
  const [message, setMessage] = useState("Select your 10 fighters");
  const [isFightButtonVisible, setIsFightButtonVisible] = useState(false);
  const [isRoundResultModalVisible, setIsRoundResultModalVisible] =
    useState(false);
  const selectedFightersIds = useRef<number[]>([]);

  function setWinner(winner: PlayerName | null) {
    dispatch({ type: "setWinner", payload: winner });
    dispatch({ type: "setStage", payload: "round-result" });
  }

  const paragraphAnimation: Variants = {
    invisible: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  function compareFighters() {
    if (
      !selectedAttribute ||
      !playerOne.selectedFighter ||
      !playerTwo.selectedFighter
    )
      return;

    if (
      playerOne.selectedFighter.attributes[selectedAttribute] >
      playerTwo.selectedFighter.attributes[selectedAttribute]
    ) {
      setWinner("playerOne");
    } else if (
      playerOne.selectedFighter.attributes[selectedAttribute] ===
      playerTwo.selectedFighter.attributes[selectedAttribute]
    ) {
      setWinner(null);
    } else {
      setWinner("playerTwo");
    }
  }

  function getRandomFighter(fighters: Fighter[]) {
    let randomFighter = null;

    do {
      const randomIndex = Math.floor(Math.random() * fighters.length);
      randomFighter = fighters[randomIndex];
    } while (selectedFightersIds.current.includes(randomFighter.id));

    return randomFighter;
  }

  function getPlayerTwoFighter() {
    return new Promise<Fighter>((resolve, reject) => {
      setTimeout(() => {
        const fighter = getRandomFighter(playerTwo.fighters);
        if (fighter) {
          resolve(fighter);
        } else {
          reject("Fail to get the fighter");
        }
      }, 500);
    });
  }

  function setPlayerTwoSelectedFighter(fighter: Fighter) {
    dispatch({ type: "setPlayerTwoSelectedFighter", payload: fighter });
  }

  async function handleFightButtonClick() {
    dispatch({ type: "setStage", payload: "fighterTwo-selection" });

    try {
      selectedFightersIds.current = [];

      const times = playerTwo.fighters.length <= 5 ? 1 : 5;

      for (let i = 0; i < times; i++) {
        const playerTwoFighter = await getPlayerTwoFighter();
        setPlayerTwoSelectedFighter(playerTwoFighter);
        selectedFightersIds.current.push(playerTwoFighter.id);
      }

      dispatch({ type: "setStage", payload: "round-result" });
    } catch (error) {
      console.error(error);
    }
  }

  function getModalAnimation(isWinner: boolean | null) {
    if (isWinner !== null) {
      return isWinner ? Success : Fail;
    }
    return Draw;
  }

  function getModalMessage(isWinner: boolean | null): string {
    if (isWinner !== null) {
      return isWinner ? "You won!" : "You lost!";
    }
    return "We have a draw";
  }

  function getWinnerColor(isWinner: boolean | null): string {
    if (isWinner !== null) {
      return isWinner ? "blue_300" : "red";
    }
    return "yellow";
  }

  function changeTurn() {
    const newTurn = turn === "playerOne" ? "playerTwo" : "playerOne";
    dispatch({ type: "setTurn", payload: newTurn });
  }

  function exchangeLoserFighter() {
    let loserFighter = null;

    if (playerOne.isWinner) {
      loserFighter = playerTwo.selectedFighter;
    } else {
      loserFighter = playerOne.selectedFighter;
    }

    dispatch({ type: "setPlayerOneFighters", payload: loserFighter! });
    dispatch({ type: "setPlayerTwoFighters", payload: loserFighter! });

    changeTurn();
  }

  function handleNextRoundButtonClick() {
    if (playerOne.fighters.length === 20) {
      dispatch({ type: "setWinner", payload: "playerOne" });
      dispatch({ type: "setIsEndGame", payload: true });
      return;
    } else if (playerTwo.fighters.length === 20) {
      dispatch({ type: "setWinner", payload: "playerTwo" });
      dispatch({ type: "setIsEndGame", payload: true });
      return;
    }

    setIsRoundResultModalVisible(false);

    dispatch({ type: "setPlayerTwoSelectedFighter", payload: null });
    dispatch({ type: "setStage", payload: "attribute-selection" });

    if (playerOne.isWinner === null) {
      return;
    }

    exchangeLoserFighter();
    dispatch({ type: "setWinner", payload: null });
  }

  function handleEndGameButtonClick() {
    setIsRoundResultModalVisible(false);
    dispatch({ type: "resetGame" });
  }

  function isPlayerOneFighter(fighter: Fighter) {
    return playerOne.fighters.some(({ id }) => id === fighter.id);
  }

  function selectPlayerTwoFighters() {
    const playerTwoFighters = fighters.filter(
      (fighter) => !isPlayerOneFighter(fighter)
    );

    for (const fighter of playerTwoFighters) {
      dispatch({
        type: "setPlayerTwoFighters",
        payload: fighter,
      });
    }
  }

  function getRandomAttribute() {
    const attributes = ["force", "defense", "mobility"];
    const randomIndex = Math.floor(Math.random() * attributes.length);
    return attributes[randomIndex];
  }

  useEffect(() => {
    setIsFightButtonVisible(
      !!selectedAttribute && stage == "attribute-selection"
    );
  }, [selectedAttribute, stage]);

  useEffect(() => {
    switch (stage) {
      case "attribute-selection":
        if (turn === "playerTwo") {
          const attribute = getRandomAttribute();
          dispatch({ type: "setSelectedAttribute", payload: attribute });
          setMessage("Select your fighter");
          break;
        }
        dispatch({ type: "setSelectedAttribute", payload: null });
        setMessage("Select your fighter and attribute");
        break;
      case "fighterTwo-selection":
        setMessage("Selecting Fighter Two...");
        break;
      case "round-result":
        setMessage("Result");
        compareFighters();
        setIsRoundResultModalVisible(true);
        break;
    }
  }, [stage]);

  useEffect(() => {
    if (stage !== "fighterOne-selection") return;

    setMessage(`Select ${10 - playerOne.fighters.length} fighters`);

    if (playerOne.fighters.length === 10) {
      dispatch({ type: "setStage", payload: "attribute-selection" });
      dispatch({
        type: "setPlayerOneSelectedFighter",
        payload: playerOne.fighters[0],
      });

      selectPlayerTwoFighters();
    }
  }, [playerOne, stage]);

  return (
    <Container>
      <Player
        selectedFighter={playerOne.selectedFighter}
        fighters={playerOne.fighters}
        isWinner={playerOne.isWinner}
      />

      <div className="middle">
        <motion.p
          variants={paragraphAnimation}
          animate={selectedAttribute ? "visible" : "invisible"}
          transition={{ duration: 0.4 }}
          style={{ pointerEvents: selectedAttribute ? "auto" : "none" }}
          id="attribute"
        >
          The attribute of this round is
          <br />
          <span>{selectedAttribute}</span>
        </motion.p>
        <p>{message}</p>
        <Fighters />
        <Button
          title="Fight!!"
          onClick={handleFightButtonClick}
          isVisible={isFightButtonVisible}
        />
      </div>

      <Player
        selectedFighter={playerTwo.selectedFighter}
        fighters={playerTwo.fighters}
        isBot={true}
        isWinner={playerTwo.isWinner}
      />

      {isRoundResultModalVisible && (
        <Modal>
          <Animation
            autoplay
            keepLastFrame
            style={{ width: "12rem", height: "12rem" }}
            src={getModalAnimation(playerOne.isWinner)}
          ></Animation>
          <strong
            style={{
              color: theme.colors[getWinnerColor(playerOne.isWinner)],
            }}
          >
            {getModalMessage(playerOne.isWinner)}
          </strong>
          <Button title="Next Round" onClick={handleNextRoundButtonClick} />
        </Modal>
      )}

      {isEndGame && (
        <Modal>
          <Animation
            autoplay
            keepLastFrame
            style={{ width: "24rem", height: "24rem" }}
            src={
              playerOne.isWinner
                ? "https://assets9.lottiefiles.com/packages/lf20_touohxv0.json"
                : "https://assets4.lottiefiles.com/packages/lf20_q1i4uDv2pj.json"
            }
          ></Animation>
          <strong
            style={{
              color: theme.colors[playerOne.isWinner ? "yellow" : "red"],
            }}
          >
            {playerOne.isWinner ? "You're the champion!" : "You're the loser"}
          </strong>
          <Button title="Reset Game" onClick={handleEndGameButtonClick} />
        </Modal>
      )}
    </Container>
  );
}
