import { useTranslation } from "react-i18next";
import {
  useState,
  useEffect,
  useRef,
} from "react";

import SearchFilters from "../components/transactions/SearchFilters";
import BottomNav from "../components/BottomNav";
import TransactionForm from "../components/transactions/TransactionForm";
import MonthSelector from "../components/transactions/MonthSelector";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionSummary from "../components/transactions/TransactionSummary";
import TransactionCharts from "../components/transactions/TransactionCharts";

import { useFinance } from "../context/FinanceContext";

function Transactions() {
  const { t } = useTranslation();

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  // IMPORTANT:
  // Do not hardcode account ID 1.
  // We set the account to the actual first account below.
  const [accountId, setAccountId] = useState("");

  const [search, setSearch] = useState("");

  const [filterType, setFilterType] =
    useState("All");

  const [editingTransaction, setEditingTransaction] =
    useState(null);

  const [recurring, setRecurring] =
    useState(false);

  const [recurrence, setRecurrence] =
    useState("monthly");

  const {
    transactions,
    setTransactions,
    accounts,
    setAccounts,
  } = useFinance();

  const [selectedMonth, setSelectedMonth] =
    useState(
      new Date()
        .toISOString()
        .slice(0, 7)
    );

  const formRef = useRef(null);

  // ==================================================
  // SET DEFAULT ACCOUNT
  // ==================================================
  // Always use the REAL ID of the first account.
  // Never assume the first account has ID 1.
  // ==================================================

  useEffect(() => {
    if (
      !editingTransaction &&
      !accountId &&
      accounts.length > 0
    ) {
      setAccountId(
        String(accounts[0].id)
      );
    }
  }, [
    accounts,
    accountId,
    editingTransaction,
  ]);

  // ==================================================
  // RECURRING TRANSACTIONS
  // ==================================================

  useEffect(() => {
    const today = new Date();

    transactions.forEach(
      (transaction) => {
        if (
          !transaction.recurring ||
          !transaction.nextExecution
        ) {
          return;
        }

        const nextDate =
          new Date(
            transaction.nextExecution
          );

        if (today >= nextDate) {
          const newTransaction = {
            ...transaction,
            id:
              Date.now() +
              Math.random(),
            date:
              new Date().toISOString(),
          };

          setTransactions(
            (prev) => [
              ...prev,
              newTransaction,
            ]
          );

          const updatedTransactions =
            transactions.map((t) => {
              if (
                t.id !==
                transaction.id
              ) {
                return t;
              }

              const next =
                new Date(nextDate);

              if (
                transaction.recurrence ===
                "weekly"
              ) {
                next.setDate(
                  next.getDate() + 7
                );
              }

              if (
                transaction.recurrence ===
                "monthly"
              ) {
                next.setMonth(
                  next.getMonth() + 1
                );
              }

              if (
                transaction.recurrence ===
                "yearly"
              ) {
                next.setFullYear(
                  next.getFullYear() + 1
                );
              }

              return {
                ...t,
                nextExecution:
                  next.toISOString(),
              };
            });

          setTransactions(
            updatedTransactions
          );
        }
      }
    );
  }, []);

  // ==================================================
  // ADD / EDIT TRANSACTION
  // ==================================================

  function addTransaction() {
    if (
      !type ||
      !category ||
      !amount ||
      !accountId
    ) {
      return;
    }

    const selectedAccountId =
      String(accountId);

    const numericAmount =
      Number(amount);

    if (
      !Number.isFinite(
        numericAmount
      ) ||
      numericAmount <= 0
    ) {
      return;
    }

    // ==================================================
    // EDIT MODE
    // ==================================================

    if (editingTransaction) {
      const oldAccountId =
        String(
          editingTransaction.accountId
        );

      const oldAmount =
        Number(
          editingTransaction.amount || 0
        );

      const oldType =
        editingTransaction.type;

      // Update account balances correctly when
      // editing the transaction.
      setAccounts(
        (prevAccounts) =>
          prevAccounts.map(
            (account) => {
              const id =
                String(account.id);

              let newBalance =
                Number(
                  account.balance || 0
                );

              // Undo the old transaction
              if (id === oldAccountId) {
                if (
                  oldType ===
                  "Income"
                ) {
                  newBalance -=
                    oldAmount;
                } else {
                  newBalance +=
                    oldAmount;
                }
              }

              // Apply the new transaction
              if (
                id ===
                selectedAccountId
              ) {
                if (
                  type ===
                  "Income"
                ) {
                  newBalance +=
                    numericAmount;
                } else {
                  newBalance -=
                    numericAmount;
                }
              }

              return {
                ...account,
                balance:
                  newBalance,
              };
            }
          )
      );

      setTransactions(
        (prevTransactions) =>
          prevTransactions.map(
            (transaction) =>
              transaction.id ===
              editingTransaction.id
                ? {
                    ...transaction,
                    accountId:
                      selectedAccountId,
                    type,
                    category:
                      category
                        .charAt(0)
                        .toUpperCase() +
                      category.slice(1),
                    amount:
                      numericAmount,
                  }
                : transaction
          )
      );

      setEditingTransaction(null);
    }

    // ==================================================
    // ADD MODE
    // ==================================================

    else {
      const newTransaction = {
        id: Date.now(),

        // Store the actual selected account ID
        accountId:
          selectedAccountId,

        type,

        category:
          category
            .charAt(0)
            .toUpperCase() +
          category.slice(1),

        amount:
          numericAmount,

        date:
          new Date().toISOString(),

        recurring,

        recurrence,

        nextExecution:
          new Date().toISOString(),
      };

      setTransactions(
        (prevTransactions) => [
          ...prevTransactions,
          newTransaction,
        ]
      );

      // ==================================================
      // UPDATE THE CORRECT ACCOUNT
      // ==================================================

      setAccounts(
        (prevAccounts) =>
          prevAccounts.map(
            (account) => {
              // Compare IDs as strings so
              // number/string differences cannot
              // break account matching.
              if (
                String(account.id) !==
                selectedAccountId
              ) {
                return account;
              }

              const currentBalance =
                Number(
                  account.balance || 0
                );

              return {
                ...account,

                balance:
                  type === "Income"
                    ? currentBalance +
                      numericAmount
                    : currentBalance -
                      numericAmount,
              };
            }
          )
      );
    }

    // ==================================================
    // RESET FORM
    // ==================================================

    setType("");
    setCategory("");
    setAmount("");

    setRecurring(false);
    setRecurrence("monthly");

    // Reset to the REAL first account ID
    setAccountId(
      accounts.length > 0
        ? String(accounts[0].id)
        : ""
    );
  }

  // ==================================================
  // FILTER BY MONTH
  // ==================================================

  const filteredTransactions =
    transactions.filter(
      (transaction) => {
        const matchesMonth =
          transaction.date.startsWith(
            selectedMonth
          );

        const matchesSearch =
          transaction.category
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesType =
          filterType === "All"
            ? true
            : transaction.type ===
              filterType;

        return (
          matchesMonth &&
          matchesSearch &&
          matchesType
        );
      }
    );

  // ==================================================
  // MONTHS
  // ==================================================

  const months = [
    t("january"),
    t("february"),
    t("march"),
    t("april"),
    t("may"),
    t("june"),
    t("july"),
    t("august"),
    t("september"),
    t("october"),
    t("november"),
    t("december"),
  ];

  const currentDate = new Date(
    selectedMonth + "-01"
  );

  // ==================================================
  // TOTALS
  // ==================================================

  const totalIncome =
    filteredTransactions
      .filter(
        (t) =>
          t.type === "Income"
      )
      .reduce(
        (sum, transaction) =>
          sum +
          Number(
            transaction.amount || 0
          ),
        0
      );

  const totalExpenses =
    filteredTransactions
      .filter(
        (t) =>
          t.type === "Expense"
      )
      .reduce(
        (sum, transaction) =>
          sum +
          Number(
            transaction.amount || 0
          ),
        0
      );

  const balance =
    totalIncome -
    totalExpenses;

  // ==================================================
  // BAR CHART DATA
  // ==================================================

  const summaryData = [
    {
      name: t("income"),
      amount: totalIncome,
    },
    {
      name: t("expense"),
      amount: totalExpenses,
    },
  ];

  // ==================================================
  // PIE CHART DATA
  // ==================================================

  const expenseCategories = {};

  filteredTransactions
    .filter(
      (t) =>
        t.type === "Expense"
    )
    .forEach(
      (transaction) => {
        if (
          !expenseCategories[
            transaction.category
          ]
        ) {
          expenseCategories[
            transaction.category
          ] = 0;
        }

        expenseCategories[
          transaction.category
        ] += Number(
          transaction.amount || 0
        );
      }
    );

  const pieData = Object.entries(
    expenseCategories
  ).map(
    ([category, amount]) => ({
      name: t(
        category.toLowerCase(),
        category
      ),
      value: amount,
    })
  );

  const COLORS = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
  ];

  return (
    <div className="goals-page">

      <h1>
        {t("transactions")}
      </h1>

      {editingTransaction && (
        <div className="edit-banner">
          {t(
            "editingTransaction"
          )}
        </div>
      )}

      {/* FORM */}

      <TransactionForm
        editingTransaction={
          editingTransaction
        }
        accounts={accounts}
        accountId={accountId}
        setAccountId={
          setAccountId
        }
        type={type}
        setType={setType}
        category={category}
        setCategory={
          setCategory
        }
        amount={amount}
        setAmount={setAmount}
        recurring={recurring}
        setRecurring={
          setRecurring
        }
        recurrence={recurrence}
        setRecurrence={
          setRecurrence
        }
        addTransaction={
          addTransaction
        }
        cancelEdit={() => {
          setEditingTransaction(
            null
          );

          setType("");
          setCategory("");
          setAmount("");

          setAccountId(
            accounts.length > 0
              ? String(
                  accounts[0].id
                )
              : ""
          );
        }}
      />

      {/* SEARCH + FILTER */}

      <SearchFilters
        search={search}
        setSearch={setSearch}
        filterType={filterType}
        setFilterType={
          setFilterType
        }
      />

      {/* MONTH */}

      <MonthSelector
        currentDate={currentDate}
        selectedMonth={
          selectedMonth
        }
        setSelectedMonth={
          setSelectedMonth
        }
      />

      {/* SUMMARY */}

      <TransactionSummary
        totalIncome={
          totalIncome
        }
        totalExpenses={
          totalExpenses
        }
        balance={balance}
      />

      {/* CHARTS */}

      <TransactionCharts
        summaryData={
          summaryData
        }
        pieData={pieData}
        totalIncome={
          totalIncome
        }
        totalExpenses={
          totalExpenses
        }
        COLORS={COLORS}
      />

      {/* TRANSACTIONS TABLE */}

      <TransactionTable
        filteredTransactions={
          filteredTransactions
        }
        accounts={accounts}
        transactions={transactions}
        setTransactions={
          setTransactions
        }
        setAccounts={
          setAccounts
        }
        setEditingTransaction={
          setEditingTransaction
        }
        setType={setType}
        setCategory={
          setCategory
        }
        setAmount={setAmount}
        setAccountId={
          setAccountId
        }
      />

      <BottomNav />

    </div>
  );
}

export default Transactions;