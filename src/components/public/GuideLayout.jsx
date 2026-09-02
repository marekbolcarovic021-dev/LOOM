import { Link } from "react-router-dom";

import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

import "../../styles/public/PublicLayout.css";
import "../../styles/articles/ArticleLayout.css";
import "../../styles/articles/ArticleContent.css";
import { useTranslation } from "react-i18next";

function GuideLayout({
  icon,
  title,
  description,
  category,
  categoryPath = "/guides",
  children,
}) {

    const { t } = useTranslation();
  return (
    <div className="public-page article-page">

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

        </div>

      </main>

      <PublicFooter />

    </div>
  );
}

export default GuideLayout;