import { useTranslation } from "react-i18next";

import GuideCategoryPage from "../../components/public/GuideCategoryPage";

function Budgeting() {
  const { t } = useTranslation();

  const articles = [
    {
      id: "how-to-create-a-budget",
      path: "/guides/budgeting/how-to-create-a-budget",
      icon: "▣",
      title: t("howToCreateABudgetTitle", {
        defaultValue: "How to Create a Budget",
      }),
      description: t("howToCreateABudgetIntro", {
        defaultValue:
          "A simple way to organize your income and expenses and build a budget you can actually follow.",
      }),
    },
  ];

  return (
    <GuideCategoryPage
      icon="▣"
      title={t("budgeting", {
        defaultValue: "Budgeting",
      })}
      description={t("budgetingGuideDescription", {
        defaultValue:
          "Learn how to organize your income, understand your spending and build a realistic budget.",
      })}
      articles={articles}
    />
  );
}

export default Budgeting;