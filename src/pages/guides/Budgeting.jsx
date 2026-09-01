import { useTranslation } from "react-i18next";
import GuideCategoryPage from "../../components/public/GuideCategoryPage";

function Budgeting() {
  const { t } = useTranslation();

  return (
    <GuideCategoryPage
      icon="▣"
      title={t("budgeting") || "Budgeting"}
      description={
        t("budgetingGuideDescription") ||
        "Learn how to organize your income, understand your spending and build a realistic budget."
      }
      articles={[]}
    />
  );
}

export default Budgeting;