import { useTranslation } from "react-i18next";
import GuideCategoryPage from "../../components/public/GuideCategoryPage";

function Saving() {
  const { t } = useTranslation();

  return (
    <GuideCategoryPage
      icon="◈"
      title={t("saving") || "Saving"}
      description={
        t("savingGuideDescription") ||
        "Learn how to build savings, prepare for unexpected expenses and develop sustainable saving habits."
      }
      articles={[]}
    />
  );
}

export default Saving;