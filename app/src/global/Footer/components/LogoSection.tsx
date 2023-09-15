import * as React from "react";
import { Stack, Typography, css } from "@mui/material";
import logo from "../../../assets/logo.png";
import { footerStrings } from "../../../utils/constants";
import FbIcon from "../../../assets/icons/fb.svg";
import LinkedInIcon from "../../../assets/icons/linkedin.svg";

interface ILogoSectionProps {}

const logoStyle = css`
  height: 55px;
  width: 200px;
`;

const socialMediaIconsStyles = css`
  height: 24px;
  color: #3333D9;
`;

const LogoSection: React.FunctionComponent<ILogoSectionProps> = (props) => {
  return (
    <Stack direction={"column"} spacing={2} alignItems={"flex-start"}>
      <img css={logoStyle} src={logo} alt="Logo Image" />
      <Typography>{footerStrings.mainText}</Typography>
      <Stack direction={'row'} spacing={1}>
      <img css={socialMediaIconsStyles} src={FbIcon} alt="FBIcon" />
      <img css={socialMediaIconsStyles} src={LinkedInIcon} alt="FBIcLinkedinIcon" />

      </Stack>
    </Stack>
  );
};

export default LogoSection;
