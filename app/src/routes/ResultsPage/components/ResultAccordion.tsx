import * as React from "react";
import { IInDepthResult } from "../../../utils/types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { css } from "@emotion/react";
import { mq, primaryColor } from "../../../assets/global-styles";
import Stack from "@mui/material/Stack";
import { resultsPageStrings } from "../../../utils/constants";

interface IResultAccordionProps {
  result: IInDepthResult;
}

const ResultAccordion: React.FunctionComponent<IResultAccordionProps> = ({
  result,
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const accordionTitleStyle = css`
    background-color: ${expanded ? "#EBEBEB" : "white"};
    border-left: ${expanded ? `1px solid ${primaryColor}` : ""};
    height: 100px;
    ${mq["xl"]} {
        height: 50px;
    }
  `;

  const accordionTitleTextStyle = css`
    font-weight: bold;
    font-size: 1.6em;
    color: ${expanded ? primaryColor : "#252B42"};
    ${mq["xl"]} {
      font-size: 1.1em;
    }
  `;

  const accordionBodyStyle = css`
    background-color: ${expanded ? "#EBEBEB" : "white"};
  `;

  const handleChange =
    () => (event: React.SyntheticEvent, isExpanded: boolean) => {
      console.log("isExpaned: ", isExpanded);
      setExpanded(isExpanded ? true : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded}
        style={{ borderRadius: 0 ,borderBottom:expanded?'1px solid #a1a1a1':''}}
        onChange={handleChange()}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          css={accordionTitleStyle}
        >
          <Stack direction="row" alignItems={"center"}>
            <Typography css={accordionTitleTextStyle}>
              {result.title}
            </Typography>
            {result.severity === "HIGH" && (
              <Typography css={accordionSeverityTextStyle}>
                {resultsPageStrings.highSeverity}
              </Typography>
            )}
          </Stack>
        </AccordionSummary>
        <AccordionDetails css={accordionBodyStyle}>
          <Typography css={accordionBodyTextStyle}>
            {result.detailedDescription}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const accordionSeverityTextStyle = css`
  color: red;
  font-weight: bold;
  margin-left: 12px;
  font-size: 1em;
  ${mq["xl"]} {
      font-size: 0.8em;
    }
`;

const accordionBodyTextStyle = css`
  font-size: 1.5em;
  ${mq["xl"]} {
      font-size: 1em;
    }
`;
export default ResultAccordion;
