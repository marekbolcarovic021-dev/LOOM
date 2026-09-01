import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ======================================================
// EXISTING LOOM APP PAGES
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
// AUTH PAGES
// ======================================================

import Login from "./pages/Login";
import Register from "./pages/Register";

// ======================================================
// PUBLIC PAGES
// ======================================================

import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";

// ======================================================
// FINANCIAL GUIDES
// ======================================================

import FinancialGuides from "./pages/guides/FinancialGuides";
import Budgeting from "./pages/guides/Budgeting";
import Saving from "./pages/guides/Saving";
import Investing from "./pages/guides/Investing";
import FinancialGoals from "./pages/guides/FinancialGoals";
import PersonalFinance from "./pages/guides/PersonalFinance";
import Debt from "./pages/guides/Debt";

// ======================================================
// AUTH CONTEXT
// ======================================================

import { useAuth } from "./context/AuthContext";

// ======================================================
// GLOBAL STYLES
// ======================================================

import "./App.css";
import CreateMonthlyBudget from "./pages/guides/articles/CreateMonthlyBudget";


// ======================================================
// PRIVATE ROUTE
// ======================================================

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// ======================================================
// PUBLIC ROUTES
// ======================================================

function PublicRoutes() {
  return (
    <>
      {/* ------------------------------------------------
          PUBLIC WEBSITE
      ------------------------------------------------- */}

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/privacy"
        element={<PrivacyPolicy />}
      />

      <Route
        path="/cookies"
        element={<CookiePolicy />}
      />

      <Route
        path="/terms"
        element={<Terms />}
      />


      {/* ------------------------------------------------
          AUTH
      ------------------------------------------------- */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* ------------------------------------------------
          FINANCIAL GUIDES
      ------------------------------------------------- */}

      <Route
        path="/guides"
        element={<FinancialGuides />}
      />
      
<Route
  path="/guides/budgeting/create-a-monthly-budget"
  element={<CreateMonthlyBudget />}
/>

      <Route
        path="/guides/budgeting"
        element={<Budgeting />}
      />

      <Route
        path="/guides/saving"
        element={<Saving />}
      />

      <Route
        path="/guides/investing"
        element={<Investing />}
      />

      <Route
        path="/guides/financial-goals"
        element={<FinancialGoals />}
      />

      <Route
        path="/guides/personal-finance"
        element={<PersonalFinance />}
      />

      <Route
        path="/guides/debt"
        element={<Debt />}
      />
    </>
  );
}


// ======================================================
// PRIVATE APP ROUTES
// ======================================================

function PrivateRoutes() {
  return (
    <>
      {/* ------------------------------------------------
          DASHBOARD
      ------------------------------------------------- */}

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />


      {/* ------------------------------------------------
          TRANSACTIONS
      ------------------------------------------------- */}

      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        }
      />


      {/* ------------------------------------------------
          BUDGETS
      ------------------------------------------------- */}

      <Route
        path="/budgets"
        element={
          <PrivateRoute>
            <Budgets />
          </PrivateRoute>
        }
      />


      {/* ------------------------------------------------
          GOALS
      ------------------------------------------------- */}

      <Route
        path="/goals"
        element={
          <PrivateRoute>
            <Goals />
          </PrivateRoute>
        }
      />


      {/* ------------------------------------------------
          INVESTMENTS
      ------------------------------------------------- */}

      <Route
        path="/investments"
        element={
          <PrivateRoute>
            <Investments />
          </PrivateRoute>
        }
      />


      {/* ------------------------------------------------
          ACCOUNTS
      ------------------------------------------------- */}

      <Route
        path="/accounts"
        element={
          <PrivateRoute>
            <Accounts />
          </PrivateRoute>
        }
      />


      {/* ------------------------------------------------
          ADVISOR
      ------------------------------------------------- */}

      <Route
        path="/advisor"
        element={
          <PrivateRoute>
            <Advisor />
          </PrivateRoute>
        }
      />


      {/* ------------------------------------------------
          PREMIUM
      ------------------------------------------------- */}

      <Route
        path="/premium"
        element={
          <PrivateRoute>
            <Premium />
          </PrivateRoute>
        }
      />


      {/* ------------------------------------------------
          PROFILE
      ------------------------------------------------- */}

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </>
  );
}


// ======================================================
// APP
// ======================================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            PUBLIC ROUTES
        ================================================== */}

        <PublicRoutes />

        {/* =================================================
            PRIVATE LOOM APP
        ================================================== */}

        <PrivateRoutes />


        {/* =================================================
            FALLBACK
        ================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/about"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;