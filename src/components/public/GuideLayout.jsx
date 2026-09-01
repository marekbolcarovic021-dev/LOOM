import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

function GuideLayout({
  icon,
  title,
  description,
  children,
}) {
  const { t } = useTranslation();

  return (
    <div className="public-page">

      <PublicHeader />

      <main className="guide-layout">

        {/* ==================================================
            BREADCRUMB
        ================================================== */}

        <div className="guide-breadcrumb">

          <Link to="/guides">
            {t("financialGuides") ||
              "Financial Guides"}
          </Link>

          <span>
            /
          </span>

          <span>
            {title}
          </span>

        </div>


        {/* ==================================================
            HERO
        ================================================== */}

        <section className="guide-hero">

          <div className="guide-hero-icon">
            {icon}
          </div>

          <div>

            <h1>
              {title}
            </h1>

            <p>
              {description}
            </p>

          </div>

        </section>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="guide-content">

          {children}

        </div>

      </main>

      <PublicFooter />

    </div>
  );
}

export default GuideLayout;