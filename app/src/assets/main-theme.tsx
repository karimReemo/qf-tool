import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { primaryColor } from "./global-styles";

// A custom theme for this app
let theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: "#23A4C9",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#FAFBFB",
    },
  },
  typography: {
    fontFamily: `'Nunito', sans-serif;`,
    h1: {
      color: "#2A3342",
      fontSize: "40px",
      fontWeight: 700,
      fontFamily: "ZawyaWideBold",
    },
    h2: {
      color: "#2A3342",
      fontSize: "2.5em",
      fontWeight: 700,
      fontFamily: "ZawyaWideBold",
    },
    h3: {
      color: "#556987",
      fontSize: "1.5em",
      fontFamily: "ZawyaWideExtraLight",
    },
    h4: {
      color: "#090909",
      fontSize: "18px",
      fontFamily: "ZawyaNormalSemiBold",
    },
  },
});


export default theme;
