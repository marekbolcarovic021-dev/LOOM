import { useTranslation } from "react-i18next";

import GuideCategoryPage from "../../components/public/GuideCategoryPage";

function Debt() {

  const { t } = useTranslation();

  const articles = [
    {
      id: "understanding-debt",
      path: "/guides/debt/understanding-debt",
      icon: "−",
      title: t("understandingDebtTitle", {
        defaultValue: "Understanding and Managing Debt",
      }),
      description: t("understandingDebtIntro", {
        defaultValue:
          "A simple guide to understanding what you owe, what it costs and how to approach repayment.",
      }),
    },
  ];

  return (
    <GuideCategoryPage

      icon="−"

      title={t("debt", {
        defaultValue: "Debt",
      })}

      description={t("debtGuideDescription", {
        defaultValue:
          "Understand different types of debt and practical approaches to managing repayment.",
      })}

      articles={articles}

    />
  );
}

export default Debt;