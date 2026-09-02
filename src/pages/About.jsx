import PublicHeader from "../components/public/PublicHeader";
import PublicFooter from "../components/public/PublicFooter";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <div className="public-page">

      <PublicHeader />

      <main className="public-main">

        {/* ==================================================
            HERO
        ================================================== */}

        <section
          className="public-hero"
          aria-labelledby="about-hero-title"
        >

          <div className="public-hero-content">

            <span className="public-eyebrow">
              LOOM
            </span>

            <h1 id="about-hero-title">
              {t(
                "aboutLoomTitle",
                "Understand your money. Plan your future."
              )}
            </h1>

            <p>
              {t(
                "aboutLoomDescription",
                "LOOM is a personal finance platform designed to help you understand your financial situation, organize your money and make more informed financial decisions."
              )}
            </p>

            <div className="public-hero-actions">

              <Link
                to="/register"
                className="public-primary-button"
              >
                {t("getStarted", "Get Started")}
              </Link>

              <Link
                to="/guides"
                className="public-secondary-button"
              >
                {t("financialGuides", "Financial Guides")}
              </Link>

            </div>

          </div>

        </section>


        {/* ==================================================
            WHAT IS LOOM
        ================================================== */}

        <section
          className="public-section"
          aria-labelledby="what-is-loom-title"
        >

          <div className="public-section-heading">

            <span className="public-eyebrow">
              LOOM
            </span>

            <h2 id="what-is-loom-title">
              {t("whatIsLoom", "What is LOOM?")}
            </h2>

          </div>

          <div className="public-text-block">

            <p>
              {t(
                "whatIsLoomText1",
                "LOOM brings the most important parts of personal financial management into one place."
              )}
            </p>

            <p>
              {t(
                "whatIsLoomText2",
                "Users can track transactions, manage accounts, create financial goals, monitor investments and understand their overall financial position."
              )}
            </p>

            <p>
              {t(
                "whatIsLoomText3",
                "LOOM also provides financial education and analytical tools designed to help users better understand their finances and make more informed decisions."
              )}
            </p>

            <p>
              {t(
                "whatIsLoomText4",
                "The information and calculations provided by LOOM are intended to support financial planning and education. They do not replace individualized advice from a qualified financial, tax or legal professional."
              )}
            </p>

          </div>

        </section>


        {/* ==================================================
            FEATURES
        ================================================== */}

        <section
          className="public-section"
          aria-labelledby="features-title"
        >

          <div className="public-section-heading">

            <span className="public-eyebrow">
              {t("features", "FEATURES")}
            </span>

            <h2 id="features-title">
              {t(
                "everythingInOnePlace",
                "Your finances in one place"
              )}
            </h2>

          </div>


          <div className="public-feature-grid">

            <div className="public-feature-card">

              <div
                className="public-feature-icon"
                aria-hidden="true"
              >
                €
              </div>

              <h3>
                {t(
                  "transactionTracking",
                  "Transaction Tracking"
                )}
              </h3>

              <p>
                {t(
                  "transactionTrackingDescription",
                  "Keep track of income and expenses and understand where your money goes."
                )}
              </p>

            </div>


            <div className="public-feature-card">

              <div
                className="public-feature-icon"
                aria-hidden="true"
              >
                ◈
              </div>

              <h3>
                {t("accounts", "Accounts")}
              </h3>

              <p>
                {t(
                  "accountsDescription",
                  "Keep your financial accounts and balances organized in one place."
                )}
              </p>

            </div>


            <div className="public-feature-card">

              <div
                className="public-feature-icon"
                aria-hidden="true"
              >
                ◎
              </div>

              <h3>
                {t(
                  "financialGoals",
                  "Financial Goals"
                )}
              </h3>

              <p>
                {t(
                  "financialGoalsDescription",
                  "Set savings targets and track your progress toward important financial goals."
                )}
              </p>

            </div>


            <div className="public-feature-card">

              <div
                className="public-feature-icon"
                aria-hidden="true"
              >
                ↗
              </div>

              <h3>
                {t("investments", "Investments")}
              </h3>

              <p>
                {t(
                  "investmentsDescription",
                  "Track investments and understand their contribution to your overall financial position."
                )}
              </p>

            </div>


            <div className="public-feature-card">

              <div
                className="public-feature-icon"
                aria-hidden="true"
              >
                ◫
              </div>

              <h3>
                {t("budgets", "Budgets")}
              </h3>

              <p>
                {t(
                  "budgetsDescription",
                  "Create spending limits and compare your actual spending with your plans."
                )}
              </p>

            </div>


            <div className="public-feature-card">

              <div
                className="public-feature-icon"
                aria-hidden="true"
              >
                ✦
              </div>

              <h3>
                {t(
                  "aiFinancialCoach",
                  "AI Financial Coach"
                )}
              </h3>

              <p>
                {t(
                  "aiFinancialCoachDescription",
                  "Explore financial questions and scenarios using information from your LOOM financial profile. AI-generated information is provided for general educational and planning purposes."
                )}
              </p>

            </div>

          </div>

        </section>


        {/* ==================================================
            FINANCIAL EDUCATION
        ================================================== */}

        <section
          className="public-section public-guide-promo"
          aria-labelledby="learn-title"
        >

          <div>

            <span className="public-eyebrow">
              {t("learn", "LEARN")}
            </span>

            <h2 id="learn-title">
              {t(
                "learnMoreAboutMoney",
                "Learn more about personal finance"
              )}
            </h2>

            <p>
              {t(
                "learnMoreAboutMoneyDescription",
                "Explore practical financial guides covering budgeting, saving, investing, financial goals, personal finance and debt."
              )}
            </p>

          </div>

          <Link
            to="/guides"
            className="public-primary-button"
          >
            {t(
              "exploreGuides",
              "Explore Guides"
            )}
          </Link>

        </section>


        {/* ==================================================
            DISCLAIMER
        ================================================== */}

        <section
          className="public-disclaimer"
          aria-labelledby="about-disclaimer-title"
        >

          <strong id="about-disclaimer-title">
            {t(
              "importantNotice",
              "Important notice"
            )}
          </strong>

          <p>
            {t(
              "financialEducationDisclaimer",
              "Information provided by LOOM is intended for general informational, educational and financial-planning purposes. It does not constitute individualized investment, tax, legal or other professional financial advice. Financial decisions involve risk, and users should consider their individual circumstances and seek qualified professional advice where appropriate."
            )}
          </p>

        </section>

      </main>

      <PublicFooter />

    </div>
  );
}

export default About;