import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css"; // Make sure this points to the correct CSS file
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
