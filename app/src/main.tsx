import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./assets/main-theme.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import LandingPage from "./routes/LandingPage/LandingPage.tsx";
import ErrorPage from "./global/ErrorPage.tsx";
import Root from "./routes/Root.tsx";
import LoadingPage from "./routes/LoadingPage/LoadingPage.tsx";
import ResultsPage from "./routes/ResultsPage/ResultsPage.tsx";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
      },
      {
        path: "result/:resultId",
        element: <ResultsPage/>,
      },
      {
        path: "run-result",
        element: <LoadingPage/>,
      },
     
    ],
  },
]);



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
