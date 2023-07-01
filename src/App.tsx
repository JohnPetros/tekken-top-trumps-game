import { Characters } from "./components/Characters";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import theme from "./styles/theme";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <main id="container">
        <div></div>
        <div>
          <h1>Tekken</h1>
          <Characters />
        </div>
        <div></div>
      </main>
      <GlobalStyles />
    </ThemeProvider>
  );
}
