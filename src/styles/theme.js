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
      main: "#dacecc",
    },
    background: {
      default: "#faf9f6",
      paper: "#dbd5cd",
    },
    navbac:{
      main:"#ece8dd",
    },
  },
  custom: { // ✅ Define custom properties here
    btnBgColor:"#dbd5cd",
    primaryButtonFontColor: "#363230",
    secondaryButtonFontColor:"#ffffff",
    btnBorder:"#363230",
    cardBg:"#e8e8e5",
    banner:"#foede4"
  },
  typography: {
    fontFamily: "Sanchez",
    color:"#121212",
  },
  cardHover:{
    main:"#dacecc",
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
      main: "#2d2121",
    },
    secondary: {
      main: "#CCB878",
    },
    background: {
      default: "#121212", //2b2b2a , 575655 , 151515
      paper: "#1b1a1a",
    },
    navbac:{
      main:"#000000",
    },
  },
  custom: { // ✅ Define custom properties here
    btnBgColor:"#363230",
    primaryButtonFontColor: "#dbd5cd",
    secondaryButtonFontColor:"#ffffff",
    btnBorder:"black" ,// profile btn border
    cardBg:"#232323",
    banner:"#oeoeoe"
  },
  typography: {
    fontFamily: "'Keqima', Roboto, Arial, sans-serif", 
    color:"#faf9f6",
  },
  cardHover:{
    main:"#2d2121",
  },
  
});
