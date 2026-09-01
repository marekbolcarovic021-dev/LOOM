import { useTranslation } from "react-i18next";
import GuideCategoryPage from "../../components/public/GuideCategoryPage";

function Debt() {
  const { t } = useTranslation();

  return (
    <GuideCategoryPage
      icon="−"
      title={t("debt") || "Debt"}
      description={
        t("debtGuideDescription") ||
        "Understand different types of debt and practical approaches to managing repayment."
      }
      articles={[]}
    />
  );
}

export default Debt;