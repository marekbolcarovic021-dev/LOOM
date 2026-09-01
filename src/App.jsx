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


// ======================================================
// APP
// ======================================================

function App() {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>

      <Routes>

        {/* ==================================================
            PUBLIC WEBSITE
            ================================================== */}

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/home"
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


        {/* ==================================================
            FINANCIAL GUIDES
            ================================================== */}

        <Route
          path="/guides"
          element={<FinancialGuides />}
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


        {/* ==================================================
            LOOM APPLICATION
            ==================================================
            
            Every private page checks currentUser.
            If the user is not logged in, they are sent
            to the login page.
            
            ================================================== */}

        <Route
          path="/"
          element={
            currentUser
              ? <Dashboard />
              : <Login />
          }
        />

        <Route
          path="/transactions"
          element={
            currentUser
              ? <Transactions />
              : <Login />
          }
        />

        <Route
          path="/budgets"
          element={
            currentUser
              ? <Budgets />
              : <Login />
          }
        />

        <Route
          path="/goals"
          element={
            currentUser
              ? <Goals />
              : <Login />
          }
        />

        <Route
          path="/investments"
          element={
            currentUser
              ? <Investments />
              : <Login />
          }
        />

        <Route
          path="/profile"
          element={
            currentUser
              ? <Profile />
              : <Login />
          }
        />

        <Route
          path="/accounts"
          element={
            currentUser
              ? <Accounts />
              : <Login />
          }
        />

        <Route
          path="/advisor"
          element={
            currentUser
              ? <Advisor />
              : <Login />
          }
        />

        <Route
          path="/premium"
          element={
            currentUser
              ? <Premium />
              : <Login />
          }
        />


        {/* ==================================================
            UNKNOWN ROUTES
            ================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to={
                currentUser
                  ? "/"
                  : "/about"
              }
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;