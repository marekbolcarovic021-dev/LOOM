import { useTranslation } from "react-i18next";
import GuideCategoryPage from "../../components/public/GuideCategoryPage";

function Investing() {
  const { t } = useTranslation();

  return (
    <GuideCategoryPage
      icon="↗"
      title={t("investing") || "Investing"}
      description={
        t("investingGuideDescription") ||
        "Understand the fundamentals of investing, risk, diversification and long-term investing."
      }
      articles={[]}
    />
  );
}

export default Investing;