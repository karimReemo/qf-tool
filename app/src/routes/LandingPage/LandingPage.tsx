import * as React from "react";
import HeaderSection from "./components/HeaderSection";
import { Stack, useMediaQuery } from "@mui/material";
import StepsSection from "./components/StepsSection/StepsSection";
import QAFSection from "./components/QAFSection/QAFSection";
import { mainContentStyle, mq } from "../../assets/global-styles";

interface ILandingPageProps {}

const LandingPage: React.FunctionComponent<ILandingPageProps> = () => {
  const xlargeScreen = useMediaQuery(mq['xxl']);

  return (
    <>
      <Stack
        direction={"column"}
        gap={xlargeScreen?24:18}
        css={mainContentStyle}
      >
        <HeaderSection />
        <StepsSection />
      </Stack>
      <QAFSection />
    </>
  );
};

export default LandingPage;
