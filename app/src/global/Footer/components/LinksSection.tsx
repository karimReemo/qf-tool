import { Stack, Typography, css } from "@mui/material";
import * as React from "react";
import { footerStrings } from "../../../utils/constants";
import { Link } from "react-router-dom";
import { mq } from "../../../assets/global-styles";

interface ILinksSectionProps {}

const LinksSection: React.FunctionComponent<ILinksSectionProps> = (props) => {
  const links = [
    { title: footerStrings.link1, linkTo: "https://sharqsec.com" },
    { title: footerStrings.link2, linkTo: "https://sharqsec.com/company/" },
    { title: footerStrings.link3, linkTo: "https://sharqsec.com/blog/" },
    { title: footerStrings.link4, linkTo: "https://sharqsec.com/contact/" },
  ];

  return (
    <Stack alignItems={"flex-start"} gap={2}>
      <Typography variant="h6" css={headerStyle}>
        {footerStrings.linksSectionHeader}
      </Typography>
      <ul css={listRootStyle}>
        {links.map((link) => (
          <li key={link.title} css={{ marginTop: "6px" }}>
            <Link
              css={linksStyle}
              to={link.linkTo}
              style={{ color: "inherit" }}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </Stack>
  );
};

const listRootStyle = css`
  list-style-type: none;
  margin: 0 !important;
  padding: 0 !important;
`;

const headerStyle = css`
  font-size: 2em;
  ${mq["xl"]} {
    font-size: 1.2em;
  }
`;

const linksStyle = css`
  font-size: 1.5em;
  ${mq["xl"]} {
    font-size: 1em;
  }
`;
export default LinksSection;
