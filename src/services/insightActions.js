export function getInsightAction(entity, t) {
  if (!entity) return null;

  switch (entity.type) {
    case "budget":
      return {
        label: t("openBudget"),
        route: `/budgets/${entity.id}`,
      };

    case "goal":
      return {
        label: t("viewGoal"),
        route: `/goals/${entity.id}`,
      };

    case "account":
      return {
        label: t("openAccount"),
        route: `/accounts/${entity.id}`,
      };

    case "investment":
      return {
        label: t("viewInvestment"),
        route: `/investments/${entity.id}`,
      };

    default:
      return null;
  }
}
