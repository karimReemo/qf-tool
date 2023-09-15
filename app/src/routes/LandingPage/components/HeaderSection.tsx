import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { landingPageHeaderStrings } from "../../../utils/constants";
import SearchSection from "./SearchSection";

interface IHeaderSectionProps {}

const HeaderSection: React.FunctionComponent<IHeaderSectionProps> = (props) => {
  return (
    <Grid direction={"column"} alignItems={'center'} >
      <Typography variant="h2" textAlign={"center"}>
        {landingPageHeaderStrings.mainHeader}
      </Typography>
      <Typography variant="h3" textAlign={"center"} marginTop={4}>
        {landingPageHeaderStrings.subHeader}
      </Typography>
      <SearchSection />
    </Grid>
  );
};

export default HeaderSection;
