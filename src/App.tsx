import { Game } from "./components/Game";
import { GameProvider } from "./components/hooks/useGame";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import theme from "./styles/theme";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GameProvider>
        <Game />
        <GlobalStyles />
      </GameProvider>
    </ThemeProvider>
  );
}
