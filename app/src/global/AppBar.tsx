import * as React from "react";
import { css } from "@emotion/react";
import logo from "../assets/logo.png";

interface IAppBarProps {}

// Define Emotion styles
const appBarStyle = css`
  background-color: #f4f9ff;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 16px 10%;
  align-items: center;
`;

const logoStyle = css`
  height: 55px;
`;

const linkStyle = css`
  margin-left: 16px;
  color: #1D1D1D;
  font-family:Inter;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const AppBar: React.FunctionComponent<IAppBarProps> = (props) => {
  return (
    <div css={appBarStyle}>
      <img css={logoStyle} src={logo} alt="Logo Image" />

      <div>
        <a href="#" css={linkStyle}>
          Company
        </a>
        <a href="#" css={linkStyle}>
          Blog
        </a>
        <a href="#" css={linkStyle}>
          Contact
        </a>
      </div>
    </div>
  );
};

export default AppBar;
