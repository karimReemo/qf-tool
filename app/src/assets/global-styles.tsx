import { css } from "@emotion/react";

import WideLight from "./fonts/ZawyaPro-WideLight.otf";
import WideExtraLight from "./fonts/ZawyaPro-WideExtraLight.otf";
import WideBold from "./fonts/ZawyaPro-WideBold.otf";
import NormalSemiBold from "./fonts/ZawyaPro-NormalSemiBold.otf";
import Normal from "./fonts/ZawyaPro-NormalNormal.otf";
import useMediaQuery from "@mui/material/useMediaQuery";

const breakpoints: { [index: string]: number } = {
  sm: 500,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl:1800,
};

export const mq = Object.keys(breakpoints)
  .map((key) => [key, breakpoints[key]] as [string, number])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });

export const primaryColor = "#3333D9";

export const styles = css`
  body {
    background: #fafbfb !important;
    margin: 0;
    padding: 0;
  }
  @font-face {
    font-family: "ZawyaWideLight";
    src: url(${WideLight}) format("opentype");
  }

  @font-face {
    font-family: "ZawyaWideExtraLight";
    src: url(${WideExtraLight}) format("opentype");
  }

  @font-face {
    font-family: "ZawyaWideBold";
    src: url(${WideBold}) format("opentype");
  }

  @font-face {
    font-family: "ZawyaNormalSemiBold";
    src: url(${NormalSemiBold}) format("opentype");
  }

  @font-face {
    font-family: "ZawyaNormal";
    src: url(${Normal}) format("opentype");
  }
`;

export const mainContentStyle = css`
  padding: 90px 4%;
  ${mq["xl"]} {
    padding: 52px 8%;
  }
  ${mq["xxl"]} {
    padding: 74px 14%;
  }
`;

export const textfieldPrimaryStyle = css`
  & label.Mui-focused {
    color: rgba(51, 51, 153, 0.5);
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border: 3px solid rgba(51, 51, 153, 0.5);
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }
    &:hover fieldset {
      border-color: rgba(51, 51, 153, 0.5);
    }
    &.Mui-focused fieldset {
      border-color: rgba(51, 51, 153, 0.5);
    }
  }
`;


