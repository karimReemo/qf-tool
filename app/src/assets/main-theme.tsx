import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#333399",
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
    h2: {
      color: "#2A3342",
      fontSize:'36px',
      fontWeight: 700,
      fontFamily:"ZawyaWideBold"

    },
    h3: {
      color: "#556987",
      fontSize:'24px',
      fontFamily:"ZawyaWideExtraLight"

    },
  },
});

export default theme;
