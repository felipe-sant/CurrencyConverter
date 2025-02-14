import { ReactNode, useEffect, useState } from "react";
import Theme from "../types/Theme.type";
import getCookie from "../functions/utils/getCookie";
import ThemeContext from "../context/Theme.context";
import setCookie from "../functions/utils/setCookie";

function ThemeProvider(props: { children: ReactNode }) {
    const [ theme, setTheme ] = useState<Theme>('light');

    useEffect(() => {
        const theme = getCookie('theme');
        if (theme === "light"|| theme === "dark") setTheme(theme);
    }, [])

    function toggleTheme() {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        setCookie('theme', newTheme, 30);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider