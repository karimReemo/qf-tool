import * as React from "react";
import Grid from "@mui/material/Grid";
import {
  expectationsSectionHeader,
  reportExpectationsStrings,
} from "../../../utils/constants";
import ReportExpectationCard from "./ReportExpectationCard";
import expecSearchIcon from "../../../assets/icons/expecSearchIcon.svg";
import expecGalleryIcon from "../../../assets/icons/expecGalleryIcon.svg";
import expecRocketIcon from "../../../assets/icons/expecRocketIcon.svg";
import expecSettingsIcon from "../../../assets/icons/expecSettingsIcon.svg";
import expecCommentIcon from "../../../assets/icons/expecCommentIcon.svg";
import expecDomIcon from "../../../assets/icons/expecDomIcon.svg";
import { Typography, css } from "@mui/material";
import { mq } from "../../../assets/global-styles";
const ReportExpectations = () => {
  const icons = [
    expecSearchIcon,
    expecCommentIcon,
    expecGalleryIcon,
    expecDomIcon,
    expecRocketIcon,
    expecSettingsIcon,
  ];

  return (
    <div>
      <Typography variant="h2" css={headerStyle}>
        {expectationsSectionHeader}
      </Typography>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 2, lg: 9 }}
      >
        {reportExpectationsStrings.map((cardStrings, index) => (
          <Grid item xs={1} sm={1} lg={3} key={index}>
            <ReportExpectationCard
              title={cardStrings.cardTitle}
              body={cardStrings.cardBody}
              image={icons[index]}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const headerStyle = css`
  font-size: 2.2em;
  text-align: center;
 margin-bottom: 24px;
`;
export default ReportExpectations;
