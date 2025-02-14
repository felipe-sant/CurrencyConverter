import Theme from "../Theme.type";

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

export default ThemeContextProps