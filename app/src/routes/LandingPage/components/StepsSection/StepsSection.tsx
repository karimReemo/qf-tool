import * as React from "react";
import { Stack, Typography, css } from "@mui/material";
import step1Icon from "../../../../assets/icons/stepsIcon1.png";
import step2Icon from "../../../../assets/icons/stepsIcon2.png";
import step3Icon from "../../../../assets/icons/stepsIcon3.png";
import StepBox from "./components/StepBox";
import { landingPageStepsStrings } from "../../../../utils/constants";
import StepsLine from "./components/StepsLine";

const StepsSection = () => {
  return (
    <div
      css={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography marginBottom={1} variant="h2" fontSize={"2em"}>
        {landingPageStepsStrings.sectionTitle}
      </Typography>
      <Typography marginBottom={8} variant="h3" fontSize={"1.2em"}>
        {landingPageStepsStrings.sectionSubtitle}
      </Typography>

      <Stack direction={"row"} justifyContent={"space-around"} css={rootStyle}>
        <Stack
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          direction={"column"}
          height={"100%"}
        >
          <StepBox
            imageSource={step1Icon}
            stepCount={1}
            title={landingPageStepsStrings.step1Title}
            body={landingPageStepsStrings.step1Body}
            backgroundColor="rgba(35, 164, 201, 0.20)"
          />
          <StepBox
            imageSource={step3Icon}
            stepCount={3}
            title={landingPageStepsStrings.step3Title}
            body={landingPageStepsStrings.step3Body}
            backgroundColor="rgba(35, 164, 201, 0.20)"
          />
        </Stack>
        <StepsLine />
        <Stack justifyContent={"center"} direction={"column"} height={"100%"}>
          <StepBox
            imageSource={step2Icon}
            stepCount={2}
            title={landingPageStepsStrings.step2Title}
            body={landingPageStepsStrings.step2Body}
            backgroundColor="rgba(121, 121, 232, 0.19)"
          />
        </Stack>
      </Stack>
    </div>
  );
};

const rootStyle = css`
  height: 1500px;
  width: 100%;
`;

export default StepsSection;
