import { InsightTypes } from "../../constants/insightTypes";
import { createInsightId } from "../insightHelpers";

export function analyzeInvestments({
  investments,
  now,
}) {
  const insights = [];

  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  if (!investments.length) {
    return insights;
  }

  const total = investments.reduce(
    (sum, investment) =>
      sum +
      Number(
        investment.currentValue ??
          investment.value ??
          0
      ),
    0
  );

  let largest = null;

  for (const investment of investments) {
    const value = Number(
      investment.currentValue ??
        investment.value ??
        0
    );

    if (
      !largest ||
      value >
        Number(
          largest.currentValue ??
            largest.value ??
            0
        )
    ) {
      largest = investment;
    }
  }

  if (!largest) {
    return insights;
  }

  const largestValue = Number(
    largest.currentValue ??
      largest.value ??
      0
  );

  const share =
    largestValue / total;

  if (share >= 0.7) {
    insights.push({
      id: createInsightId({
        type:
          InsightTypes.PORTFOLIO_CONCENTRATED,
        month,
        year,
      }),

      type:
        InsightTypes.PORTFOLIO_CONCENTRATED,

      priority: "warning",

      titleKey:
        "portfolioConcentratedTitle",

      bodyKey:
        "portfolioConcentratedBody",

      values: {
        investment:
          largest.name,

        percent:
          Math.round(
            share * 100
          ),
      },
    });
  }

  return insights;
}
