import { analyzeBudgets } from "./analyzers/budgetAnalyzer";
import { analyzeGoals } from "./analyzers/goalAnalyzer";
import { analyzeSpending } from "./analyzers/spendingAnalyzer";
import { analyzeSavings } from "./analyzers/savingsAnalyzer";
import { analyzeAccounts } from "./analyzers/accountAnalyzer";
import { analyzeInvestments } from "./analyzers/investmentAnalyzer";

export function runInsights({
  budgets,
  transactions,
  goals,
  accounts,
  now,
}) {
  return [
    ...analyzeBudgets({
      budgets,
      transactions,
      now,
    }),

    ...analyzeGoals({
      goals,
      now,
    }),

    ...analyzeSpending({
      transactions,
      now,
    }),

    ...analyzeSavings({
      transactions,
      now,
    }),

    ...analyzeAccounts({
      accounts,
      now,
    }),

    ...analyzeInvestments({
        investments,
        now,
    }),
  ];
}