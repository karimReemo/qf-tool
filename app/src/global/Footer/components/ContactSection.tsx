import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { footerStrings } from "../../../utils/constants";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from '@mui/icons-material/Email';
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";

interface IContactSectionProps {}

const ContactSection: React.FunctionComponent<IContactSectionProps> = (
  props
) => {
  const theme = useTheme();

  const iconsStyle = css`
    height: 21px;
    color: ${theme.palette.primary.main};
  `;

  return (
    <Stack alignItems={"flex-start"} gap={2}>
      <Typography variant="h6">{footerStrings.contactSectionHeader}</Typography>
      <Stack direction={"row"}spacing={1}>
        <LocalPhoneIcon css={iconsStyle} />
        <Stack direction={"column"} >
          <Typography fontWeight={'700'}>
            {footerStrings.contact1Title}
          </Typography>
          <Typography>{footerStrings.contact1Number}</Typography>
        </Stack>
      </Stack>

      <Stack direction={"row"} spacing={1}>
        <EmailIcon css={iconsStyle} />
        <Stack direction={"column"} >
          <Typography fontWeight={'700'}>
            {footerStrings.contact2Title}
          </Typography>
          <Typography>{footerStrings.contact2Email}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContactSection;
