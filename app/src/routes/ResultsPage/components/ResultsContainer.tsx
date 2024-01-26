import * as React from "react";
import {
  Button,
  Stack,
  Tooltip,
  Typography,
  css,
  useMediaQuery,
} from "@mui/material";
import { resultsPageStrings } from "../../../utils/constants";
import DownloadIcon from "@mui/icons-material/Download";
import { ScoreDetails } from "../../../utils/types";
import ResultAccordion from "./ResultAccordion";
import { mq, primaryColor } from "../../../assets/global-styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Options, usePDF } from "react-to-pdf";

interface IResultsContainerProps {
  results: ScoreDetails[] | undefined;
  toPDF: (options?: Options | undefined) => void;
  website:string
}

interface ICategoryDef {
  category: string;
  categoryInfo?: string;
}

const ResultsContainer: React.FunctionComponent<IResultsContainerProps> = ({
  results,
  toPDF,
  website
}) => {
  //State to control the expanding of all accordions to take a screenshot
  const [exapndAllAccordions, setExapndAllAccordions] =
    React.useState<boolean>(false);

  const xlargeScreen = useMediaQuery(mq["xl"]);
  const allCategories: ICategoryDef[] | undefined = results?.map((result) => {
    return { category: result.category, categoryInfo: result.categoryInfo };
  });
  // Create a unique set of categories based on the category property
  const uniqueCategories: ICategoryDef[] | undefined = allCategories?.reduce(
    (unique, currentCategory) => {
      const exists = unique.some(
        //@ts-ignore
        (category) => category.category === currentCategory.category
      );

      if (!exists) {
        //@ts-ignore
        unique.push(currentCategory);
      }

      return unique;
    },
    []
  );

  const downloadPDF = () => {
    setExapndAllAccordions(true);
    // Introduce a delay of one second before collapsing the accordions
    setTimeout(() => {
      toPDF();
      setExapndAllAccordions(false);
    }, 1000);
  };

  return (
    <Stack css={rootStyle}>
      <Stack
        css={headerContainerStyle}
        direction="row"
        justifyContent={"space-between"}
      >
        <Typography variant="h5" css={titleStyle}>
          {resultsPageStrings.inDepthSectionTitle}
        </Typography>
        <Tooltip title="Download Test Results as pdf">
          <Button
            size={xlargeScreen ? "medium" : "large"}
            endIcon={<DownloadIcon />}
            variant="outlined"
            onClick={downloadPDF}
          >
            {resultsPageStrings.downloadPDF}
          </Button>
        </Tooltip>
      </Stack>
      {uniqueCategories?.map((category, index) => (
        <div css={{ marginBottom: "2em" }}>
          <div css={categoryContainerStyle}>
            <Typography css={categoryStyle}>{category.category}</Typography>
            <Tooltip title={`${category.categoryInfo}`} arrow>
              <InfoOutlinedIcon />
            </Tooltip>
          </div>

          {results
            ?.filter(
              (filteredResult) => filteredResult.category === category.category
            )
            .map((result) => (
              <ResultAccordion
                expandedByDefault={exapndAllAccordions}
                key={index}
                result={result}
              />
            ))}
        </div>
      ))}
    </Stack>
  );
};

const rootStyle = css`
  margin-top: 18px;
`;

const headerContainerStyle = css`
  margin-bottom: 18px;
`;

const titleStyle = css`
  font-size: 2em;
  ${mq["xl"]} {
    font-size: 1%.8;
  }
`;

const categoryStyle = css`
  font-size: 1em;
  font-weight: 400;
  font-family: "ZawyaNormal";
`;

const categoryContainerStyle = css`
  background-color: ${primaryColor};
  padding: 4px 8px;

  border-radius: 4px;
  display: flex;
  flex-direction: "row";
  gap: 12px;
  width: fit-content;
  color: #ffffff;
`;

export default ResultsContainer;
