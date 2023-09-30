import * as React from "react";
import { css } from "@emotion/react";
import qafBgWave from "../../../../assets/icons/qafBgWave.svg";
import Typography from "@mui/material/Typography";
import { qafSectionStrings, qafs } from "../../../../utils/constants";
import { Button, Grid, Stack } from "@mui/material";
import QAFBox from "./components/QAFBox";
import { mq } from "../../../../assets/global-styles";

interface IQAFSectionProps {}

const QAFSection: React.FunctionComponent<IQAFSectionProps> = (props) => {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      padding={12}
      paddingTop={8}
      css={rootStyle}
    >
      <Typography css={titleStyle} variant="h2" textAlign={"center"}>
        {qafSectionStrings.sectionTitle}
      </Typography>
      <Typography textAlign={"center"} css={subTitleStyle}>
        {qafSectionStrings.sectionSubtitle}
      </Typography>
      <Grid
        container
        css={qafRootStyle}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, md: 8, lg: 12 }}
      >
        {qafs.map((strings, index) => (
          <Grid item xs={2} md={4} lg={4} key={index}>
            <QAFBox
              title={strings.qafTitle}
              body={strings.qafBody}
              key={index}
            />
          </Grid>
        ))}
      </Grid>

      <Stack
        css={contactUsBoxStyle}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography variant="h1" textAlign={"center"}>
          {qafSectionStrings.qafContactUsTitle}
        </Typography>
        <Typography css={contactUsBody} textAlign={"center"}>
          {qafSectionStrings.qafContactUsBody}
        </Typography>
        <Button css={{ marginTop: "21px" }} variant="contained" size="large">
          {qafSectionStrings.qafContactUsButton}
        </Button>
      </Stack>
    </Stack>
  );
};

export default QAFSection;

const rootStyle = css`
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${qafBgWave});
  padding-top: 80px;
`;

const contactUsBoxStyle = css`
  width: 95%;
  background-color: white;
  padding: 18px;
  border-radius: 4px;
  flex-grow: 0;
  margin-top: 52px;
`;

const titleStyle = css`
  color: white;
  margin-bottom: 2px;
  margin-top: 48px;
  font-size: 2.5em;
`;

const subTitleStyle = css`
  color: white;
  font-size: 1.4em;
  ${mq["xl"]} {
    max-width: 75%;
  }
  ${mq["xxl"]} {
    max-width: 60%;
  }
`;

const qafRootStyle = css`
  margin-top: 48px !important;
`;

const contactUsBody = css`
  font-size: 1.4em ;
  max-width: 80%;
  margin-top: 8px;
`;