import * as React from "react";
import { ScoreDetails } from "../../../utils/types";
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
  result: ScoreDetails;
  expandedByDefault: boolean;
}

const ResultAccordion: React.FunctionComponent<IResultAccordionProps> = ({
  result,
  expandedByDefault,
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(
    expandedByDefault || false
  );

  const noVulnInCatgeory = result.level === 0;

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
    padding-left: 0;
  `;

  const handleChange =
    () => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (!noVulnInCatgeory) setExpanded(isExpanded ? true : false);
    };

  React.useEffect(() => {
    setExpanded(expandedByDefault);
  }, [expandedByDefault]);

  return (
    <div>
      <Accordion
        expanded={expanded}
        style={{
          borderRadius: 0,
          borderBottom: expanded ? "1px solid #a1a1a1" : "",
        }}
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
            {result.level === 2 && (
              <Typography css={accordionMediumSeverityTextStyle}>
                {resultsPageStrings.mediumSeverity}
              </Typography>
            )}
            {result.level > 2 && (
              <Typography css={accordionSeverityTextStyle}>
                {resultsPageStrings.highSeverity}
              </Typography>
            )}
          </Stack>
        </AccordionSummary>
        {!noVulnInCatgeory && (
          <AccordionDetails css={accordionBodyStyle}>
            <ul css={listStyle}>
              {result.info.map((item, index) => (
                <li key={index} style={{ marginBottom: "4px" }}>
                  <Typography css={accordionBodyTextStyle}>{item}</Typography>
                </li>
              ))}
            </ul>
          </AccordionDetails>
        )}
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

const accordionMediumSeverityTextStyle = css`
  ${accordionSeverityTextStyle};
  color: orange;
`;

const accordionBodyTextStyle = css`
  font-size: 1.5em;
  ${mq["xl"]} {
    font-size: 1em;
  }
`;

const listStyle = css`
  margin: 0;
  margin-left: -6px;
`;
export default ResultAccordion;
