import { useTranslation } from "react-i18next";
import GuideCategoryPage from "../../components/public/GuideCategoryPage";

function PersonalFinance() {
  const { t } = useTranslation();

  return (
    <GuideCategoryPage
      icon="◇"
      title={
        t("personalFinance") ||
        "Personal Finance"
      }
      description={
        t("personalFinanceGuideDescription") ||
        "Explore the fundamentals of managing your overall financial situation."
      }
      articles={[]}
    />
  );
}

export default PersonalFinance;