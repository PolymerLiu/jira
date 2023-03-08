import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { loadServer, DevTools } from "jira-dev-tool";
import { AppProviders } from "context";

const root = document.getElementById("root");

loadServer(() => {
  ReactDOM.render(<React.StrictMode>
    <DevTools />
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>, root);
});
