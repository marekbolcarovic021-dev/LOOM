import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import { Link } from "react-router-dom";

import "../../styles/guides/GuideArticle.css";

function GuideArticle({
  category,
  title,
  description,
  children,
}) {
  return (
    <div className="public-page">

      <PublicHeader />

      <main className="guide-article-page">

        <article className="guide-article">

          {/* BACK */}

          <Link
            to="/guides"
            className="guide-article-back"
          >
            ← Financial Guides
          </Link>


          {/* HEADER */}

          <header className="guide-article-header">

            <span className="public-eyebrow">
              {category}
            </span>

            <h1>
              {title}
            </h1>

            <p className="guide-article-description">
              {description}
            </p>

          </header>


          {/* CONTENT */}

          <div className="guide-article-content">
            {children}
          </div>


          {/* DISCLAIMER */}

          <div className="public-disclaimer">

            <strong>
              Important notice
            </strong>

            <p>
              The information provided in this guide
              is for general educational and
              informational purposes only. It does not
              constitute financial, investment, tax,
              legal or other professional advice.
              Financial decisions involve risk, and
              you should consider your individual
              circumstances before making important
              financial decisions.
            </p>

          </div>


          {/* BACK TO GUIDES */}

          <div className="guide-article-footer">

            <Link
              to="/guides"
              className="public-secondary-button"
            >
              ← Back to Financial Guides
            </Link>

          </div>

        </article>

      </main>

      <PublicFooter />

    </div>
  );
}

export default GuideArticle;