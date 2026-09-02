import { useTranslation } from "react-i18next";

import GuideCategoryPage from "../../components/public/GuideCategoryPage";

function Saving() {

  const { t } = useTranslation();

  const articles = [
    {
      id: "starting-to-save",
      path: "/guides/saving/starting-to-save",
      icon: "◈",
      title: t("startingToSaveTitle", {
        defaultValue: "How to Start Saving Money",
      }),
      description: t("startingToSaveIntro", {
        defaultValue:
          "A simple approach to building savings without making your monthly budget unnecessarily complicated.",
      }),
    },
  ];

  return (
    <GuideCategoryPage

      icon="◈"

      title={t("saving", {
        defaultValue: "Saving",
      })}

      description={t("savingGuideDescription", {
        defaultValue:
          "Learn how to build savings, prepare for unexpected expenses and develop sustainable saving habits.",
      })}

      articles={articles}

    />
  );
}

export default Saving;