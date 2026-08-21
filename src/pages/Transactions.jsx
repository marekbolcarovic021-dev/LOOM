import { useTranslation } from "react-i18next";
import {
  useState,
  useEffect,
  useRef,
} from "react";
import SearchFilters from "../components/transactions/SearchFilters";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import TransactionForm from "../components/transactions/TransactionForm";

import MonthSelector from "../components/transactions/MonthSelector";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionSummary from "../components/transactions/TransactionSummary";
import TransactionCharts from "../components/transactions/TransactionCharts";


import { useFinance } from "../context/FinanceContext";

import {
  Pencil,
  Trash2,
} from "lucide-react";

function Transactions() {
  const { t } = useTranslation();
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] =
  useState(1);
  const [search, setSearch] =
  useState("");

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

    useEffect(() => {

  const today = new Date();

  transactions.forEach((transaction) => {

    if (
      !transaction.recurring ||
      !transaction.nextExecution
    )
      return;

    const nextDate =
      new Date(transaction.nextExecution);

    if (today >= nextDate) {

      const newTransaction = {
        ...transaction,
        id: Date.now() + Math.random(),
        date:
          new Date().toISOString(),
      };

      setTransactions((prev) => [
        ...prev,
        newTransaction,
      ]);

      const updatedTransactions =
        transactions.map((t) => {

          if (t.id !== transaction.id)
            return t;

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
  });

}, []);

  // ADD TRANSACTION
 function addTransaction() {
  if (
    !type ||
    !category ||
    !amount ||
    !accountId
  )
    return;

  // EDIT MODE
  if (editingTransaction) {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id ===
        editingTransaction.id
          ? {
              ...transaction,
              accountId,
              type,
              category:
                category.charAt(0).toUpperCase() +
                category.slice(1),
              amount: Number(amount),
            }
          : transaction
      )
    );

    setEditingTransaction(null);
  }

  // ADD MODE
  else {
  const newTransaction = {
  id: Date.now(),

  accountId,

  type,

  category:
    category.charAt(0).toUpperCase() +
    category.slice(1),

  amount: Number(amount),

  date:
    new Date().toISOString(),

  recurring,

  recurrence,

  nextExecution:
    new Date().toISOString(),
};

    setTransactions([
      ...transactions,
      newTransaction,
    ]);

    // UPDATE ACCOUNT BALANCE

    setAccounts(
      accounts.map((account) => {
        if (
          account.id !==
          Number(accountId)
        )
          return account;

        return {
          ...account,

          balance:
            type === "Income"
              ? account.balance +
                Number(amount)
              : account.balance -
                Number(amount),
        };
      })
    );
  }

  // RESET FORM

setType("");
setCategory("");
setAmount("");

setRecurring(false);
setRecurrence("monthly");

setAccountId(accounts[0]?.id || 1);
  
}
  // FILTER BY MONTH
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

  // MONTHS
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

  // TOTALS
  const totalIncome =
    filteredTransactions
      .filter((t) => t.type === "Income")
      .reduce(
        (sum, transaction) =>
          sum + transaction.amount,
        0
      );

  const totalExpenses =
    filteredTransactions
      .filter((t) => t.type === "Expense")
      .reduce(
        (sum, transaction) =>
          sum + transaction.amount,
        0
      );

  const balance =
    totalIncome - totalExpenses;

  // BAR CHART DATA
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

  // PIE CHART DATA
  const expenseCategories = {};

  filteredTransactions
    .filter((t) => t.type === "Expense")
    .forEach((transaction) => {
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
      ] += transaction.amount;
    });

  const pieData = Object.entries(
  expenseCategories
).map(([category, amount]) => ({
  name: t(category.toLowerCase()),
  value: amount,
}));

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
<h1>{t("transactions")}</h1>

{editingTransaction && (
  <div className="edit-banner">
    {t("editingTransaction")}
  </div>
)}

  {/* FORM */}
 <TransactionForm
  editingTransaction={editingTransaction}
  accounts={accounts}
  accountId={accountId}
  setAccountId={setAccountId}
  type={type}
  setType={setType}
  category={category}
  setCategory={setCategory}
  amount={amount}
  setAmount={setAmount}
  recurring={recurring}
  setRecurring={setRecurring}
  recurrence={recurrence}
  setRecurrence={setRecurrence}
  addTransaction={addTransaction}
  cancelEdit={() => {
    setEditingTransaction(null);
    setType("");
    setCategory("");
    setAmount("");
    setAccountId(accounts[0]?.id || 1);
  }}
/>

  {/* SEARCH + FILTER */}
  <SearchFilters
    search={search}
    setSearch={setSearch}
    filterType={filterType}
    setFilterType={setFilterType}
/>

  {/* MONTH */}
     <MonthSelector
    currentDate={currentDate}
    selectedMonth={selectedMonth}
    setSelectedMonth={setSelectedMonth}
/>

      {/* SUMMARY */}
      <TransactionSummary
    totalIncome={totalIncome}
    totalExpenses={totalExpenses}
    balance={balance}
/>

      {/* CHARTS */}
     <TransactionCharts
  summaryData={summaryData}
  pieData={pieData}
  totalIncome={totalIncome}
  totalExpenses={totalExpenses}
  COLORS={COLORS}
/>

      {/* TRANSACTIONS TABLE */}
      <TransactionTable
        filteredTransactions={filteredTransactions}
        accounts={accounts}
        transactions={transactions}
        setTransactions={setTransactions}
        setAccounts={setAccounts}
        setEditingTransaction={setEditingTransaction}
        setType={setType}
        setCategory={setCategory}
        setAmount={setAmount}
        setAccountId={setAccountId}
      />

      <BottomNav />
    </div>
  );
}

export default Transactions;