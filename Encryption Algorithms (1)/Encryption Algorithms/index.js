import React from "react";
import "./index.css";
import { createRoot } from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StatusProvider } from "./store/status-context";
const rootContainer = createRoot(document.getElementById("root"));

rootContainer.render(
  <BrowserRouter>
    <StatusProvider>
      <App />
    </StatusProvider>
  </BrowserRouter>
);
