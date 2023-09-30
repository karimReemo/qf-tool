import * as React from "react";
import Grid from "@mui/material/Grid";
import LogoSection from "./components/LogoSection";
import { css } from "@emotion/react";
import LinksSection from "./components/LinksSection";
import ContactSection from "./components/ContactSection";
import { mq } from "../../assets/global-styles";

interface IFooterProps {}

const root = css`
  margin-top: 12px;
  padding: 20px 8%;
  ${mq["xl"]} {
    padding: 20px 10%;
  }
  background-color: inherit;
  border-top: 1px solid rgba(36, 36, 36, 0.1);
`;

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <Grid container direction={{ xs: "column", lg: "row" }} css={root}>
      <Grid item lg={4} container justifyContent={"flex-start"}>
        <LogoSection />
      </Grid>
      <Grid item container lg={8} direction={"row"} marginTop={{xs:8,lg:0}}>
        <Grid
          item
          xs={6}
          container
          justifyContent={{ xs: "start", lg: "center" }}
        >
          <LinksSection />
        </Grid>
        <Grid item xs={6} container justifyContent={{ xs: "start", lg: "flex-end" }}>
          <ContactSection />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
