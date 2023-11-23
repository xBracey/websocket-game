import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";

const rootNode = document.getElementById("root");

if (rootNode) {
  createRoot(rootNode).render(<App />);
}
