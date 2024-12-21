import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StorecontextProvider } from "./Context/StoreContext"; // Named import

// Create a root for rendering
const root = createRoot(document.getElementById("root"));

// Render the application
root.render(
  <BrowserRouter>
    <StorecontextProvider>
      <App />
    </StorecontextProvider>
  </BrowserRouter>
);
