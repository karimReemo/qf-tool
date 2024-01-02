import { Grid, Stack } from "@mui/material";
import * as React from "react";
import ScoreCircle from "./ScoreCircle";
import { IScore } from "../../../utils/types";

interface IScoresContainerProps {
  scores: IScore[];
}

const ScoresContainer: React.FunctionComponent<IScoresContainerProps> = ({
  scores,
}) => {
  const getScoreGradient = (score: number | undefined) => {
    if (score && score <= 30) return ["#b00404", "#ff0000"];
    else if (score && score <= 70) return ["#f0a816", "#fabf49"];
    else return ["#05834c", "#05b96b", "#05b96b"];
  };

  return (
    <Grid
      container
      columns={{ xs: 2, md: 3, lg: 3 }}
      spacing={{ xs: 12, lg: 4 }}
    >
      {scores.map((score, index) => (
        <Grid item xs={1} md={1} lg={1} key={index}>
          <ScoreCircle
            linearGradient={getScoreGradient(score.score)}
            // @ts-ignore
            score={score.score}
            categoryName={score.title}
            id={index}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ScoresContainer;
