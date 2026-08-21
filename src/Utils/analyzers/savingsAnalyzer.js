import { InsightTypes } from "../../constants/insightTypes";

import {
  getCurrentMonthTransactions,
  getPreviousMonthTransactions,
  sumIncome,
  sumExpenses,
  percentChange,
  createInsightId,
} from "../insightHelpers";

export function analyzeSavings({
  transactions,
}) {
  const insights = [];

  const current =
    getCurrentMonthTransactions(
      transactions
    );

  const previous =
    getPreviousMonthTransactions(
      transactions
    );

  const currentSavings =
    sumIncome(current) -
    sumExpenses(current);

  const previousSavings =
    sumIncome(previous) -
    sumExpenses(previous);

  if (previousSavings <= 0) {
    return insights;
  }

  const change = percentChange(
    previousSavings,
    currentSavings
  );

  const now = new Date();

  const month =
    now.getMonth() + 1;

  const year =
    now.getFullYear();

  if (change >= 20) {
    insights.push({
      id: createInsightId({
        type: InsightTypes.SAVINGS_UP,
        year,
        month,
      }),

      type: InsightTypes.SAVINGS_UP,

      priority: "success",

      titleKey: "savingsUpTitle",

      bodyKey: "savingsUpBody",

      values: {
        percent: Math.round(change),
        current: currentSavings,
        previous: previousSavings,
      },
    });
  }

  if (change <= -20) {
    insights.push({
      id: createInsightId({
        type: InsightTypes.SAVINGS_DOWN,
        year,
        month,
      }),

      type: InsightTypes.SAVINGS_DOWN,

      priority: "warning",

      titleKey: "savingsDownTitle",

      bodyKey: "savingsDownBody",

      values: {
        percent: Math.abs(
          Math.round(change)
        ),
        current: currentSavings,
        previous: previousSavings,
      },
    });
  }

  return insights;
}