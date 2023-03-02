import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { loadServer,DevTools } from "jira-dev-tool";

const root = document.getElementById("root");

loadServer(() => {
  ReactDOM.render(<React.StrictMode>
    <DevTools />
    <App />
  </React.StrictMode>,root);
});
