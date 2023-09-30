import { Button, Grid, TextField, css } from "@mui/material";
import * as React from "react";
import { landingPageHeaderStrings } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { mq, textfieldPrimaryStyle } from "../../../assets/global-styles";

interface ISearchSectionProps {}

const SearchSection: React.FunctionComponent<ISearchSectionProps> = () => {
  let navigate = useNavigate();

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
          // inputProps={{
          //   style: {
          //     height: "32px",
          //     fontSize: "1.3em",
          //   },
          // }}
        />
      </Grid>

      <Grid item xs={3}>
        <Button
          variant="contained"
          fullWidth
          css={buttonStyle}
          onClick={() => navigate("result/anyUUid")}
        >
          {landingPageHeaderStrings.testButton}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchSection;
