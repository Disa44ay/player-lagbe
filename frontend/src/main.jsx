import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import DemoStorecontextProvider from "./DemoContext/DemoStoreContext.jsx";
import StorecontextProvider from "./Context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StorecontextProvider>
      <App />
    </StorecontextProvider>
  </BrowserRouter>
);
