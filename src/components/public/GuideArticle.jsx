import { Link } from "react-router-dom";

import GuideLayout from "./GuideLayout";

function GuideArticle({
  icon,
  title,
  description,
  category = "Budgeting",
  children,
}) {
  return (
    <GuideLayout
      icon={icon}
      title={title}
      description={description}
    >

      <article className="guide-article">

        {/* ==================================================
            ARTICLE CONTENT
        ================================================== */}

        <div className="guide-article-body">
          {children}
        </div>


        {/* ==================================================
            DISCLAIMER
        ================================================== */}

        <div className="guide-article-disclaimer">

          <strong>
            Important notice
          </strong>

          <p>
            This article is provided for
            general informational and
            educational purposes only. It does
            not constitute individualized
            financial, investment, tax or legal
            advice. Your financial situation,
            objectives and applicable laws may
            differ from the examples discussed.
          </p>

        </div>


        {/* ==================================================
            BACK TO CATEGORY
        ================================================== */}

        <div className="guide-article-footer">

          <Link
            to={`/guides/${category.toLowerCase().replaceAll(" ", "-")}`}
            className="public-secondary-button"
          >
            ← Back to guides
          </Link>

        </div>

      </article>

    </GuideLayout>
  );
}

export default GuideArticle;