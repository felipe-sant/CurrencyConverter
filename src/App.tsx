import { Provider } from "react-redux";
import ThemeProvider from "./provider/Theme.provider";
import Routers from "./routers/Router";
import "./styles/global.css";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Routers />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
