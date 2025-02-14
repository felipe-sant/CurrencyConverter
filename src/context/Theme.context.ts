
import { createContext } from "react";
import ThemeContextProps from "../types/interfaces/Theme.interface";

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: () => {},
});

export default ThemeContext;