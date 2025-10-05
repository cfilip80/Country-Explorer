import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CountriesProvider } from "./context/CountriesContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CountriesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CountriesProvider>
  </StrictMode>
);
