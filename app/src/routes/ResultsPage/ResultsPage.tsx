import Stack from "@mui/material/Stack";
import * as React from "react";
import ResultsHeader from "./components/ResultsHeader";
import { mq } from "../../assets/global-styles";
import { css } from "@emotion/react";
import ScoresContainer from "./components/ScoresContainer";
import Divider from "@mui/material/Divider";
import ResultsContainer from "./components/ResultsContainer";
import { ITestResults } from "../../utils/types";

interface IResultsPageProps {}

const ResultsPage: React.FunctionComponent<IResultsPageProps> = (props) => {
  const resultsMockJson:ITestResults = {
    overallScores: [
      { title: "Network Payload", score: 25 },
      { title: "Data Safety", score: 60 },
      { title: "Firewall", score: 85 },
    ],
    inDepthResults: [
      {
        title: "Anything",
        severity: "MEDIUM",
        detailedDescription: `To address this issue and improve the performance and user experience of a website, 
        it's advisable to specify the width and height attributes for all images in the HTML code.`,
      },
      {
        title: "Avoid enormous network payloads",
        severity: "HIGH",
        detailedDescription: `To address this issue and improve the performance and user experience of a website, 
        it's advisable to specify the width and height attributes for all images in the HTML code.`,
      },
      {
        title: "Ensure text remains visible during webfont load",
        severity: "MEDIUM",
        detailedDescription: `To address this issue and improve the performance and user experience of a website, 
        it's advisable to specify the width and height attributes for all images in the HTML code.`,
      },
      {
        title: "Minimize main-thread work ",
        severity: "LOW",
        detailedDescription: `To address this issue and improve the performance and user experience of a website, 
        it's advisable to specify the width and height attributes for all images in the HTML code.`,
      },
      {
        title: "Pre-load images from server",
        severity: "LOW",
        detailedDescription: `To address this issue and improve the performance and user experience of a website, 
        it's advisable to specify the width and height attributes for all images in the HTML code.`,
      },
    ],
  };

  return (
    <>
      <ResultsHeader />
      <Stack direction={"column"} gap={3} css={resultsPageRoot}>
        <ScoresContainer scores={resultsMockJson.overallScores} />
        <Divider />
        <ResultsContainer results={resultsMockJson.inDepthResults} />
      </Stack>
    </>
  );
};

const resultsPageRoot = css`
  margin: 90px 4%;
  padding: 12px 8%;
  ${mq["xl"]} {
    margin: 52px 4%;
  }
  ${mq["xxl"]} {
    margin: 74px 14%;
  }
  background-color: #ffffff;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  min-height: 50vh;
`;
export default ResultsPage;
