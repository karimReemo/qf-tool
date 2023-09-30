import * as React from "react";
import Stack from "@mui/material/Stack";
import qafIcon from "../../../../../assets/icons/qafIcon.svg";
import { css } from "@emotion/react";
import Typography from "@mui/material/Typography";

interface IQAFBoxProps {
  title: string;
  body: string;
}

const iconStyle = css`
  height: 48px;
`;

const QAFBox: React.FunctionComponent<IQAFBoxProps> = ({ title, body }) => {
  return (
    <Stack direction={"column"} alignItems={"start"} width={"fitContent"}>
      <img css={iconStyle} src={qafIcon} alt={`qafIcon_image`} />
      <Typography color={"white"} css={titleStyle}>
        {title}
      </Typography>
      <Typography color={"white"} css={subtitleStyle}>
        {body}
      </Typography>
    </Stack>
  );
};

const titleStyle = css`
  margin-top: 12px;
  margin-bottom: 6px;
  line-height: 32px;
  font-size: 1.8em;
  font-weight: 700;
`;
const subtitleStyle = css`
  font-size: 1.4em;
`;

export default QAFBox;
