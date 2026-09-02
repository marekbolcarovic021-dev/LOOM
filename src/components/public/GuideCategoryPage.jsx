import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import GuideLayout from "./GuideLayout";
import GuideCard from "./GuideCard";

function GuideCategoryPage({
  icon,
  title,
  description,
  articles = [],
}) {
  const { t } = useTranslation();

  return (
    <GuideLayout
      icon={icon}
      title={title}
      description={description}
    >

      {/* ==================================================
          ARTICLES
      ================================================== */}

      {articles.length > 0 && (

        <section className="guide-articles-section">

          <div className="guide-articles-heading">

            <h2>
              {t("guides", {
  defaultValue: "Guides",
})}
            </h2>

            <p>
              {t("exploreGuidesForTopic", {
  defaultValue:
    "Explore practical information related to this topic.",
})}
            </p>

          </div>


          <div className="guide-article-grid">

            {articles.map((article) => (

              <GuideCard
                key={article.id}
                to={article.path}
                icon={article.icon || "→"}
                title={article.title}
                description={article.description}
              />

            ))}

          </div>

        </section>

      )}


      {/* ==================================================
          EMPTY STATE
      ================================================== */}

      {articles.length === 0 && (

        <section className="guide-empty-state">

          <div className="guide-empty-icon">
            +
          </div>

          <h2>
            {t("moreGuidesComingSoon") ||
              "More guides coming soon"}
          </h2>

          <p>
            {t("guidesBeingPrepared") ||
              "We're preparing practical, detailed guides for this topic."}
          </p>

          <Link
            to="/guides"
            className="public-secondary-button"
          >
            {t("backToFinancialGuides") ||
              "Back to Financial Guides"}
          </Link>

        </section>

      )}

    </GuideLayout>
  );
}

export default GuideCategoryPage;