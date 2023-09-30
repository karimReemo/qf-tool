import { css } from "@emotion/react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { mq } from "../../../assets/global-styles";

interface IReportExpectationCardProps {
  title: string;
  body: string;
  image: string;
}

const ReportExpectationCard: React.FunctionComponent<
  IReportExpectationCardProps
> = ({ title, body, image }) => {
  return (
    <Stack css={cardRootSTyle} padding={2}>
      <img css={imageStyle} src={image} alt={`expectation_${title}_image`} />
      <Typography css={titleStyle}>{title}</Typography>
      <Typography css={bodyStyle}>{body}</Typography>
    </Stack>
  );
};

const imageStyle = css`
  height: 64px;
  width: 64px;
  ${mq["xl"]} {
    height: 58px;
    width: 58px;
  }
`;

const titleStyle = css`
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 12px;
  ${mq["xl"]} {
    font-size: 1.2em;
  }
`;

const bodyStyle = css`
  font-size: 1.3em;
  ${mq["xl"]} {
    font-size: 1em;
  }
`;

const cardRootSTyle = css`
  border-radius: 0px 0px 10.181px 10.181px;
  border-top: 3.054px solid #3333d9;
  background: rgba(255, 255, 255, 0);
  box-shadow: 0px 5.09071px 14.25399px 0px rgba(51, 51, 217, 0.17);
`;
export default ReportExpectationCard;
