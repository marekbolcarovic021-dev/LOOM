export function createInsightId({
  type,
  category = "",
  goalId = "",
  investmentId = "",
  year,
  month,
  extra = "",
}) {
  return [
    type,
    category,
    goalId,
    investmentId,
    year,
    month,
    extra,
  ]
    .filter(Boolean)
    .join("-");
}

export function getCurrentMonthTransactions(
  transactions
) {
  const now = new Date();

  return transactions.filter((t) => {
    const date = new Date(t.date);

    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });
}

export function getPreviousMonthTransactions(
  transactions
) {
  const now = new Date();

  const previous = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  return transactions.filter((t) => {
    const date = new Date(t.date);

    return (
      date.getMonth() === previous.getMonth() &&
      date.getFullYear() === previous.getFullYear()
    );
  });
}

export function sumExpenses(
  transactions
) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (sum, t) =>
        sum + Number(t.amount || 0),
      0
    );
}

export function sumIncome(
  transactions
) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce(
      (sum, t) =>
        sum + Number(t.amount || 0),
      0
    );
}

export function sumCategoryExpenses(
  transactions,
  category
) {
  return transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        t.category === category
    )
    .reduce(
      (sum, t) =>
        sum + Number(t.amount || 0),
      0
    );
}

export function calculateBudgetUsage(
  spent,
  limit
) {
  if (!limit || limit <= 0) return 0;

  return spent / limit;
}

export function calculateGoalProgress(
  current,
  target
) {
  if (!target || target <= 0) return 0;

  return current / target;
}

export function percentChange(
  previous,
  current
) {
  if (previous === 0) return 0;

  return (
    ((current - previous) /
      previous) *
    100
  );
}

export function roundPercent(
  value
) {
  return Math.round(value * 100);
}

export function remainingBudget(
  spent,
  budget
) {
  return Math.max(
    0,
    budget - spent
  );
}

export function remainingGoal(
  current,
  target
) {
  return Math.max(
    0,
    target - current
  );
}
