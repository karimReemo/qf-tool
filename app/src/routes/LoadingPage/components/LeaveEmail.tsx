import { Button, Stack, TextField, Typography, css } from "@mui/material";
import * as React from "react";
import { loadingPageStrings } from "../../../utils/constants";
import { mq, textfieldPrimaryStyle } from "../../../assets/global-styles";

const LeaveEmail = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
  return (
    <Stack css={rootStyle} gap={1}>
      <Typography textAlign={"center"}>
        {loadingPageStrings.emailText}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction={"row"} gap={1}>
          <TextField
            // inputProps={{
            //   style: {
            //     height: "15px",
            //   },
            // }}
            type="text"
            fullWidth
            css={textfieldStyle}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <Button css={buttonStyle} variant="contained" type="submit">
            Notify Me
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

const textfieldStyle = css`
  ${textfieldPrimaryStyle};
  width: 75%;

  & .MuiOutlinedInput-root {
    ${mq["xl"]} {
      height: 52px;
    }
    & fieldset {
      border: 1.5px solid rgba(51, 51, 153, 0.5);
    }
  }
`;

const rootStyle = css`
  width: 70%;
  ${mq["xl"]} {
    width: 60%;
  }
`;

const buttonStyle = css`
  width: 25%;
  font-size: 1em;
`;
export default LeaveEmail;
