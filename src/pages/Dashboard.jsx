import BottomNav from "../components/BottomNav";
import Header from "../components/Header";
import { useFinance } from "../context/FinanceContext";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../Utils/currency";
import {
  HiOutlineChartBar,
  HiOutlineFlag,
  HiOutlineCreditCard,
  HiOutlineHeart,
  HiOutlineExclamationCircle,
  HiOutlineClock,
} from "react-icons/hi";

import { MdSavings } from "react-icons/md";
import AnalyticsCharts from "../components/AnalyticsCharts";
import { HiOutlineSparkles } from "react-icons/hi";





function Dashboard() {
  const { t, i18n } = useTranslation();
  const finance = useFinance();
  const { profile } = finance;

  // SAFE FALLBACKS
  const transactions = Array.isArray(
    finance?.transactions
  )
    ? finance.transactions
    : [];

  const budgets = Array.isArray(
    finance?.budgets
  )
    ? finance.budgets
    : [];

  const goals = Array.isArray(
    finance?.goals
  )
    ? finance.goals
    : [];

  const investments = Array.isArray(
    finance?.investments
  )
    ? finance.investments
    : [];

  // TOTALS
  const totalIncome = transactions.reduce(
    (sum, transaction) =>
      transaction?.type === "Income"
        ? sum +
          Number(
            transaction?.amount || 0
          )
        : sum,
    0
  );

  const totalExpenses =
    transactions.reduce(
      (sum, transaction) =>
        transaction?.type ===
        "Expense"
          ? sum +
            Number(
              transaction?.amount || 0
            )
          : sum,
      0
    );

  const balance =
    totalIncome - totalExpenses;

  // PORTFOLIO
  const portfolioValue =
    investments.reduce(
      (sum, investment) =>
        sum +
        Number(
          investment?.currentValue ||
            0
        ),
      0
    );

  // SAVINGS RATE
  const savingsRate =
    totalIncome > 0
      ? Math.round(
          (balance / totalIncome) *
            100
        )
      : 0;

 // FINANCIAL HEALTH

let healthScore = 100;

// Savings rate

if (savingsRate < 20)
  healthScore -= 20;

if (savingsRate < 10)
  healthScore -= 10;

// Negative balance

if (balance < 0)
  healthScore -= 30;

// No budgets

if (budgets.length === 0)
  healthScore -= 10;

// No goals

if (goals.length === 0)
  healthScore -= 10;

// No investments

if (investments.length === 0)
  healthScore -= 10;

// Too many expenses

if (
  totalExpenses > totalIncome &&
  totalIncome > 0
) {
  healthScore -= 20;
}

// Final limits

healthScore = Math.max(
  0,
  Math.min(100, healthScore)
);

// SCORE COLOR

const scoreColor =
  healthScore >= 85
    ? "#22c55e"
    : healthScore >= 65
    ? "#f59e0b"
    : "#ef4444";

// MESSAGE

let healthMessage = "";

if (healthScore >= 85) {
  healthMessage = t("excellentFinancialDiscipline");
} else if (healthScore >= 65) {
  healthMessage = t("goodProgress");
} else if (healthScore >= 40) {
  healthMessage = t("needsAttention");
} else {
  healthMessage = t("requiresImmediateAction");
}

// CALCULATIONS

const monthlyBudget =
  budgets.reduce(
    (sum, budget) =>
      sum + Number(budget.amount || 0),
    0
  );

const budgetUsed =
  monthlyBudget > 0
    ? Math.min(
        (totalExpenses / monthlyBudget) *
          100,
        100
      )
    : 0;

const goalsCompleted =
  goals.filter(
    (goal) =>
      Number(goal.saved) >=
      Number(goal.target)
  ).length;

const goalsProgress =
  goals.length
    ? (goalsCompleted / goals.length) *
      100
    : 0;

// INSIGHTS

const insights = [];

if (savingsRate >= 30) {
  insights.push(
    t("excellentSavingsRate")
  );
}

if (savingsRate < 10) {
  insights.push(
    t("lowSavingsRate")
  );
}

if (budgets.length === 0) {
  insights.push(
    t("noBudgetsCreated")
  );
}

if (goals.length === 0) {
  insights.push(
    t("noGoalsCreated")
  );
}

if (investments.length === 0) {
  insights.push(
    t("noInvestmentsCreated")
  );
}

if (
  totalExpenses >
  totalIncome * 0.8
) {
  insights.push(
    t("highExpenseRatio")
  );
}

if (insights.length === 0) {
  insights.push(
    t("financialHealthGood")
  );
}

  // RECENT TRANSACTIONS
  const recentTransactions = [
    ...transactions,
  ]
    .sort(
      (a, b) =>
        new Date(
          b?.date || 0
        ).getTime() -
        new Date(
          a?.date || 0
        ).getTime()
    )
    .slice(0, 5);

  // BUDGET WARNINGS
  const warnings = budgets.filter(
    (budget) => {
      const spent =
        transactions.reduce(
          (sum, transaction) => {
            if (
              transaction?.type ===
                "Expense" &&
              transaction?.category ===
                budget?.category
            ) {
              return (
                sum +
                Number(
                  transaction?.amount ||
                    0
                )
              );
            }

            return sum;
          },
          0
        );

      return (
        Number(budget?.limit || 0) >
          0 &&
        (spent /
          Number(
            budget?.limit || 1
          )) *
          100 >=
          70
      );
    }
  );

  return (
    <div className="dashboard">
      <Header />

      {/* PREMIUM STATS */}

<div className="premium-stats-grid">

  <div className="premium-stat-card">

    <div className="stat-label">
      {t("netWorth")}
    </div>

    <div className="stat-value">
    {formatCurrency(
  balance,
  profile.currency,
  i18n.language
)}
    </div>
  </div>

  <div className="premium-stat-card">

    <div className="stat-label">
      {t("income")}
    </div>

    <div className="stat-value income">
      {formatCurrency(
  totalIncome,
  profile.currency,
  i18n.language
)}
    </div>
  </div>

  <div className="premium-stat-card">

    <div className="stat-label">
      {t("expenses")}
    </div>

    <div className="stat-value expense">
     {formatCurrency(
  totalExpenses,
  profile.currency,
  i18n.language
)}
    </div>
  </div>

  <div className="premium-stat-card">

    <div className="stat-label">
      {t("savingsRate")}
    </div>

    <div className="stat-value">
      {savingsRate}%
    </div>
  </div>

</div>

<div className="overview-card">

  <h3>{t("monthlyOverview")}</h3>

  <div className="overview-item">
    <span>{t("budgetUsage")}</span>
    <span>{budgetUsed.toFixed(0)}%</span>
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{
        width: `${budgetUsed}%`,
      }}
    />
  </div>

  <div className="overview-item">
    <span>{t("goalsCompleted")}</span>
    <span>
      {goalsCompleted}/{goals.length}
    </span>
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill purple"
      style={{
        width: `${goalsProgress}%`,
      }}
    />
  </div>

  <div className="overview-item">
    <span>{t("investmentAllocation")}</span>
    <span>
      {investments.length}
    </span>
  </div>

</div>

      {/* HEALTH */}
      <div className="health-card">

<div className="card insights-card">
  <h2 className="dashboard-title">
  <HiOutlineSparkles />
  {t("insights")}
</h2>

  {insights.map(
    (insight, index) => (
      <div
        key={index}
        className="insight-item"
      >
        {insight}
      </div>
    )
  )}
</div>

       <h3 className="dashboard-title">
  <HiOutlineHeart />
  {t("financialHealth")}
</h3>

        <div
          className="score-circle"
          style={{
            background: scoreColor,
          }}
        >
          {healthScore}
        </div>

       <p className="health-message">
  {healthMessage}
</p>
      </div>

      {/* ANALYTICS */}
<AnalyticsCharts />

      {/* SUMMARY */}
      <div className="summary-grid">
        <div className="card">
          <h2 className="dashboard-title">
  <HiOutlineChartBar />
  {t("portfolio")}
</h2>

          <p className="amount income">
           {formatCurrency(
  portfolioValue,
  profile.currency,
  i18n.language
)}
          </p>

          <p className="card-subtitle">
            {investments.length} {t("assets")}
          </p>
        </div>

        <div className="card">
          <h2 className="dashboard-title">
  <HiOutlineCreditCard />
  {t("expenses")}
</h2>

          <p className="amount expense">
  {formatCurrency(
    totalExpenses,
    profile.currency,
    i18n.language
  )}
</p>
        </div>

        <div className="card">
          <h2 className="dashboard-title">
  <MdSavings />
  {t("budgets")}
</h2>

          <p className="amount">
            {budgets.length}
          </p>
        </div>

        <div className="card">
          <h2 className="dashboard-title">
  <HiOutlineFlag />
  {t("goals")}
</h2>

          <p className="amount">
            {goals.length}
          </p>
        </div>
      </div>

      {/* ALERTS */}
      <div className="card">
        <h2 className="dashboard-title">
  <HiOutlineExclamationCircle />
  {t("budgetAlerts")}
</h2>

        {warnings.length === 0 ? (
          <p>
            {t("noBudgetAlerts")}
          </p>
        ) : (
          warnings.map((warning) => {
            const spent =
              transactions.reduce(
                (
                  sum,
                  transaction
                ) => {
                  if (
                    transaction?.type ===
                      "Expense" &&
                    transaction?.category ===
                      warning.category
                  ) {
                    return (
                      sum +
                      Number(
                        transaction.amount ||
                          0
                      )
                    );
                  }

                  return sum;
                },
                0
              );

            const percentage =
              Math.round(
                (spent /
                  warning.limit) *
                  100
              );

            return (
              <p
                key={warning.id}
                className="expense"
              >
                ⚠ {t(warning.category.toLowerCase(), warning.category)}: {percentage}% {t("used")}
              </p>
            );
          })
        )}
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="card">
        <h2 className="dashboard-title">
  <HiOutlineClock />
  {t("recentTransactions")}
</h2>

        {recentTransactions.length ===
        0 ? (
          <p>
            {t("noRecentTransactions")}
            <br />
            {t("addFirstIncomeOrExpense")}
          </p>
        ) : (
          recentTransactions.map(
            (transaction) => (
              <div
                key={
                  transaction?.id
                }
                className="transaction-item"
              >
                <div>
                  <strong>
                    {
                      t(
  transaction.category.toLowerCase(),
  transaction.category
)
                    }
                  </strong>

                  <p className="transaction-date">
                    {transaction?.date
                      ? new Date(
                          transaction.date
                        ).toLocaleDateString(i18n.language)
                      : "No date"}
                  </p>
                </div>

                <div
                  className={
                    transaction?.type ===
                    "Income"
                      ? "income"
                      : "expense"
                  }
                >
                  {transaction?.type === "Income"
  ? "+"
  : "-"}

{formatCurrency(
  Number(transaction?.amount || 0),
  profile.currency,
  i18n.language
)}
                </div>
              </div>
            )
          )
        )}
      </div>

      {/* GOALS */}
      <div className="card">
        <h2 className="dashboard-title">
  <HiOutlineFlag />
  {t("goalsOverview")}
</h2>
        {goals.length === 0 ? (
          <p>
            {t("noGoalsYet")}
            <br />
            {t("createYourFirstFinancialGoal")}
          </p>
        ) : (
          goals
            .slice(0, 3)
            .map((goal) => {
              const progress =
                Math.min(
                  (goal.currentSavings /
                    goal.amount) *
                    100,
                  100
                );

              return (
                <div key={goal.id}>
                  <div className="allocation-row">
                    <span>
                      {goal.name}
                    </span>

                    <span>
                      {Math.round(
                        progress
                      )}
                      %
                    </span>
                  </div>

                  <div className="dashboard-progress-bar">
                    <div
                      className="dashboard-progress-fill"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default Dashboard;
