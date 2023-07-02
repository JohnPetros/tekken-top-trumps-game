import { useState, useEffect } from "react";
import { Player } from "../Player";
import { useGame } from "../../hooks/useGame";
import { Fighters } from "../Fighters";
import { Scoreboard } from "../Scoreboard";
import { Button } from "../Button";
import { Container } from "./styles";

export function Game() {
  const {
    state: { playerOne, playerTwo, previewFighter, stage },
    dispatch,
  } = useGame();
  const [message, setMessage] = useState("Select your fighter");

  function handleFighterTwoSelection() {}

  useEffect(() => {
    switch (stage) {
      case "fighterOne-selection":
        setMessage("Select your fighter");
        break;
      case "attribute-selection":
        setMessage("Select one attribute of the fighter");
        break;
    }
  }, [playerOne, playerTwo]);

  return (
    <Container>
      <Player fighter={previewFighter ?? playerOne.fighter} />

      <div className="middle">
        <p>{message}</p>
        <Scoreboard />
        <Fighters />
        <Button title="Fight" onClick={handleFighterTwoSelection} />
      </div>

      <Player fighter={playerTwo.fighter} isBot={true} />
    </Container>
  );
}
