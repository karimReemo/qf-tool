import * as React from "react";
import { manContentStyle } from "../../assets/global-styles";
import Stack from "@mui/material/Stack";
import LoadingTopSection from "./components/LoadingTopSection";
import ReportExpectations from "./components/ReportExpectations";

interface ILoadingPageProps {}

const LoadingPage: React.FunctionComponent<ILoadingPageProps> = () => {
  return (
    <Stack direction={"column"} gap={18} css={manContentStyle}>
      <LoadingTopSection />
      <ReportExpectations/>
    </Stack>
  );
};

export default LoadingPage;
