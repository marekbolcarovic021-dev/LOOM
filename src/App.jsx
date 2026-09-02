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
// FINANCIAL GUIDE ARTICLES
// ======================================================

import HowToCreateABudget
  from "./pages/guides/articles/HowToCreateABudget";

import MonthlyBudget
  from "./pages/guides/articles/MonthlyBudget";

import StartingToSave
  from "./pages/guides/articles/StartingToSave";

import InvestingForBeginners
  from "./pages/guides/articles/InvestingForBeginners";

import SettingFinancialGoals
  from "./pages/guides/articles/SettingFinancialGoals";

import UnderstandingYourFinances
  from "./pages/guides/articles/UnderstandingYourFinances";

import UnderstandingDebt
  from "./pages/guides/articles/UnderstandingDebt";

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
            MAIN ENTRY POINT
        ==================================================

            The public LOOM website is always the homepage.

            Logged out:
              /
              -> About LOOM

            Logged in:
              /
              -> About LOOM

            The authenticated Dashboard has its own route:
              /dashboard
        ================================================== */}

        <Route
          path="/"
          element={<About />}
        />


        {/* ==================================================
            PUBLIC WEBSITE
        ================================================== */}

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Old homepage route.
            Keep it working, but redirect it to the
            new canonical homepage. */}

        <Route
          path="/home"
          element={
            <Navigate
              to="/"
              replace
            />
          }
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


        {/* ==================================================
            BUDGETING
        ================================================== */}

        <Route
          path="/guides/budgeting"
          element={<Budgeting />}
        />

        <Route
          path="/guides/budgeting/how-to-create-a-budget"
          element={<HowToCreateABudget />}
        />

        <Route
          path="/guides/budgeting/monthly-budget"
          element={<MonthlyBudget />}
        />


        {/* ==================================================
            SAVING
        ================================================== */}

        <Route
          path="/guides/saving"
          element={<Saving />}
        />

        <Route
          path="/guides/saving/starting-to-save"
          element={<StartingToSave />}
        />


        {/* ==================================================
            INVESTING
        ================================================== */}

        <Route
          path="/guides/investing"
          element={<Investing />}
        />

        <Route
          path="/guides/investing/investing-for-beginners"
          element={<InvestingForBeginners />}
        />


        {/* ==================================================
            FINANCIAL GOALS
        ================================================== */}

        <Route
          path="/guides/financial-goals"
          element={<FinancialGoals />}
        />

        <Route
          path="/guides/financial-goals/setting-financial-goals"
          element={<SettingFinancialGoals />}
        />


        {/* ==================================================
            PERSONAL FINANCE
        ================================================== */}

        <Route
          path="/guides/personal-finance"
          element={<PersonalFinance />}
        />

        <Route
          path="/guides/personal-finance/understanding-your-finances"
          element={<UnderstandingYourFinances />}
        />


        {/* ==================================================
            DEBT
        ================================================== */}

        <Route
          path="/guides/debt"
          element={<Debt />}
        />

        <Route
          path="/guides/debt/understanding-debt"
          element={<UnderstandingDebt />}
        />


        {/* ==================================================
            PROTECTED LOOM APPLICATION
        ==================================================

            Dashboard:
              /dashboard

            All application routes require authentication.

            Logged out users are redirected to /login.
        ================================================== */}

        <Route
          path="/dashboard"
          element={
            currentUser
              ? <Dashboard />
              : <Navigate
                  to="/login"
                  replace
                />
          }
        />

        <Route
          path="/transactions"
          element={
            currentUser
              ? <Transactions />
              : <Navigate
                  to="/login"
                  replace
                />
          }
        />

        <Route
          path="/budgets"
          element={
            currentUser
              ? <Budgets />
              : <Navigate
                  to="/login"
                  replace
                />
          }
        />

        <Route
          path="/goals"
          element={
            currentUser
              ? <Goals />
              : <Navigate
                  to="/login"
                  replace
                />
          }
        />

        <Route
          path="/investments"
          element={
            currentUser
              ? <Investments />
              : <Navigate
                  to="/login"
                  replace
                />
          }
        />

        <Route
          path="/profile"
          element={
            currentUser
              ? <Profile />
              : <Navigate
                  to="/login"
                  replace
                />
          }
        />

        <Route
          path="/accounts"
          element={
            currentUser
              ? <Accounts />
              : <Navigate
                  to="/login"
                  replace
                />
          }
        />

        <Route
          path="/advisor"
          element={
            currentUser
              ? <Advisor />
              : <Navigate
                  to="/login"
                  replace
                />
          }
        />

        <Route
          path="/premium"
          element={
            currentUser
              ? <Premium />
              : <Navigate
                  to="/login"
                  replace
                />
          }
        />


        {/* ==================================================
            UNKNOWN ROUTES
        ==================================================

            Any unknown URL goes to the public LOOM homepage.

            The homepage is always About.
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

export default App;