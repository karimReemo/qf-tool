import { Button, Grid, Stack, TextField, css, useTheme } from "@mui/material";
import * as React from "react";
import { landingPageHeaderStrings } from "../../../utils/constants";

interface ISearchSectionProps {}

const SearchSection: React.FunctionComponent<ISearchSectionProps> = (props) => {
  const theme = useTheme();

  const searchBarStyle = css`
    & label.Mui-focused {
      color: ${theme.palette.primary.dark};
    }
    & .MuiOutlinedInput-root {
      & fieldset {
        border: 3px solid rgba(51, 51, 153, 0.5);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      }
      &:hover fieldset: {
        border-color: rgba(51, 51, 153, 0.5);
      }
      &.Mui-focused fieldset {
        border-color: rgba(51, 51, 153, 0.5);
      }
    }
  `;

  const buttonStyle = css`
    height: 100%;
    font-size: 24px;
  `;

  return (
    <Grid
      marginTop={2}
      container
      maxWidth={"90%"}
      spacing={2}
      justifyContent={"center"}
      marginLeft={'auto'}
      marginRight={'auto'}

    >
      <Grid item xs={9}>
        <TextField
          fullWidth
          css={searchBarStyle}
          id="outlined-basic"
          label={landingPageHeaderStrings.searchBarPlaceholder}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={3}>
        <Button variant="contained" fullWidth size="large" css={buttonStyle}>
          {landingPageHeaderStrings.testButton}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchSection;
