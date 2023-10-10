import { Button, Stack, Tooltip, Typography, css, useMediaQuery } from "@mui/material";
import * as React from "react";
import { resultsPageStrings } from "../../../utils/constants";
import DownloadIcon from "@mui/icons-material/Download";
import { IInDepthResult } from "../../../utils/types";
import ResultAccordion from "./ResultAccordion";
import { mq } from "../../../assets/global-styles";
interface IResultsContainerProps {
  results: IInDepthResult[];
}

const ResultsContainer: React.FunctionComponent<IResultsContainerProps> = ({
  results,
}) => {
  const xlargeScreen = useMediaQuery(mq["xl"]);

  return (
    <Stack css={rootStyle}>
      <Stack
        css={headerContainerStyle}
        direction="row"
        justifyContent={"space-between"}
      >
        <Typography variant="h5" css={titleStyle}>
          {resultsPageStrings.inDepthSectionTitle}
        </Typography>
        <Tooltip title='Coming Soon...'>
        <Button
          size={xlargeScreen ? "medium" : "large"}
          endIcon={<DownloadIcon />}
          variant="outlined"
          onClick={()=>alert("Coming Soon...")}
        >
          {resultsPageStrings.downloadPDF}
        </Button>
        </Tooltip>
      </Stack>
      {results.map((result, index) => (
        <ResultAccordion key={index} result={result} />
      ))}
    </Stack>
  );
};

const rootStyle = css`
  margin-top: 18px;
  margin-bottom: 24px;
`;

const headerContainerStyle = css`
  margin-bottom: 18px;
`;

const titleStyle = css`
  font-size: 2em;
  ${mq["xl"]} {
    font-size: 1%.8;
  }
`;

export default ResultsContainer;
