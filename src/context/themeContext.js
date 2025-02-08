"use client";
import React, { createContext, useState, useMemo, useContext, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import { lightTheme, darkTheme } from "../styles/theme";

const ThemeContext = createContext();

export function ThemeProviderWrapper({ initialTheme, children }) {
  // Function to determine the default theme based on cookies or time of day
  const getDefaultTheme = () => {
    if (typeof window === "undefined") {
      return initialTheme || "light"; // Fallback for SSR
    }

    // Check if a theme has already been set in cookies
    const cookieTheme = Cookies.get("theme");

    // Determine theme based on current hour (0-23)
    const hour = new Date().getHours();
    const timeBasedTheme = (hour >= 18 || hour < 7) ? "dark" : "light";

    // If no cookie exists, use the time-based theme
    if (!cookieTheme) {
      return timeBasedTheme;
    }

    // If the user has manually toggled the theme, respect their preference
    const userHasToggledTheme = Cookies.get("userHasToggledTheme") === "true";
    if (userHasToggledTheme) {
      return cookieTheme;
    }

    // If the time-based theme differs from the cookie theme, update the cookie
    if (timeBasedTheme !== cookieTheme) {
      Cookies.set("theme", timeBasedTheme, { expires: 365, path: "/" });
      return timeBasedTheme;
    }

    // Default to the cookie theme
    return cookieTheme;
  };

  // Initialize theme mode using a function to ensure it's only called once
  const [themeMode, setThemeMode] = useState(() => getDefaultTheme());

  // Persist theme in cookies and update data attribute
  useEffect(() => {
    Cookies.set("theme", themeMode, { expires: 365, path: "/" });
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newTheme = prevMode === "light" ? "dark" : "light";
      // Mark that the user has manually toggled the theme
      Cookies.set("userHasToggledTheme", "true", { expires: 365, path: "/" });
      return newTheme;
    });
  };

  // Memoize the theme object to avoid unnecessary re-renders
  const theme = useMemo(() => (themeMode === "light" ? lightTheme : darkTheme), [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);