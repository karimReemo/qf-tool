import * as React from "react";
import HeaderSection from "./components/HeaderSection";
import { Stack } from "@mui/material";

interface ILandingPageProps {}

const LandingPage: React.FunctionComponent<ILandingPageProps> = (props) => {
  return (
    <Stack direction={"column"} spacing={24} padding={12} paddingTop={8}>
      <HeaderSection />
    </Stack>
  );
};

export default LandingPage;
