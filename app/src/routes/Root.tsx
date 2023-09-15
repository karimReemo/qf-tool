import { useTheme } from "@mui/material/styles";
import AppBar from "../global/AppBar";
import * as React from "react";
import { Outlet } from "react-router-dom";
import { Global } from "@emotion/react";
import { styles } from "../assets/global-styles";
import Footer from "../global/Footer/Footer";

interface IRootProps {}

const Root: React.FunctionComponent<IRootProps> = (props) => {
  const theme = useTheme();


  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Global styles={styles} />

      <AppBar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Root;
