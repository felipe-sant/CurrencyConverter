import ThemeProvider from "./provider/Theme.provider";
import Routers from "./routers/Router";
import "./styles/global.css";

function App() {
  return (
    <ThemeProvider>
      <Routers />
    </ThemeProvider>
  );
}

export default App;
