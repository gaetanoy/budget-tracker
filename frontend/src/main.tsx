import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App, { MainLayout } from "./App.tsx";

// biome-ignore lint/style/noNonNullAssertion: element root should be here
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
