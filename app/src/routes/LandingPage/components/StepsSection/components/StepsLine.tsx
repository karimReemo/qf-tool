import * as React from "react";
import { css } from "@emotion/react";
import { Stack, useTheme } from "@mui/material";
import { mq } from "../../../../../assets/global-styles";

const StepsLine = () => {
  const theme = useTheme();
  const vLineCommon = css`
    border-left: 2px solid #d1d1f0;
  `;

  const vLine = css`
    ${vLineCommon}
    height: 470px;
    ${mq["xl"]} {
      height: 530px;
    }
  `;

  const vLine2 = css`
    ${vLineCommon}
    height: 540px;
    ${mq["xl"]} {
      height: 550px;
    }
  `;
  const vLine3 = css`
    ${vLineCommon}
    height: 425px;
    ${mq["xl"]} {
      height: 355px;
    }
  `;

  const containerCircle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 21px;
    height: 21px;
    background-color: #e0e0f5;
  `;
  const darkCircle = css`
    border-radius: 50%;
    width: 7px;
    height: 7px;
    background-color: ${theme.palette.primary.main};
  `;

  return (
    <Stack direction={"column"} alignItems={"center"}>
      <div css={containerCircle}>
        <div css={darkCircle}></div>
      </div>
      <div css={vLine}></div>
      <div css={containerCircle}>
        <div css={darkCircle}></div>
      </div>
      <div css={vLine2}></div>
      <div css={containerCircle}>
        <div css={darkCircle}></div>
      </div>
      <div css={vLine3}></div>
    </Stack>
  );
};

export default StepsLine;
