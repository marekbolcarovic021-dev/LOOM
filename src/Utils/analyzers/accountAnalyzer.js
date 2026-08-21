import { InsightTypes } from "../../constants/insightTypes";
import { createInsightId } from "../insightHelpers";

export function analyzeAccounts({
  accounts,
  now,
}) {
  const insights = [];

  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  for (const account of accounts) {
    const balance = Number(account.balance || 0);

    if (balance < 0) {
      insights.push({
        id: createInsightId({
          type: InsightTypes.ACCOUNT_NEGATIVE,
          extra: account.id,
          month,
          year,
        }),

        type: InsightTypes.ACCOUNT_NEGATIVE,

        priority: "danger",

        titleKey: "negativeBalanceTitle",

        bodyKey: "negativeBalanceBody",

        values: {
          account: account.name,
          balance,
        },
      });

      continue;
    }

    if (balance <= 100) {
      insights.push({
        id: createInsightId({
          type: InsightTypes.ACCOUNT_LOW,
          extra: account.id,
          month,
          year,
        }),

        type: InsightTypes.ACCOUNT_LOW,

        priority: "warning",

        titleKey: "lowBalanceTitle",

        bodyKey: "lowBalanceBody",

        values: {
          account: account.name,
          balance,
        },

        entity: {
    type: "account",
    id: account.id,
}
      });
    }
  }

  return insights;
}