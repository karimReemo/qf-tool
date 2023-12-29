import * as React from "react";
import { mainContentStyle } from "../../assets/global-styles";
import Stack from "@mui/material/Stack";
import LoadingTopSection from "./components/LoadingTopSection";
import ReportExpectations from "./components/ReportExpectations";
import axios, { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import { apiBaseURL } from "../../utils/api";

interface ILoadingPageProps {}

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const LoadingPage: React.FunctionComponent<ILoadingPageProps> = () => {
  const [resultsLoading, setResultsLoading] = React.useState(false);
  let query = useQuery();

  React.useEffect(() => {
    const runTest = async () => {
      setResultsLoading(true);
      const queryData = {
        uuid: query.get("uuid"),
        website: query.get("website"),
      };

      try {
        const response = await axios.post(`${apiBaseURL}/run-test`, null, {
          params: queryData,
        });
      } catch (error) {
        let errorType = error as AxiosError;
        console.error("Error:", errorType.message);
      } finally {
        setResultsLoading(false);
      }
    };

    runTest();
  }, []);

  return (
    <Stack direction={"column"} gap={18} css={mainContentStyle}>
      <LoadingTopSection />
      <ReportExpectations />
    </Stack>
  );
};

export default LoadingPage;
