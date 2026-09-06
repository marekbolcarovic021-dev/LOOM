import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import AdSenseAnchor from "../AdSenseAnchor";

import "../../styles/public/PublicLayout.css";
import "../../styles/articles/ArticleLayout.css";
import "../../styles/articles/ArticleContent.css";

function GuideLayout({
  icon,
  title,
  description,
  category,
  categoryPath = "/guides",
  children,
}) {

  const { t } = useTranslation();

const handlePrivacySettings = () => {
  if (
    window.googlefc &&
    window.googlefc.callbackQueue &&
    typeof window.googlefc.showRevocationMessage === "function"
  ) {
    window.googlefc.callbackQueue.push(
      window.googlefc.showRevocationMessage
    );
  }
};

  return (
    <div className="public-page article-page">

      {/* ==================================================
          ADSENSE
          Only guide/article pages use GuideLayout.
          Legal pages do not load the AdSense tag.
      ================================================== */}

      <AdSenseAnchor enabled={true} />

      <PublicHeader />

      <main className="article-main">

        {/* ==================================================
            ARTICLE HERO
        ================================================== */}

        <section className="article-hero">

          <Link
            to={categoryPath}
            className="article-back-link"
          >
            <span aria-hidden="true">←</span>

            {t("backToFinancialGuides", {
              defaultValue: "Financial Guides",
            })}
          </Link>

          <span className="article-category">
            {icon} {category}
          </span>

          <h1 className="article-title">
            {title}
          </h1>

          {description && (
            <p className="article-intro">
              {description}
            </p>
          )}

        </section>


        {/* ==================================================
            ARTICLE CONTENT
        ================================================== */}

        <div className="article-content-wrapper">

          <article className="article-content">
            {children}
          </article>

        </div>


        {/* ==================================================
            ARTICLE FOOTER
        ================================================== */}

        <div className="article-footer">

          <Link
            to={categoryPath}
            className="public-secondary-button"
          >
            <span aria-hidden="true">←</span>

            {t("backToCategory", {
              defaultValue: "Back to {{category}}",
              category: category || "Financial Guides",
            })}
          </Link>

          <button
            type="button"
            className="public-secondary-button"
            onClick={handlePrivacySettings}
          >
            Privacy and cookie settings
          </button>

        </div>

      </main>

      <PublicFooter />

    </div>
  );
}

export default GuideLayout;