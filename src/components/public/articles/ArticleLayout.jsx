import { Link } from "react-router-dom";
import PublicHeader from "../PublicHeader";
import PublicFooter from "../PublicFooter";

import "../../../styles/articles/articles.css";

function ArticleLayout({
  category,
  title,
  description,
  children,
}) {
  return (
    <div className="public-page article-page">

      <PublicHeader />

      <main className="article-main">

        {/* ==================================================
            ARTICLE HEADER
        ================================================== */}

        <header className="article-header">

          <Link
            to="/guides"
            className="article-back-link"
          >
            ← Financial Guides
          </Link>

          <span className="article-category">
            {category}
          </span>

          <h1>
            {title}
          </h1>

          {description && (
            <p className="article-description">
              {description}
            </p>
          )}

        </header>


        {/* ==================================================
            ARTICLE CONTENT
        ================================================== */}

        <article className="article-content">

          {children}

        </article>


        {/* ==================================================
            BACK TO GUIDES
        ================================================== */}

        <div className="article-footer-navigation">

          <Link
            to="/guides"
            className="public-secondary-button"
          >
            ← Back to Financial Guides
          </Link>

        </div>

      </main>

      <PublicFooter />

    </div>
  );
}

export default ArticleLayout;