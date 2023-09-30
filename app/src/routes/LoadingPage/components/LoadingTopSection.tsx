import * as React from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import { css } from "@emotion/react";
import searchIcon from "../../../assets/icons/searchIcon.svg";
import { loadingPageStrings } from "../../../utils/constants";
import LinkCopier from "./LinkCopier";
import LeaveEmail from "./LeaveEmail";
import { mq } from "../../../assets/global-styles";

const LoadingTopSection = () => {
  const theme = useTheme();

  return (
    <Stack alignItems={"center"}>
      <img css={iconStyle} src={searchIcon} alt={`searchIcon_image`} />
      <Typography color={theme.palette.primary.main} variant="h2" css={mainText}>
        {loadingPageStrings.mainTitle}
      </Typography>
      <Typography  textAlign={"center"} css={subTitle}>
        {loadingPageStrings.subtitle}
      </Typography>
      <LinkCopier />
      <Typography css={orTextStyle}>OR</Typography>
      <LeaveEmail />
    </Stack>
  );
};

const iconStyle = css`
  height: 250px;
  ${mq["xl"]} {
    height: 160px;
  }
`;

const mainText = css`
  font-size: 3em;
  ${mq["xl"]} {
    font-size: 2.5em;
  }
`;

const subTitle = css`
  font-size: 1.5em;
  width: 75%;
  ${mq["xl"]} {
    font-size: 1.2em;
    width: 60%;

  }
`;

const orTextStyle = css`
  position: relative;
  display: inline-block;
  margin: 16px 0px;
  text-align: center;
  width: 65%;
  
  font-size: larger;
  font-weight: bold;
  ${mq["xl"]} {
    width: 56%;


  }
  &:before {
    content: "";
    border: 1px solid rgba(0, 0, 0, 0.2);
    position: absolute;
    width: 50%;
    top: 14px;
    left: -20px;
  }

  &:after {
    content: "";
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 50%;
    position: absolute;
    top: 14px;
    right: -20px;
  }
`;

export default LoadingTopSection;
