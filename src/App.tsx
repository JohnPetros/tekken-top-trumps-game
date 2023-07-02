import { Game } from "./components/Game";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import theme from "./styles/theme";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Game />
      <GlobalStyles />
    </ThemeProvider>
  );
}
