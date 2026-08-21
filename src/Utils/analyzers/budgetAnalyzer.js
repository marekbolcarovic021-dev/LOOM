import { InsightTypes } from "../../constants/insightTypes";

import {
  createInsightId,
  getCurrentMonthTransactions,
  sumCategoryExpenses,
  calculateBudgetUsage,
  remainingBudget,
} from "../insightHelpers";

export function analyzeBudgets({
  budgets,
  transactions,
}) {
  const insights = [];

  const currentMonth =
    getCurrentMonthTransactions(
      transactions
    );

  const now = new Date();

  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  for (const budget of budgets) {
    const spent =
      sumCategoryExpenses(
        currentMonth,
        budget.category
      );

    const usage =
      calculateBudgetUsage(
        spent,
        budget.amount
      );

    const remaining =
      remainingBudget(
        spent,
        budget.amount
      );

    if (usage >= 1) {
      insights.push({
        id: createInsightId({
          type:
            InsightTypes.BUDGET_EXCEEDED,
          category:
            budget.category,
          month,
          year,
        }),

        type:
          InsightTypes.BUDGET_EXCEEDED,

        priority: "danger",

        titleKey:
          "budgetExceededTitle",

        bodyKey:
          "budgetExceededBody",

        values: {
          category:
            budget.category,

          spent,

          budget:
            budget.amount,

          remaining,
        },
         entity: {
        type: "budget",
        id: budget.id,
    },
      });

      continue;
    }

    if (usage >= 0.9) {
      insights.push({
        id: createInsightId({
          type:
            InsightTypes.BUDGET_90,
          category:
            budget.category,
          month,
          year,
        }),

        type:
          InsightTypes.BUDGET_90,

        priority: "warning",

        titleKey:
          "budget90Title",

        bodyKey:
          "budget90Body",

        values: {
          category:
            budget.category,

          remaining,
        },
         entity: {
        type: "budget",
        id: budget.id,
    },
      });

      continue;
    }

    if (usage >= 0.8) {
      insights.push({
        id: createInsightId({
          type:
            InsightTypes.BUDGET_80,
          category:
            budget.category,
          month,
          year,
        }),

        type:
          InsightTypes.BUDGET_80,

        priority: "info",

        titleKey:
          "budget80Title",

        bodyKey:
          "budget80Body",

        values: {
          category:
            budget.category,

          remaining,
        },
         entity: {
        type: "budget",
        id: budget.id,
    },
      });
    }
  }

  return insights;
}