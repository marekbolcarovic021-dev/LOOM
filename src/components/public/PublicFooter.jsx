import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PublicFooter() {
  const { t } = useTranslation();

  return (
    <footer className="public-footer">

      <div className="public-footer-inner">

        {/* ==================================================
            BRAND
        ================================================== */}

        <div className="public-footer-brand">

          <Link
            to="/about"
            className="public-footer-logo"
          >
            <img
              src="/loom-favicon.png"
              alt="LOOM"
            />

            <span>LOOM</span>
          </Link>

          <p>
            {t("loomFooterDescription") ||
              "A smarter way to understand and manage your finances."}
          </p>

        </div>


        {/* ==================================================
            LOOM
        ================================================== */}

        <div className="public-footer-column">

          <h3>
            LOOM
          </h3>

          <Link to="/about">
            {t("aboutLoom") || "About LOOM"}
          </Link>

          <Link to="/contact">
            {t("contact") || "Contact"}
          </Link>

        </div>


        {/* ==================================================
            FINANCIAL GUIDES
        ================================================== */}

        <div className="public-footer-column">

          <h3>
            {t("financialGuides") ||
              "Financial Guides"}
          </h3>

          <Link to="/guides/budgeting">
            {t("budgeting") || "Budgeting"}
          </Link>

          <Link to="/guides/saving">
            {t("saving") || "Saving"}
          </Link>

          <Link to="/guides/investing">
            {t("investing") || "Investing"}
          </Link>

          <Link to="/guides/financial-goals">
            {t("financialGoals") ||
              "Financial Goals"}
          </Link>

          <Link to="/guides/personal-finance">
            {t("personalFinance") ||
              "Personal Finance"}
          </Link>

          <Link to="/guides/debt">
            {t("debt") || "Debt"}
          </Link>

        </div>


        {/* ==================================================
            LEGAL
        ================================================== */}

        <div className="public-footer-column">

          <h3>
            {t("legal") || "Legal"}
          </h3>

          <Link to="/privacy">
            {t("privacyPolicy") ||
              "Privacy Policy"}
          </Link>

          <Link to="/cookies">
            {t("cookiePolicy") ||
              "Cookie Policy"}
          </Link>

          <Link to="/terms">
            {t("termsAndConditions") ||
              "Terms & Conditions"}
          </Link>

        </div>

      </div>


      {/* ==================================================
          BOTTOM
      ================================================== */}

      <div className="public-footer-bottom">

        <span>
          © {new Date().getFullYear()} LOOM
        </span>

        <span>
          {t("allRightsReserved") ||
            "All rights reserved."}
        </span>

      </div>

    </footer>
  );
}

export default PublicFooter;