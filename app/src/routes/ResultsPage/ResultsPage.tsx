import Stack from "@mui/material/Stack";
import * as React from "react";
import ResultsHeader from "./components/ResultsHeader";
import { mq } from "../../assets/global-styles";
import { css } from "@emotion/react";
import ScoresContainer from "./components/ScoresContainer";
import Divider from "@mui/material/Divider";
import ResultsContainer from "./components/ResultsContainer";
import { IScore, IScoreResponse, ITestResults } from "../../utils/types";
import { useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { apiBaseURL } from "../../utils/api";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ResultsPage = () => {
  const [resultsLoading, setResultsLoading] = React.useState(false);
  const [testResults, setTestResults] = React.useState<IScoreResponse>();

  let query = useQuery();

  React.useEffect(() => {
    const runTest = async () => {
      setResultsLoading(true);
      try {
        const uuid = query.get("uuid");
        const testResultsResponse = await axios.get(
          `${apiBaseURL}/results/${uuid}`
        );

        if (testResultsResponse.status === 200) {
          setTestResults(testResultsResponse.data);
        }
      } catch (error) {
        let errorType = error as AxiosError;
      } finally {
        setResultsLoading(false);
      }
    };

    if (!resultsLoading) runTest();
  }, []);

  const overallScores: IScore[] = [
    { title: "Connection Security", score: testResults?.["connection-score"] },
    { title: "Average Score", score: testResults?.["average-score"] },
    { title: "Website Security", score: testResults?.["website-score"] },
  ];

  if (!testResults) return null;
  return (
    <>
      <ResultsHeader />
      <Stack direction={"column"} gap={3} css={resultsPageRoot}>
        <ScoresContainer scores={overallScores} />
        <Divider />
        <ResultsContainer results={testResults?.details} />
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
