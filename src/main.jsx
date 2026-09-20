import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "./locales/i18n";

import { AuthProvider } from "./context/AuthContext";
import { FinanceProvider } from "./context/FinanceContext";
import { CurrencyProvider } from "./context/CurrencyContext";

import "./styles/toast.css";

const isAppBuild =
  import.meta.env.VITE_APP_BUILD === "true";

const appModule = isAppBuild
  ? import("./AppOnly.jsx")
  : import("./App.jsx");

appModule.then(({ default: App }) => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <AuthProvider>
        <FinanceProvider>
          <CurrencyProvider>
            <App />

            <Toaster
              position="top-right"
              gutter={12}
              reverseOrder={false}
              toastOptions={{
                duration: 5000,
                style: {
                  background: "var(--card)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  boxShadow: "var(--shadow)",
                },
              }}
            />
          </CurrencyProvider>
        </FinanceProvider>
      </AuthProvider>
    </StrictMode>
  );
});