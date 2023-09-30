import * as React from "react";
import { css } from "@emotion/react";
import logo from "../assets/logo.png";
import { mq } from "../assets/global-styles";
import { useNavigate } from "react-router-dom";

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
  height: 65px;
  ${mq["xl"]} {
    height: 55px;
  }
  &:hover{
    cursor: pointer;
  }
`;

const linkStyle = css`
  margin-left: 16px;
  font-size: 1.2em;
  ${mq["xl"]} {
    font-size: 1em;
  }
  color: #1d1d1d;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const AppBar: React.FunctionComponent<IAppBarProps> = (props) => {
  let navigate = useNavigate();

  return (
    <div css={appBarStyle} >
      <img css={logoStyle} src={logo} alt="Logo Image"  onClick={() => navigate("/")}/>

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
