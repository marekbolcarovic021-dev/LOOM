import { Link } from "react-router-dom";

import GuideLayout from "./GuideLayout";
import GuideCard from "./GuideCard";

function GuideCategoryPage({
  icon,
  title,
  description,
  articles = [],
}) {
  return (
    <GuideLayout
      icon={icon}
      title={title}
      description={description}
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      {articles.length > 0 && (

        <section className="guide-articles-section">

          <div className="guide-articles-heading">

            <h2>
              Guides
            </h2>

            <p>
              Explore practical information
              related to this topic.
            </p>

          </div>


          {/* ==================================================
              ARTICLE GRID
          ================================================== */}

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
          EMPTY / COMING CONTENT
      ================================================== */}

      {articles.length === 0 && (

        <section className="guide-empty-state">

          <div className="guide-empty-icon">
            +
          </div>

          <h2>
            More guides coming soon
          </h2>

          <p>
            We're preparing practical,
            detailed guides for this topic.
          </p>

          <Link
            to="/guides"
            className="public-secondary-button"
          >
            Back to Financial Guides
          </Link>

        </section>

      )}

    </GuideLayout>
  );
}

export default GuideCategoryPage;