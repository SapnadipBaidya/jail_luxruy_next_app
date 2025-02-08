"use client";
import React, { createContext, useState, useMemo, useContext, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import { lightTheme, darkTheme } from "../styles/theme";

const ThemeContext = createContext();

export function ThemeProviderWrapper({ initialTheme, children }) {
  // Ensure SSR consistency by initializing from cookies (if available)
  const [themeMode, setThemeMode] = useState(() => {
    return typeof window !== "undefined"
      ? Cookies.get("theme") || initialTheme || "light"
      : initialTheme || "light";
  });

  useEffect(() => {
    Cookies.set("theme", themeMode, { expires: 365 });
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => (themeMode === "light" ? lightTheme : darkTheme), [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
