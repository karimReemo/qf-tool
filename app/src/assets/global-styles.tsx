import { css } from "@emotion/react";

import WideLight from "./fonts/ZawyaPro-WideLight.otf";
import WideExtraLight from "./fonts/ZawyaPro-WideExtraLight.otf";

import WideBold from "./fonts/ZawyaPro-WideBold.otf";

export const styles = css`
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
`;
