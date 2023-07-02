import { ReactNode, createContext, useContext, useReducer } from "react";
import { fighters } from "../../utils/fighters";

export interface Fighter {
  id: number;
  name: string;
  image: string;
  attributes: {
    force: number;
    defense: number;
    mobility: number;
  };
}

export interface Player {
  score: number;
  fighter: Fighter | null;
}

type GameAction =
  | { type: "setSelectedFighterOne"; fighter: Fighter }
  | { type: "setSelectedFighterTwo"; fighter: Fighter };

interface GameProviderProps {
  children: ReactNode;
}

interface GameState {
  playerOne: Player;
  playerTwo: Player;
}

const initialState: GameState = {
  playerOne: { score: 0, fighter: fighters[1] },
  playerTwo: { score: 0, fighter: fighters[5] },
};

interface Context {
  state: GameState;
  dispatch: (action: GameAction) => void;
}

const GameContext = createContext({} as Context);

function GameReducer(state: GameState, action: GameAction) {
  switch (action.type) {
    case "setSelectedFighterOne":
      return { ...state, selectedFighterOne: action.fighter };
    case "setSelectedFighterTwo":
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
