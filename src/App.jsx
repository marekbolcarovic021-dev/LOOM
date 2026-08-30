import { BrowserRouter, Routes, Route } from "react-router-dom";

import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";

import Investments from "./pages/Investments";
import Profile from "./pages/Profile";
import Budgets from "./pages/Budgets";
import Accounts from "./pages/Accounts";
import Advisor from "./pages/Advisor";
import Premium from "./pages/Premium";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import { useAuth } from "./context/AuthContext";

import "./App.css";

function App() {
  const { currentUser } = useAuth();

  // User is not logged in
  if (!currentUser) {
    return <Login />;
  }

  // User is logged in
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/advisor" element={<Advisor />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
