import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./components/pages/Dashboard/Dashboard.tsx";
import Account from "./components/pages/Account/Account.tsx";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import MainLayout from "./components/layouts/MainLayout/MainLayout.tsx";
import { AuthProvider } from "./components/context/AuthProvider.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "./ErrorHandler.tsx";

// biome-ignore lint/style/noNonNullAssertion: element root should be here
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <ErrorBoundary FallbackComponent={ErrorHandler}>
                <MainLayout />
              </ErrorBoundary>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
