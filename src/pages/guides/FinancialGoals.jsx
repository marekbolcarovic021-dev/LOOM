import { useTranslation } from "react-i18next";

import GuideCategoryPage from "../../components/public/GuideCategoryPage";

function FinancialGoals() {

  const { t } = useTranslation();

  const articles = [
    {
      id: "setting-financial-goals",
      path: "/guides/financial-goals/setting-financial-goals",
      icon: "◎",
      title: t("settingFinancialGoalsTitle", {
        defaultValue: "How to Set a Financial Goal",
      }),
      description: t("settingFinancialGoalsIntro", {
        defaultValue:
          "Turn a general idea such as 'I want to save more' into a clear financial goal you can actually track.",
      }),
    },
  ];

  return (
    <GuideCategoryPage

      icon="◎"

      title={t("financialGoals", {
        defaultValue: "Financial Goals",
      })}

      description={t("financialGoalsGuideDescription", {
        defaultValue:
          "Learn how to define realistic financial goals and create a plan to achieve them.",
      })}

      articles={articles}

    />
  );
}

export default FinancialGoals;