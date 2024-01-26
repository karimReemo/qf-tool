import * as React from "react";
import resultsHeaderBg from "../../../assets/icons/resultsHeaderBg.svg";
import resultsHeaderIcon from "../../../assets/icons/resultsHeaderIcon.svg";

import { css } from "@emotion/react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography/Typography";
import { resultsPageStrings } from "../../../utils/constants";
import { mq } from "../../../assets/global-styles";

interface IResultsHeaderProps {
  website:string;
  date:string
}

const ResultsHeader: React.FunctionComponent<IResultsHeaderProps> = ({website,date}) => {
  return (
    <Stack justifyContent={'space-between'} css={rootStyle} direction={"row"} >
      <Stack justifyContent={"center"} gap={1}>
        <Typography css={titleStyle} variant="h3">
          {resultsPageStrings.mainTitle}
        </Typography>
        <Typography css={websiteTextStyle} variant="h2">
         {website}
        </Typography>
        <Typography css={dateStyle}>{`${
          resultsPageStrings.reportDate
        } ${date}`}</Typography>
      </Stack>
      <img css={iconStyle} src={resultsHeaderIcon} alt="Reults_Icon" />
    </Stack>
  );
};

const rootStyle = css`
  width: 100%;
  padding: 4%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${resultsHeaderBg});
  ${mq["xl"]} {
    padding: 2%;
  }
`;

const titleStyle = css`
  color: white;
  font-size: 2em;
  ${mq["xl"]} {
    font-size: 1.5em;
  }
`;

const websiteTextStyle = css`
  color: white;
  font-size: 2.5em;
  ${mq["xl"]} {
    font-size: 2.1em;
  }
`;

const dateStyle = css`
  color: white;
  font-size: 1.5em;
  ${mq["xl"]} {
    font-size: 1em;
  }
`;

const iconStyle = css`
  height: 200px;
 
`;

export default ResultsHeader;
