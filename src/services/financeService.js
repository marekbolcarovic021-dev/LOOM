import { DEFAULT_ACCOUNTS } from "../repositories/financeRepository";

/*
 * ==========================================
 * HELPERS
 * ==========================================
 */

export function createId() {
  return crypto.randomUUID();
}

export function now() {
  return new Date().toISOString();
}

/*
 * ==========================================
 * TRANSACTIONS
 * ==========================================
 */

export function createTransaction({
  accountId,
  type,
  category,
  amount,
  date = now(),
  recurring = false,
  recurrence = null,
  note = "",
}) {
  return {
    id: createId(),

    accountId,

    type,

    category,

    amount: Number(amount),

    date,

    recurring,

    recurrence,

    nextExecution: recurring
      ? date
      : null,

    note,
  };
}

export function updateAccountBalances(
  accounts,
  transactions
) {
  const updatedAccounts =
    accounts.map(account => ({
      ...account,
      balance: 0,
    }));

  transactions.forEach(transaction => {
    const account =
      updatedAccounts.find(
        a =>
          a.id ===
          transaction.accountId
      );

    if (!account) return;

    if (
      transaction.type ===
      "Income"
    ) {
      account.balance +=
        Number(transaction.amount);
    } else {
      account.balance -=
        Number(transaction.amount);
    }
  });

  return updatedAccounts;
}

/*
 * ==========================================
 * ACCOUNTS
 * ==========================================
 */

export function createAccount({
  name,
  type,
  currency,
}) {
  return {
    id: createId(),

    name,

    type,

    currency,

    balance: 0,
  };
}

/*
 * ==========================================
 * BUDGETS
 * ==========================================
 */

export function createBudget({
  category,
  amount,
  month,
}) {
  return {
    id: createId(),

    category,

    amount:
      Number(amount),

    month,
  };
}

/*
 * ==========================================
 * GOALS
 * ==========================================
 */

export function createGoal({
  title,
  target,
  current = 0,
  deadline,
}) {
  return {
    id: createId(),

    title,

    target:
      Number(target),

    current:
      Number(current),

    deadline,
  };
}

/*
 * ==========================================
 * INVESTMENTS
 * ==========================================
 */

export function createInvestment({
  name,
  type,
  amount,
  currency,
}) {
  return {
    id: createId(),

    name,

    type,

    amount:
      Number(amount),

    currency,
  };
}

/*
 * ==========================================
 * RESET
 * ==========================================
 */

export function createEmptyFinance() {
  return {
    transactions: [],
    budgets: [],
    goals: [],
    investments: [],
    transfers: [],
    accounts:
      DEFAULT_ACCOUNTS,
  };
}