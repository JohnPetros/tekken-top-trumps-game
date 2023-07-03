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
  selectedFighter: Fighter | null;
  fighters: Fighter[];
  isWinner: boolean | null;
}

export type PlayerName = "playerOne" | "playerTwo";

type Stage =
  | "fighters-selection"
  | "fighterTwo-selection"
  | "attribute-selection"
  | "round-result";

type GameAction =
  | { type: "setPlayerOneSelectedFighter"; payload: Fighter | null }
  | { type: "setPlayerTwoSelectedFighter"; payload: Fighter | null }
  | { type: "setPlayerOneFighters"; payload: Fighter }
  | { type: "setPlayerTwoFighters"; payload: Fighter }
  | { type: "setSelectedAttribute"; payload: string | null }
  | { type: "setWinner"; payload: PlayerName | null }
  | { type: "setTurn"; payload: PlayerName }
  | { type: "setIsEndGame"; payload: boolean }
  | { type: "setStage"; payload: Stage }
  | { type: "resetGame" };

interface GameProviderProps {
  children: ReactNode;
}

interface GameState {
  playerOne: Player;
  playerTwo: Player;
  previewFighter: Fighter | null;
  selectedAttribute: string | null;
  stage: Stage;
  turn: PlayerName;
  isEndGame: boolean;
}

const initialState: GameState = {
  playerOne: {
    selectedFighter: null,
    fighters: [],
    isWinner: null,
  },
  playerTwo: { selectedFighter: null, fighters: [], isWinner: null },
  previewFighter: null,
  selectedAttribute: "",
  stage: "fighters-selection",
  turn: "playerOne",
  isEndGame: false,
};

interface Context {
  state: GameState;
  dispatch: (action: GameAction) => void;
}

const GameContext = createContext({} as Context);

function getUpdatedFighters(currentFighters: Fighter[], newFighter: Fighter) {
  const isIncluded = currentFighters.some(({ id }) => id === newFighter!.id);

  if (isIncluded) {
    return currentFighters.filter(({ id }) => id !== newFighter.id);
  }
  return [...currentFighters, newFighter];
}

function GameReducer(state: GameState, action: GameAction) {
  switch (action.type) {
    case "setPlayerOneSelectedFighter":
      return {
        ...state,
        playerOne: { ...state.playerOne, selectedFighter: action.payload },
      };
    case "setPlayerTwoSelectedFighter":
      return {
        ...state,
        playerTwo: { ...state.playerTwo, selectedFighter: action.payload },
      };
    case "setPlayerOneFighters":
      const playerOneUpdatedFighters = getUpdatedFighters(
        state.playerOne.fighters,
        action.payload
      );
      return {
        ...state,
        playerOne: { ...state.playerOne, fighters: playerOneUpdatedFighters },
      };
    case "setPlayerTwoFighters":
      const playerTwoUpdatedFighters = getUpdatedFighters(
        state.playerTwo.fighters,
        action.payload
      );
      return {
        ...state,
        playerTwo: { ...state.playerTwo, fighters: playerTwoUpdatedFighters },
      };
    case "setSelectedAttribute":
      return {
        ...state,
        selectedAttribute: action.payload,
      };
    case "setWinner":
      let { playerOne, playerTwo } = state;

      if (!action.payload) {
        playerOne.isWinner = null;
        playerTwo.isWinner = null;
      } else if (action.payload === "playerOne") {
        playerOne.isWinner = true;
        playerTwo.isWinner = false;
      } else {
        playerTwo.isWinner = true;
        playerOne.isWinner = false;
      }

      return {
        ...state,
        playerOne,
        playerTwo,
      };
    case "setStage":
      return {
        ...state,
        stage: action.payload,
      };
    case "setTurn":
      return {
        ...state,
        turn: action.payload,
      };
    case "setIsEndGame":
      return {
        ...state,
        isEndGame: action.payload,
      };
    case "setIsEndGame":
      return {
        ...state,
        isEndGame: action.payload,
      };
    case "resetGame":
    default:
      return initialState;
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
