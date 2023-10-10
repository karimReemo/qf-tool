import * as React from "react";
import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";
import { mq } from "../../../assets/global-styles";
import { useMediaQuery } from "@mui/material";

interface IScoreCircleProps {
  score: number;
  categoryName: string;
  linearGradient: string[];
  id: number;
}

const ScoreCircle: React.FunctionComponent<IScoreCircleProps> = ({
  score,
  categoryName,
  linearGradient,
  id,
}) => {
  const xlargeScreen = useMediaQuery(mq['xl']);

  return (
    <Stack alignItems={"center"} marginLeft={'auto'} marginRight={'auto'} css={rootStyle}>
      <CircularProgressBar
        id={id}
        linearGradient={linearGradient}
        percent={score}
        speed={80}
        colorSlice="#190ae4"
        colorCircle="#f1f1f1"
        stroke={xlargeScreen?7:10}
        size={120}
      />
      <Typography css={textStyle}>{categoryName}</Typography>
    </Stack>
  );
};

const rootStyle = css`
  width: fit-content;
  gap: 8px;
`;

const textStyle = css`
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  ${mq["xl"]} {
    font-size: 1.2em;
  }
`;

export default ScoreCircle;
