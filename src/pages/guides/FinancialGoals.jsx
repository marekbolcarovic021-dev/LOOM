import { useTranslation } from "react-i18next";
import GuideCategoryPage from "../../components/public/GuideCategoryPage";

function FinancialGoals() {
  const { t } = useTranslation();

  return (
    <GuideCategoryPage
      icon="◎"
      title={
        t("financialGoals") ||
        "Financial Goals"
      }
      description={
        t("financialGoalsGuideDescription") ||
        "Learn how to define realistic financial goals and create a plan to achieve them."
      }
      articles={[]}
    />
  );
}

export default FinancialGoals;