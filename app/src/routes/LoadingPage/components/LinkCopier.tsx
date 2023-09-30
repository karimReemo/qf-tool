import * as React from "react";
import { css } from "@emotion/react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { loadingPageStrings } from "../../../utils/constants";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { mq } from "../../../assets/global-styles";


const LinkCopier = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

  const params = useParams();
  const link = `https://sharqsec.com/${params["resultId"]}`;

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };
  return (
    <Stack
      css={rootStyle}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    
    >
      <Typography css={textStyle}>{link}</Typography>
      <Button
        size="large"
        variant="outlined"
        endIcon={<ContentCopyIcon />}
        onClick={() => {
          navigator.clipboard.writeText(link);
          setIsSnackbarOpen(true);
        }}
      >
        {loadingPageStrings.copyLink}
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your results link has been copied.
        </Alert>
      </Snackbar>
    </Stack>
  );
};

const rootStyle = css`
  border-radius: 8px;
  border: 1px solid rgba(51, 51, 153, 0.5);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  padding: 12px;
  margin-top: 24px;
  width: 70%;
  ${mq["xl"]} {
    width: 60%;
    padding: 8px;

  }
`;


const textStyle = css`
 font-size: 1.5em;
  ${mq["xl"]} {
    font-size: 1.2em;
  }
  
`;

export default LinkCopier;
