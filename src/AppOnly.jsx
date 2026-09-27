import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import loomSplashSymbol from "./assets/loom-splash-symbol.png";

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
import { App as CapacitorApp } from "@capacitor/app";

// ======================================================
// GLOBAL STYLES
// ======================================================

import "./App.css";

// ======================================================
// LOOM APP ONLY
// ======================================================

// ======================================================
// ANDROID BACK BUTTON
// ======================================================

function AndroidBackHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const backButtonListener =
      CapacitorApp.addListener(
        "backButton",
        () => {
          const currentPath = location.pathname;

          // ------------------------------------------------
          // DASHBOARD
          // ------------------------------------------------

          if (currentPath === "/dashboard") {
            CapacitorApp.exitApp();
            return;
          }

          // ------------------------------------------------
          // LOGIN
          // ------------------------------------------------

          if (currentPath === "/login") {
            CapacitorApp.exitApp();
            return;
          }

          // ------------------------------------------------
          // REGISTER
          // ------------------------------------------------

          if (currentPath === "/register") {
            navigate("/login", {
              replace: true,
            });
            return;
          }

          // ------------------------------------------------
          // ALL OTHER APP PAGES
          // ------------------------------------------------

          navigate("/dashboard", {
            replace: true,
          });
        }
      );

    return () => {
      backButtonListener.then(
        (listener) => listener.remove()
      );
    };
  }, [location.pathname, navigate]);

  return null;
}

// ======================================================
// LOOM STARTUP INTRO
// Android only
// ======================================================

function LoomStartupIntro({ onFinished }) {
  const [phase, setPhase] = useState("intro");

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setPhase("logo");
      }, 120),

      setTimeout(() => {
        setPhase("text");
      }, 520),

      setTimeout(() => {
        setPhase("glow");
      }, 1050),

      setTimeout(() => {
        setPhase("exit");
      }, 1350),

      setTimeout(() => {
        onFinished();
      }, 1700),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onFinished]);

  const logoVisible = [
    "logo",
    "text",
    "glow",
    "exit",
  ].includes(phase);

  const textVisible = [
    "text",
    "glow",
    "exit",
  ].includes(phase);

  const glowVisible = [
    "glow",
    "exit",
  ].includes(phase);

  const exiting = phase === "exit";

  return (
    <div
      className={[
        "loom-startup-intro",
        logoVisible ? "loom-startup-logo" : "",
        textVisible ? "loom-startup-text" : "",
        glowVisible ? "loom-startup-glow" : "",
        exiting ? "loom-startup-exit" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="loom-startup-content">

        <div className="loom-startup-symbol-wrapper">
          <img
  src={loomSplashSymbol}
  alt=""
  className="loom-startup-symbol"
/>
        </div>

        <div className="loom-startup-wordmark">
          <span className="loom-letter loom-letter-1">
            L
          </span>

          <span className="loom-letter loom-letter-2">
            O
          </span>

          <span className="loom-letter loom-letter-3">
            O
          </span>

          <span className="loom-letter loom-letter-4">
            M
          </span>
        </div>

      </div>
    </div>
  );
}

function AppOnly() {
  const { currentUser, loading } = useAuth();

  const [showStartupIntro, setShowStartupIntro] =
    useState(true);

  useEffect(() => {
    document.body.classList.add("loom-native-app");

    return () => {
      document.body.classList.remove("loom-native-app");
    };
  }, []);

  if (showStartupIntro) {
    return (
      <LoomStartupIntro
        onFinished={() => setShowStartupIntro(false)}
      />
    );
  }

  return (
    <BrowserRouter>

      <AndroidBackHandler />

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