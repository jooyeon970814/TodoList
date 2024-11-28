import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SetTheme } from "./context/theme"; // setTheme import
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// ThemeProvider로 App을 감싸서 테마 상태와 함수를 전달
root.render(
  <SetTheme>
    <App />
  </SetTheme>
);
