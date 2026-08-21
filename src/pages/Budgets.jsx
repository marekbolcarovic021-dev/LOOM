import { useState } from "react";
import { useTranslation } from "react-i18next";

import BottomNav from "../components/BottomNav";
import { useFinance } from "../context/FinanceContext";
import { formatCurrency } from "../utils/currency";

import MonthSelector from "../components/transactions/MonthSelector";

import {
  Utensils,
  Car,
  Tv,
  Receipt,
  ShoppingBag,
  HeartPulse,
  Landmark,
  Package,
  Trash2,
} from "lucide-react";

function Budgets() {
  const { t, i18n } = useTranslation();
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
const [selectedMonth, setSelectedMonth] =
  useState(
    new Date()
      .toISOString()
      .slice(0, 7)
  );

  const currentDate = new Date(
  selectedMonth + "-01"
);

  const finance = useFinance();
  const { profile } = finance;

  const budgets = finance?.budgets || [];
  const setBudgets = finance?.setBudgets;
  const transactions =
    finance?.transactions || [];

  const categoryIcons = {
  Food: <Utensils size={34} />,
  Transport: <Car size={34} />,
  Entertainment: <Tv size={34} />,
  Bills: <Receipt size={34} />,
  Shopping: <ShoppingBag size={34} />,
  Health: <HeartPulse size={34} />,
  Taxes: <Landmark size={34} />,
  Other: <Package size={34} />,
};

  // CALCULATE SPENT
function getSpent(category) {
  return transactions
    .filter((transaction) => {
      const transactionMonth =
        transaction.date.slice(0, 7);

      return (
        transaction.type === "Expense" &&
        transaction.category === category &&
        transactionMonth === selectedMonth
      );
    })
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount || 0),
      0
    );
}

  // SORT BUDGETS
  const sortedBudgets = [
    ...budgets,
  ].sort((a, b) => {
    const spentA = getSpent(
      a.category
    );

    const spentB = getSpent(
      b.category
    );

    const usageA =
      a.limit > 0
        ? spentA / a.limit
        : 0;

    const usageB =
      b.limit > 0
        ? spentB / b.limit
        : 0;

    return usageB - usageA;
  });

  // SUMMARY
  const totalBudgeted =
    budgets.reduce(
      (sum, budget) =>
        sum + budget.limit,
      0
    );

  const totalSpent =
    budgets.reduce(
      (sum, budget) =>
        sum +
        getSpent(
          budget.category
        ),
      0
    );

    const totalUsage =
  totalBudgeted > 0
    ? Math.round(
        (totalSpent / totalBudgeted) * 100
      )
    : 0;

const selectedDate = new Date(
  selectedMonth + "-01"
);

const lastDay = new Date(
  selectedDate.getFullYear(),
  selectedDate.getMonth() + 1,
  0
);

const current = new Date();

let daysLeft;

if (
  current.getFullYear() ===
    selectedDate.getFullYear() &&
  current.getMonth() ===
    selectedDate.getMonth()
) {
  daysLeft =
    lastDay.getDate() -
    current.getDate();
} else {
  daysLeft = lastDay.getDate();
}

  // ADD BUDGET
  function addBudget() {
    if (
      !category ||
      !limit ||
      Number(limit) <= 0
    )
      return;

    const exists = budgets.some(
      (budget) =>
        budget.category === category
    );

    if (exists) {
     alert(
  t("budgetAlreadyExists")
);
      return;
    }

    const newBudget = {
      id: Date.now(),
      category,
      limit: Number(limit),
    };

    setBudgets([
      ...budgets,
      newBudget,
    ]);

    setCategory("");
    setLimit("");
  }

  // DELETE BUDGET
 function deleteBudget(id) {
  if (
    window.confirm(
  t("deleteBudgetQuestion")
)
  ) {
    setBudgets(
      budgets.filter(
        budget => budget.id !== id
      )
    );
  }
}

  return (
    <div className="goals-page">
      <h1>{t("budgets")}</h1>

      <p
        style={{
          textAlign: "center",
          opacity: 0.6,
          marginBottom: "20px",
        }}
      >
        {t("sortedByUsage")}
      </p>

      {/* FORM */}
      <div className="goal-form">
        <select
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
>
  <option value="">
    {t("selectCategory")}
  </option>

  <option value="Food">
    {t("food")}
  </option>

  <option value="Transport">
    {t("transport")}
  </option>

  <option value="Bills">
    {t("bills")}
  </option>

  <option value="Entertainment">
    {t("entertainment")}
  </option>

  <option value="Shopping">
    {t("shopping")}
  </option>

  <option value="Health">
    {t("health")}
  </option>

  <option value="Taxes">
    {t("taxes")}
  </option>

  <option value="Other">
    {t("other")}
  </option>
</select>

        <input
          type="number"
          placeholder={t("monthlyLimit")}
          value={limit}
          onChange={(e) =>
            setLimit(
              e.target.value
            )
          }
        />

        <button onClick={addBudget}>
          {t("addBudget")}
        </button>
      </div>

      {/* SUMMARY */}
      <div className="summary-grid">
        <div className="card">
          <h2>{t("totalBudgets")}</h2>

          <div className="amount">
            {budgets.length}
          </div>
        </div>

        <div className="card">
          <h2>
            {t("totalBudgeted")}
          </h2>

          <div className="income amount">
            {formatCurrency(
  totalBudgeted,
  profile.currency,
  i18n.language
)}
          </div>
        </div>

        <div className="card">
          <h2>{t("totalSpent")}</h2>

          <div className="expense amount">
            {formatCurrency(
  totalSpent,
  profile.currency,
  i18n.language
)}
          </div>
        </div>
      </div>

      {/* EMPTY */}
      {budgets.length === 0 && (
        <div className="card">
          <p
            style={{
              textAlign: "center",
              padding: "30px",
            }}
          >
            {t("noBudgetsYet")}
<br />
{t("createFirstBudget")}
          </p>
        </div>
      )}

<MonthSelector
    currentDate={
        new Date(selectedMonth + "-01")
    }
    selectedMonth={selectedMonth}
    setSelectedMonth={setSelectedMonth}
/>

      <div className="budget-overview-card">

  <h2>{t("monthlyOverview")}</h2>

  <div className="budget-overview-row">
  <span>{t("totalBudgeted")}</span>
  <span>{formatCurrency(
  totalBudgeted,
  profile.currency,
  i18n.language
)}</span>
</div>

<div className="budget-overview-row">
  <span>{t("totalSpent")}</span>
  <span>{formatCurrency(
  totalSpent,
  profile.currency,
  i18n.language
)}</span>
</div>

<div className="budget-overview-row">
  <span>{t("usage")}</span>
  <span>{totalUsage}%</span>
</div>

  <div className="budget-progress">
    <div
      className="budget-progress-fill"
      style={{
        width: `${totalUsage}%`,
        background:
          totalUsage >= 100
            ? "#ef4444"
            : totalUsage >= 70
            ? "#f59e0b"
            : "#22c55e",
      }}
    />
  </div>

  <p className="budget-days-left">
    {daysLeft} {t("daysRemaining")}
  </p>

</div>

      {/* CARDS */}
      <div className="budgets-grid">
        {sortedBudgets.map(
          (budget) => {
           const spent = getSpent(
  budget.category
);

const remaining =
  budget.limit - spent;

const percentage =
  budget.limit > 0
    ? Math.min(
        (spent / budget.limit) * 100,
        100
      )
    : 0;

            return (
              <div
  className="budget-modern-card"
  key={budget.id}
  style={{
    border:
      percentage >= 100
        ? "2px solid #ef4444"
        : percentage >= 70
        ? "2px solid #f59e0b"
        : "2px solid rgba(255,255,255,.05)",
  }}
>
                <div className="budget-card-header">
                  <div className="budget-icon">
                    {categoryIcons[
                      budget.category
                    ] ||
                      <Package size={34} />}
                  </div>

                  <div>
                    <h2>
  {t(
    budget.category.toLowerCase(),
    budget.category
  )}
</h2>

                    <p className="budget-limit">
  {t("budget")}{" "}
  {formatCurrency(
    budget.limit,
    profile.currency,
    i18n.language
  )}
</p>
                  </div>
                </div>

                <div className="budget-info-row">
                  <span>
                    {t("spent")}
                  </span>

                  <span className="expense">
                    {formatCurrency(
  spent,
  profile.currency,
  i18n.language
)}
                  </span>
                </div>

                <div className="budget-info-row">
                  <span>
                    {t("remaining")}
                  </span>

                  <span
                    className={
                      remaining >= 0
                        ? "income"
                        : "expense"
                    }
                  >
                    {formatCurrency(
                      remaining,
                      profile.currency,
                      i18n.language
                    )}
                  </span>
                </div>

                <div className="budget-progress">
                  <div
                    className="budget-progress-fill"
                    style={{
                      width: `${percentage}%`,

                      background:
                        percentage >=
                        100
                          ? "#ef4444"
                          : percentage >=
                            70
                          ? "#f59e0b"
                          : "#22c55e",
                    }}
                  />
                </div>

                <div className="budget-progress-text">
  {percentage.toFixed(0)}% {t("used")}
</div>

<p className="budget-days-left">
  {daysLeft} {t("daysLeft")}
</p>

{percentage >= 70 &&
 percentage < 100 && (
  <div className="budget-badge warning">
    {t("warning")}
  </div>
)}

{percentage >= 100 && (
  <div className="budget-badge danger">
   {t("overBudget")}
  </div>
)}

                {spent >
                  budget.limit && (
                  <div className="budget-warning">
                    {t("budgetExceeded")}
                    {formatCurrency(
                      spent - budget.limit,
                      profile.currency,
                      i18n.language
                    )}
                  </div>
                )}

                <button
                  className="budget-delete-btn"
                  onClick={() =>
                    deleteBudget(
                      budget.id
                    )
                  }
                >
                  <Trash2 size={18} />
                  {t("deleteBudget")}
                </button>
              </div>
            );
          }
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default Budgets;