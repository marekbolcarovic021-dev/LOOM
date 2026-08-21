import { InsightTypes } from "../../constants/insightTypes";

import {
  getCurrentMonthTransactions,
  getPreviousMonthTransactions,
  sumExpenses,
  percentChange,
  createInsightId,
} from "../insightHelpers";

export function analyzeSpending({
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

  const currentSpent =
    sumExpenses(current);

  const previousSpent =
    sumExpenses(previous);

  if (previousSpent <= 0) {
    return insights;
  }

  const change =
    percentChange(
      previousSpent,
      currentSpent
    );

  const now = new Date();

  const month =
    now.getMonth() + 1;

  const year =
    now.getFullYear();

  if (change >= 20) {
    insights.push({
      id: createInsightId({
        type:
          InsightTypes.MONTH_SPENDING_UP,
        year,
        month,
      }),

      type:
        InsightTypes.MONTH_SPENDING_UP,

      priority: "warning",

      titleKey:
        "spendingUpTitle",

      bodyKey:
        "spendingUpBody",

      values: {
        percent:
          Math.round(change),

        current:
          currentSpent,

        previous:
          previousSpent,
      },
    });
  }

  if (change <= -20) {
    insights.push({
      id: createInsightId({
        type:
          InsightTypes.MONTH_SPENDING_DOWN,
        year,
        month,
      }),

      type:
        InsightTypes.MONTH_SPENDING_DOWN,

      priority: "success",

      titleKey:
        "spendingDownTitle",

      bodyKey:
        "spendingDownBody",

      values: {
        percent:
          Math.abs(
            Math.round(change)
          ),

        current:
          currentSpent,

        previous:
          previousSpent,
      },
    });
  }

  return insights;
}