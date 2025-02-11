import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#573C2C",
    },
    secondary: {
      main: "#ded4c0",
    },
    ascentColor: {
      main: "#bba3a3",
    },
    background: {
      default: "#f9f8f6",
      paper: "#dbd5cd",
    },
  },
  custom: { // ✅ Define custom properties here
    btnBgColor:"#dbd5cd",
    primaryButtonFontColor: "#363230",
    secondaryButtonFontColor:"#ffffff",
    btnBorder:"#363230",
    cardBg:"#fdf4ee",
    banner:"#f3ece3"
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

// ✅ Correct way to add custom properties
export const darkTheme = createTheme(lightTheme, {
  palette: {
    mode: "dark",
    primary: {
      main: "#573C2C",
    },
    ascentColor: {
      main: "#483030",
    },
    secondary: {
      main: "#CCB878",
    },
    background: {
      default: "#302d2b",
      paper: "#1b1a1a",
    },
  },
  custom: { // ✅ Define custom properties here
    btnBgColor:"#363230",
    primaryButtonFontColor: "#dbd5cd",
    secondaryButtonFontColor:"#ffffff",
    btnBorder:"black" ,// profile btn border
    cardBg:"#161615",
    banner:"#201d1c"
  },
});
