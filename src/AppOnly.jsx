import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ======================================================
// LOOM APP PAGES
// ======================================================

import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Investments from "./pages/Investments";
import Profile from "./pages/Profile";
import Budgets from "./pages/Budgets";
import Accounts from "./pages/Accounts";
import Advisor from "./pages/Advisor";
import Premium from "./pages/Premium";

// ======================================================
// AUTH
// ======================================================

import Login from "./pages/Login";
import Register from "./pages/Register";

// ======================================================
// AUTH CONTEXT
// ======================================================

import { useAuth } from "./context/AuthContext";

// ======================================================
// GLOBAL STYLES
// ======================================================

import "./App.css";

// ======================================================
// LOOM APP ONLY
// ======================================================

function AppOnly() {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* ==================================================
            AUTHENTICATION
        ================================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ==================================================
            PROTECTED LOOM APPLICATION
        ================================================== */}

        <Route
          path="/dashboard"
          element={
            currentUser ? (
              <Dashboard />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        <Route
          path="/transactions"
          element={
            currentUser ? (
              <Transactions />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        <Route
          path="/budgets"
          element={
            currentUser ? (
              <Budgets />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        <Route
          path="/goals"
          element={
            currentUser ? (
              <Goals />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        <Route
          path="/investments"
          element={
            currentUser ? (
              <Investments />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        <Route
          path="/profile"
          element={
            currentUser ? (
              <Profile />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        <Route
          path="/accounts"
          element={
            currentUser ? (
              <Accounts />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        <Route
          path="/advisor"
          element={
            currentUser ? (
              <Advisor />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        <Route
          path="/premium"
          element={
            currentUser ? (
              <Premium />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* ==================================================
            APP ENTRY
        ================================================== */}

        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* ==================================================
            UNKNOWN ROUTES
        ================================================== */}

          <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppOnly;