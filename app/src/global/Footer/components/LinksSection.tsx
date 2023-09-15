import { Stack, Typography, css } from "@mui/material";
import * as React from "react";
import { footerStrings } from "../../../utils/constants";
import { Link } from "react-router-dom";

interface ILinksSectionProps {}

const listRootStyle = css`
      list-style-type: none;
      margin: 0 !important;
      padding: 0 !important;
`;

const LinksSection: React.FunctionComponent<ILinksSectionProps> = (props) => {
  const links = [
    { title: footerStrings.link1, linkTo: "https://sharqsec.com" },
    { title: footerStrings.link2, linkTo: "https://sharqsec.com/company/" },
    { title: footerStrings.link3, linkTo: "https://sharqsec.com/blog/" },
    { title: footerStrings.link4, linkTo: "https://sharqsec.com/contact/" },
  ];

  return (
    <Stack alignItems={"flex-start"} gap={2}>
      <Typography variant="h6">{footerStrings.linksSectionHeader}</Typography>
      <ul css={listRootStyle}>
        {links.map((link) => (
          <li key={link.title} css={{marginTop:'6px'}}>
            <Link to={link.linkTo} style={{ color: "inherit" }}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </Stack>
  );
};

export default LinksSection;
