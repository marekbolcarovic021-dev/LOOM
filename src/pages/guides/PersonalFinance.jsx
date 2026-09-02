import { useTranslation } from "react-i18next";

import GuideCategoryPage from "../../components/public/GuideCategoryPage";

function PersonalFinance() {

  const { t } = useTranslation();

  const articles = [
    {
      id: "understanding-your-finances",
      path: "/guides/personal-finance/understanding-your-finances",
      icon: "◇",
      title: t("understandingYourFinancesTitle", {
        defaultValue: "Understanding Your Financial Situation",
      }),
      description: t("understandingYourFinancesIntro", {
        defaultValue:
          "A simple way to look at your income, spending, savings, assets and debts as one financial picture.",
      }),
    },
  ];

  return (
    <GuideCategoryPage

      icon="◇"

      title={t("personalFinance", {
        defaultValue: "Personal Finance",
      })}

      description={t("personalFinanceGuideDescription", {
        defaultValue:
          "Explore the fundamentals of managing your overall financial situation.",
      })}

      articles={articles}

    />
  );
}

export default PersonalFinance;