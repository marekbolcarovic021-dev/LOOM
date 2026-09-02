import { useTranslation } from "react-i18next";

import GuideCategoryPage from "../../components/public/GuideCategoryPage";

function Investing() {

  const { t } = useTranslation();

  const articles = [
    {
      id: "investing-for-beginners",
      path: "/guides/investing/investing-for-beginners",
      icon: "↗",
      title: t("investingForBeginnersTitle", {
        defaultValue: "Investing for Beginners",
      }),
      description: t("investingForBeginnersIntro", {
        defaultValue:
          "The basic ideas you should understand before putting money into investments.",
      }),
    },
  ];

  return (
    <GuideCategoryPage

      icon="↗"

      title={t("investing", {
        defaultValue: "Investing",
      })}

      description={t("investingGuideDescription", {
        defaultValue:
          "Understand the fundamentals of investing, risk, diversification and long-term investing.",
      })}

      articles={articles}

    />
  );
}

export default Investing;