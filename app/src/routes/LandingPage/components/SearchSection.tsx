import { Button, Grid, TextField, css } from "@mui/material";
import * as React from "react";
import { landingPageHeaderStrings } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { mq, textfieldPrimaryStyle } from "../../../assets/global-styles";
import axios from "axios";
import { apiBaseURL } from "../../../utils/api";

interface ISearchSectionProps {}

const SearchSection: React.FunctionComponent<ISearchSectionProps> = () => {
  let navigate = useNavigate();
  const [websiteInput, setWebsiteInput] = React.useState("");

  const rootStyle = css`
    margin-right: auto;
    margin-left: auto;
    max-width: 90%;
  `;

  const textfieldInputStyle = css`
    ${textfieldPrimaryStyle}
    & .MuiOutlinedInput-root {
      height: 62px;
      ${mq["xl"]} {
        height: 56px;
      }
    }
  `;
  const buttonStyle = css`
    height: 100%;
    font-size: 1.5rem;
  `;


  const initiateTestLoading = () => {
    // Generate a random 16-digit integer for the uuid
    const uuid = Math.floor(10000000 + Math.random() * 90000000);
    navigate(`run-result?uuid=${uuid}&website=${websiteInput}`);
  };

  return (
    <Grid
      css={rootStyle}
      marginTop={2}
      container
      spacing={2}
      justifyContent={"center"}
    >
      <Grid item xs={9}>
        <TextField
          fullWidth
          css={textfieldInputStyle}
          id="outlined-basic"
          label={landingPageHeaderStrings.searchBarPlaceholder}
          variant="outlined"
          onChange={(e) => setWebsiteInput(e.target.value)}
          value={websiteInput}
        />
      </Grid>

      <Grid item xs={3}>
        <Button
          variant="contained"
          fullWidth
          css={buttonStyle}
          onClick={initiateTestLoading}
        >
          {landingPageHeaderStrings.testButton}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchSection;
