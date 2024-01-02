import * as React from "react";
import { mainContentStyle } from "../../assets/global-styles";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LoadingTopSection from "./components/LoadingTopSection";
import ReportExpectations from "./components/ReportExpectations";
import axios, { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { apiBaseURL } from "../../utils/api";

interface ILoadingPageProps {}

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const LoadingPage: React.FunctionComponent<ILoadingPageProps> = () => {
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
  let navigate = useNavigate();
  let query = useQuery();

  React.useEffect(() => {
    const runTest = async () => {
      const queryData = {
        uuid: query.get("uuid"),
        website: query.get("website"),
      };

      try {
        const response = await axios.post(`${apiBaseURL}/run-test`, null, {
          params: queryData,
        });

        if (response.status === 200) {
          navigate(`/result?uuid=${queryData.uuid}`);
        }
      } catch (error) {
        let errorType = error as AxiosError;
        console.log(errorType)
        setOpenErrorDialog(true);
      }
    };

    runTest();
  }, []);

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
    // Navigate back to the home page when the dialog is dismissed
    navigate("/");
  };

  return (
    <Stack direction={"column"} gap={9} css={mainContentStyle}>
      <LoadingTopSection />
      <ReportExpectations />

      {/* Error Dialog */}
      <Dialog open={openErrorDialog} onClose={handleCloseErrorDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <div>Something went wrong running our tests, please try again later.</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default LoadingPage;
