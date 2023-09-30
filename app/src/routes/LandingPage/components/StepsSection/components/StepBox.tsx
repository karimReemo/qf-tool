import { Stack, Typography, css } from "@mui/material";
import * as React from "react";
import { mq } from "../../../../../assets/global-styles";

interface IStepBoxProps {
  imageSource: string;
  stepCount: number;
  title: string;
  body: string;
  backgroundColor: string;
}

const StepBox: React.FunctionComponent<IStepBoxProps> = ({
  imageSource,
  stepCount,
  title,
  body,
  backgroundColor,
}) => {
  return (
    <Stack
      padding={4}
      justifyContent={"center"}
      css={{
        borderRadius: 10,
        height: "fit-content",
        width: 400,
        backgroundColor,
      }}
    >
      <img css={imageStyle} src={imageSource} alt={`step_${stepCount}_image`} />
      <Typography css={stepTextStyle}>{`Step ${stepCount}`}</Typography>
      <Typography variant="h4" css={titleStyle}>
        {title}
      </Typography>
      <Typography css={bodyStyle}>{body}</Typography>
    </Stack>
  );
};

const imageStyle = css`
  height: 56px;
  width: 56px;
`;

const stepTextStyle = css`
  margin-top: 4px;
  margin-bottom: 12px;
  font-family: "ZawyaNormalSemiBold";
  font-size: 1.2em;
  color: rgba(0, 0, 0, 0.63);
  ${mq["xl"]} {
    font-size: 1em;
  }
`;

const titleStyle = css`
  font-family: "ZawyaNormal";
  font-size: 1.5em;
  ${mq["xl"]} {
    font-size: 1.3em;
  }
`;

const bodyStyle = css`
  font-size: 1.3em;
  ${mq["xl"]} {
    font-size: 1.1em;
  }
`;

export default StepBox;
