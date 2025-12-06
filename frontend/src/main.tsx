import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./components/organisms/App/App";
import Account from "./components/pages/Account/Account.tsx";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import MainLayout from "./components/layouts/MainLayout/MainLayout.tsx";

// biome-ignore lint/style/noNonNullAssertion: element root should be here
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
