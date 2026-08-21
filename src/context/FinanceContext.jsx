import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useAuth } from "./AuthContext";
import {
  checkToken as checkTokenServer,
  consumeToken as consumeTokenServer
} from "../services/tokenService";

import {
  loadFinance,
  saveFinance,
  DEFAULT_ACCOUNTS,
} from "../repositories/financeRepository";

const FinanceContext = createContext();

export function FinanceProvider({
  children,
}) {
  const {
    currentUser: user,
  } = useAuth();

  /*
   * ==========================================
   * FINANCE DATA
   * ==========================================
   */

  const [
    transactions,
    setTransactions,
  ] = useState([]);

  const [
    budgets,
    setBudgets,
  ] = useState([]);

  const [
    goals,
    setGoals,
  ] = useState([]);

  const [
    investments,
    setInvestments,
  ] = useState([]);

  const [
    transfers,
    setTransfers,
  ] = useState([]);

  const [
    accounts,
    setAccounts,
  ] = useState(DEFAULT_ACCOUNTS);

  /*
   * ==========================================
   * USER
   * ==========================================
   */

  const [
    profile,
    setProfile,
  ] = useState({
    name: "User",
    country: "Slovakia",
    currency: "EUR",
    language: "en",
    avatar: "",
    shownInsights: [],
  });

  const [
    settings,
    setSettings,
  ] = useState({
    theme: "dark",
    notifications: true,
  });

  /*
   * ==========================================
   * PREMIUM
   * ==========================================
   */

 const [
  premium,
  setPremium,
] = useState({
  plan: "free",

  tokens: 3,

  expiresAt: null,

  purchaseDate: null,

  source: null,
});

  /*
   * ==========================================
   * STATS
   * ==========================================
   */

  const [
    stats,
    setStats,
  ] = useState({
    aiQuestions: 0,
    receiptScans: 0,
  });

  /*
   * ==========================================
   * APP STATE
   * ==========================================
   */

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isLoaded,
    setIsLoaded,
  ] = useState(false);

  /*
   * ==========================================
   * LOAD USER
   * ==========================================
   */

  useEffect(() => {
  if (!user) {
    setTransactions([]);
    setBudgets([]);
    setGoals([]);
    setInvestments([]);
    setTransfers([]);

    setAccounts(DEFAULT_ACCOUNTS);

    setProfile({
      name: "User",
      country: "Slovakia",
      currency: "EUR",
      language: "en",
      avatar: "",
      shownInsights: [],
    });

    setSettings({
      theme: "dark",
      notifications: true,
    });

    setPremium({
  plan: "free",

  tokens: 3,

  expiresAt: null,

  purchaseDate: null,

  source: null,
});

    setStats({
      aiQuestions: 0,
      receiptScans: 0,
    });

    setIsLoaded(false);
    setIsLoading(false);

    return;
  }

  async function initialize() {
    setIsLoading(true);

    try {
      const data = await loadFinance(user.uid);

      setTransactions(data.transactions);
      setBudgets(data.budgets);
      setGoals(data.goals);
      setInvestments(data.investments);
      setTransfers(data.transfers);

      setAccounts(data.accounts);

      setProfile(data.profile);
      setSettings(data.settings);
      setPremium(data.premium);
      setStats(data.stats);

      setIsLoaded(true);

      console.log(
        "Finance loaded successfully."
      );

    } catch (error) {

      console.error(
        "Finance load failed:",
        error
      );

    } finally {

      setIsLoading(false);

    }
  }

  initialize();

}, [user]);

/*
 * ==========================================
 * AUTOSAVE
 * ==========================================
 */

useEffect(() => {

  if (!user) return;

  if (!isLoaded) return;

  const timeout = setTimeout(() => {

    saveFinance(user.uid, {

      transactions,
      budgets,
      goals,
      investments,
      transfers,

      accounts,

      profile,
      settings,
      premium,
      stats,

    });

  }, 750);

  return () => clearTimeout(timeout);

}, [

  user,
  isLoaded,

  transactions,
  budgets,
  goals,
  investments,
  transfers,

  accounts,

  profile,
  settings,
  premium,
  stats,

]);

/*
 * ==========================================
 * TRANSACTIONS
 * ==========================================
 */

function addTransaction(transaction) {

  setTransactions(prev => [
    ...prev,
    transaction,
  ]);

}

function updateTransaction(
  id,
  updatedTransaction
) {

  setTransactions(prev =>
    prev.map(transaction =>
      transaction.id === id
        ? updatedTransaction
        : transaction
    )
  );

}

function deleteTransaction(id) {

  setTransactions(prev =>
    prev.filter(
      transaction =>
        transaction.id !== id
    )
  );

}

function duplicateTransaction(id) {

  const transaction =
    transactions.find(
      t => t.id === id
    );

  if (!transaction) return;

  const copy = {
    ...transaction,

    id: crypto.randomUUID(),

    date:
      new Date().toISOString(),
  };

  setTransactions(prev => [
    ...prev,
    copy,
  ]);

}

/*
 * ==========================================
 * BUDGETS
 * ==========================================
 */

function addBudget(budget) {

  setBudgets(prev => [
    ...prev,
    budget,
  ]);

}

function updateBudget(
  id,
  updatedBudget
) {

  setBudgets(prev =>
    prev.map(budget =>
      budget.id === id
        ? updatedBudget
        : budget
    )
  );

}

function deleteBudget(id) {

  setBudgets(prev =>
    prev.filter(
      budget =>
        budget.id !== id
    )
  );

}

/*
 * ==========================================
 * GOALS
 * ==========================================
 */

function addGoal(goal) {

  setGoals(prev => [
    ...prev,
    goal,
  ]);

}

function updateGoal(
  id,
  updatedGoal
) {

  setGoals(prev =>
    prev.map(goal =>
      goal.id === id
        ? updatedGoal
        : goal
    )
  );

}

function deleteGoal(id) {

  setGoals(prev =>
    prev.filter(
      goal =>
        goal.id !== id
    )
  );

}

/*
 * ==========================================
 * INVESTMENTS
 * ==========================================
 */

function addInvestment(
  investment
) {

  setInvestments(prev => [
    ...prev,
    investment,
  ]);

}

function updateInvestment(
  id,
  updatedInvestment
) {

  setInvestments(prev =>
    prev.map(investment =>
      investment.id === id
        ? updatedInvestment
        : investment
    )
  );

}

function deleteInvestment(id) {

  setInvestments(prev =>
    prev.filter(
      investment =>
        investment.id !== id
    )
  );

}

/*
 * ==========================================
 * TRANSFERS
 * ==========================================
 */

function addTransfer(
  transfer
) {

  setTransfers(prev => [
    ...prev,
    transfer,
  ]);

}

/*
 * ==========================================
 * PREMIUM
 * ==========================================
 */

function addTokens(amount) {
  setPremium(prev => ({
    ...prev,
    tokens: prev.tokens + amount,
  }));
}

async function checkToken() {

  try {

    return await checkTokenServer();

  } catch (error) {

    console.error(
      "TOKEN CHECK ERROR:",
      error
    );

    throw error;
  }
}

async function consumeToken() {

  try {

    const result = await consumeTokenServer();

    if (!result.success) {
      return result;
    }

    setPremium(prev => ({
      ...prev,
      tokens: result.remainingTokens,
    }));

    return result;

  } catch (error) {

    console.error(
      "TOKEN CONSUMPTION ERROR:",
      error
    );

    throw error;
  }
}

async function resetDemoData() {

  if (!user) return;

  const defaultProfile = {
    name: "User",
    country: "Slovakia",
    currency: "EUR",
    language: "en",
    avatar: "",
    shownInsights: [],
  };

  const defaultSettings = {
    theme: "dark",
    notifications: true,
  };

  const resetData = {
    transactions: [],
    budgets: [],
    goals: [],
    investments: [],
    transfers: [],

    accounts: DEFAULT_ACCOUNTS,

    profile: defaultProfile,
    settings: defaultSettings,

    /*
     * IMPORTANT:
     * Keep the user's real Premium subscription
     * and LOOM Tokens.
     */
    premium: premium,

    stats: {
      aiQuestions: 0,
      receiptScans: 0,
    },
  };

  try {

    /*
     * Save the reset state directly to Firebase.
     * This prevents old data from coming back
     * after a page reload.
     */
    await saveFinance(
      user.uid,
      resetData
    );

    /*
     * Update React state.
     */
    setTransactions(
      resetData.transactions
    );

    setBudgets(
      resetData.budgets
    );

    setGoals(
      resetData.goals
    );

    setInvestments(
      resetData.investments
    );

    setTransfers(
      resetData.transfers
    );

    setAccounts(
      resetData.accounts
    );

    setProfile(
      resetData.profile
    );

    setSettings(
      resetData.settings
    );

    setStats(
      resetData.stats
    );

    /*
     * DO NOT modify premium.
     *
     * premium.plan stays the same.
     * premium.tokens stays the same.
     * premium.expiresAt stays the same.
     * premium.purchaseDate stays the same.
     * premium.source stays the same.
     */

    return true;

  } catch (error) {

    console.error(
      "RESET DEMO DATA ERROR:",
      error
    );

    throw error;
  }
}

function activatePremium(expiresAt) {
  setPremium(prev => ({
    ...prev,
    plan: "premium",
    expiresAt,
    purchaseDate:
      new Date().toISOString(),
  }));
}

function cancelPremium() {
  setPremium(prev => ({
    ...prev,
    plan: "free",
    expiresAt: null,
  }));
}

return (
  
<FinanceContext.Provider
  value={{
    // Finance data
    transactions,
    setTransactions,

    budgets,
    setBudgets,

    goals,
    setGoals,

    investments,
    setInvestments,

    transfers,
    setTransfers,

    accounts,
    setAccounts,

    // User
    profile,
    setProfile,

    settings,
    setSettings,

    // Premium
premium,
setPremium,

addTokens,
checkToken,
consumeToken,
resetDemoData,
activatePremium,
cancelPremium,

    // Statistics
    stats,
    setStats,

    // App state
    isLoading,
    isLoaded,
  }}
>
  {children}
</FinanceContext.Provider>
);
}

export function useFinance() {
  return useContext(
    FinanceContext
  );
}