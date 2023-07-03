import { ReactNode, createContext, useContext, useReducer } from "react";

interface Attributes {
  force: number;
  defense: number;
  mobility: number;
}

export interface Fighter {
  id: number;
  name: string;
  image: string;
  attributes: Attributes & {
    [attributeName: string]: number;
  };
}

export interface Player {
  score: number;
  fighter: Fighter | null;
  isWinner: boolean | null;
}

export type Winner = "playerOne" | "playerTwo";

type Stage =
  | "fighterOne-selection"
  | "fighterTwo-selection"
  | "attribute-selection"
  | "round-result";

type GameAction =
  | { type: "setPlayerOneFighter"; payload: Fighter }
  | { type: "setPlayerTwoFighter"; payload: Fighter }
  | { type: "setPreviewFighter"; payload: Fighter | null }
  | { type: "setSelectedAttribute"; payload: string | null }
  | { type: "setWinner"; payload: Winner }
  | { type: "setStage"; payload: Stage };

interface GameProviderProps {
  children: ReactNode;
}

interface GameState {
  playerOne: Player;
  playerTwo: Player;
  previewFighter: Fighter | null;
  selectedAttribute: string | null;
  stage: Stage;
}

const initialState: GameState = {
  playerOne: { score: 0, fighter: null, isWinner: null },
  playerTwo: { score: 0, fighter: null, isWinner: null },
  previewFighter: null,
  selectedAttribute: "",
  stage: "fighterOne-selection",
};

interface Context {
  state: GameState;
  dispatch: (action: GameAction) => void;
}

const GameContext = createContext({} as Context);

function GameReducer(state: GameState, action: GameAction) {
  switch (action.type) {
    case "setPlayerOneFighter":
      return {
        ...state,
        playerOne: { ...state.playerOne, fighter: action.payload },
      };
    case "setPlayerTwoFighter":
      return {
        ...state,
        playerTwo: { ...state.playerTwo, fighter: action.payload },
      };
    case "setPreviewFighter":
      return {
        ...state,
        previewFighter: action.payload,
      };
    case "setSelectedAttribute":
      return {
        ...state,
        selectedAttribute: action.payload,
      };
    case "setWinner":
      let { playerOne, playerTwo } = state;

      if (action.payload === "playerOne") {
        playerOne.isWinner = true;
        playerOne.score = playerOne.score + 1;

        playerTwo.isWinner = false;
      } else {
        playerTwo.isWinner = true;
        playerTwo.score = playerTwo.score + 1;

        playerOne.isWinner = false;
      }
      console.log(playerOne.score, playerTwo.score);

      return {
        ...state,
        playerOne,
        playerTwo,
        stage: "round-result",
      };
    case "setStage":
      return {
        ...state,
        stage: action.payload,
      };
    default:
      return state;
  }
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(GameReducer, initialState);

  const value = { state, dispatch };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}
