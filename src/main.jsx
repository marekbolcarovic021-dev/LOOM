import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "./locales/i18n";

import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { FinanceProvider } from "./context/FinanceContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import "./styles/toast.css";

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