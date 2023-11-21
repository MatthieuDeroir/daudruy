import { createContext, useContext, useState } from "react";

const ThemeModeContext = createContext();

export const useThemeMode = () => {
  return useContext(ThemeModeContext);
};

export const CustomThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem("theme") || "light"); // Default to "light" theme

  const toggleTheme = () => {
    setThemeMode((prevThemeMode) => {
      const nextTheme = prevThemeMode === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      return nextTheme;
    });
  };

  const value = {
    themeMode,
    toggleTheme,
  };

  return (
    <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>
  );
};
