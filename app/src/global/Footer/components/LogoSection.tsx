import * as React from "react";
import { Stack, Typography, css } from "@mui/material";
import logo from "../../../assets/logo.png";
import { footerStrings } from "../../../utils/constants";
import FbIcon from "../../../assets/icons/fb.svg";
import LinkedInIcon from "../../../assets/icons/linkedin.svg";
import { mq } from "../../../assets/global-styles";

interface ILogoSectionProps {}

const LogoSection: React.FunctionComponent<ILogoSectionProps> = (props) => {
  return (
    <Stack direction={"column"} spacing={2} alignItems={"flex-start"}>
      <img css={logoStyle} src={logo} alt="Logo Image" />
      <Typography css={textStyle}>{footerStrings.mainText}</Typography>
      <Stack direction={"row"} spacing={1}>
        <img css={socialMediaIconsStyles} src={FbIcon} alt="FBIcon" />
        <img
          css={socialMediaIconsStyles}
          src={LinkedInIcon}
          alt="FBIcLinkedinIcon"
        />
      </Stack>
    </Stack>
  );
};

const logoStyle = css`
  height: 70px;
  ${mq["xl"]} {
    height: 55px;
  }
`;

const socialMediaIconsStyles = css`
  height: 42px;
  color: #3333d9;
  ${mq["xl"]} {
    height: 24px;
  }
`;

const textStyle = css`
 font-size: 1.6em;
  ${mq["xl"]} {
    font-size: 1em;
  }
`;
export default LogoSection;
