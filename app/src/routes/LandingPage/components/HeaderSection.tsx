import { Grid, Typography, css } from "@mui/material";
import * as React from "react";
import { landingPageHeaderStrings } from "../../../utils/constants";
import SearchSection from "./SearchSection";

interface IHeaderSectionProps {}

const HeaderSection: React.FunctionComponent<IHeaderSectionProps> = () => {
  return (
    <Grid direction={"column"} alignItems={"center"}>
      <Typography variant="h2" textAlign={"center"} css={mainTitleStyle}>
        {landingPageHeaderStrings.mainHeader}
      </Typography>
      <Typography css={subTitleStyle} variant="h3" textAlign={"center"}>
        {landingPageHeaderStrings.subHeader}
      </Typography>
      <SearchSection />
    </Grid>
  );
};

const mainTitleStyle=css`
  font-size: 3em;
`

const subTitleStyle=css`
  font-size: 1.8em;
  margin-top: 12px;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
`

export default HeaderSection;


