import { createContext, useState } from "react";

export const ThemeContext = createContext({
    themeColor: null,
    setThemeColor: () => null,
});


export const UserProvider = ({children}) => {
    
    const [themeColor, setThemeColor] = useState("bg-blue-500");
    const value = {themeColor, setThemeColor};

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
