import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { footerStrings } from "../../../utils/constants";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import { mq } from "../../../assets/global-styles";

interface IContactSectionProps {}

const ContactSection: React.FunctionComponent<IContactSectionProps> = (
  props
) => {
  const theme = useTheme();

  const iconsStyle = css`
    font-size: 2.5em;
    margin-top: 4px;
    color: ${theme.palette.primary.main};
    ${mq["xl"]} {
      font-size: 1.5em;
    }
  `;

  const headerStyle = css`
    font-size: 2em;
    ${mq["xl"]} {
      font-size: 1.2em;
    }
  `;

  const contactTitleStyle = css`
    font-size: 2em;
    ${mq["xl"]} {
      font-size: 1.2em;
    }
  `;

  const contactBodyStyle = css`
    font-size: 1.8em;
    ${mq["xl"]} {
      font-size: 1em;
    }
  `;

 
  return (
    <Stack alignItems={"flex-start"} gap={2}>
      <Typography variant="h6" css={headerStyle}>
        {footerStrings.contactSectionHeader}
      </Typography>
      <Stack direction={"row"} gap={2} marginTop={1}>
        <LocalPhoneIcon css={iconsStyle} />
        <Stack direction={"column"}>
          <Typography fontWeight={"700"} css={contactTitleStyle}>
            {footerStrings.contact1Title}
          </Typography>
          <Typography css={contactBodyStyle}>{footerStrings.contact1Number}</Typography>
        </Stack>
      </Stack>

      <Stack direction={"row"}  gap={2} marginTop={1}>
        <EmailIcon css={iconsStyle} />
        <Stack direction={"column"}>
          <Typography fontWeight={"700"} css={contactTitleStyle}>
            {footerStrings.contact2Title}
          </Typography>
          <Typography  css={contactBodyStyle}>{footerStrings.contact2Email}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContactSection;
