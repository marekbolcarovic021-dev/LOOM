import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import PublicHeader from "../../components/public/PublicHeader";
import PublicFooter from "../../components/public/PublicFooter";
import GuideCard from "../../components/public/GuideCard";

function FinancialGuides() {
  const { t } = useTranslation();

  const categories = [
    {
      id: "budgeting",
      path: "/guides/budgeting",
      icon: "▣",
      title: t("budgeting", {
        defaultValue: "Budgeting",
      }),
      description: t("budgetingGuideDescription", {
        defaultValue:
          "Learn how to organize your income, manage expenses and create a realistic budget.",
      }),
    },

    {
      id: "saving",
      path: "/guides/saving",
      icon: "◈",
      title: t("saving", {
        defaultValue: "Saving",
      }),
      description: t("savingGuideDescription", {
        defaultValue:
          "Learn practical ways to save money, build financial reserves and prepare for unexpected expenses.",
      }),
    },

    {
      id: "investing",
      path: "/guides/investing",
      icon: "↗",
      title: t("investing", {
        defaultValue: "Investing",
      }),
      description: t("investingGuideDescription", {
        defaultValue:
          "Understand the fundamentals of investing, risk, diversification and long-term wealth building.",
      }),
    },

    {
      id: "financialGoals",
      path: "/guides/financial-goals",
      icon: "◎",
      title: t("financialGoals", {
        defaultValue: "Financial Goals",
      }),
      description: t("financialGoalsGuideDescription", {
        defaultValue:
          "Learn how to set realistic financial goals and create a plan to achieve them.",
      }),
    },

    {
      id: "personalFinance",
      path: "/guides/personal-finance",
      icon: "◇",
      title: t("personalFinance", {
        defaultValue: "Personal Finance",
      }),
      description: t("personalFinanceGuideDescription", {
        defaultValue:
          "Build a stronger understanding of the decisions that shape your overall financial situation.",
      }),
    },

    {
      id: "debt",
      path: "/guides/debt",
      icon: "−",
      title: t("debt", {
        defaultValue: "Debt",
      }),
      description: t("debtGuideDescription", {
        defaultValue:
          "Understand different types of debt and learn practical approaches to managing repayment.",
      }),
    },
  ];

  return (
    <div className="public-page">

      <PublicHeader />

      <main className="public-main">

        {/* ==================================================
            HERO
        ================================================== */}

        <section className="public-page-hero guides-main-hero">

          <span className="public-eyebrow">
            LOOM
          </span>

          <h1>
            {t("financialGuides", {
              defaultValue: "Financial Guides",
            })}
          </h1>

          <p>
            {t("financialGuidesIntro", {
              defaultValue:
                "Practical guides to help you better understand budgeting, saving, investing and other areas of personal finance.",
            })}
          </p>

        </section>


        {/* ==================================================
            CATEGORIES
        ================================================== */}

        <section className="public-section">

          <div className="public-section-heading">

            <span className="public-eyebrow">
              {t("explore", {
                defaultValue: "EXPLORE",
              })}
            </span>

            <h2>
              {t("financialTopics", {
                defaultValue: "Financial topics",
              })}
            </h2>

            <p>
              {t("financialTopicsDescription", {
                defaultValue:
                  "Choose a topic to explore practical information and financial education.",
              })}
            </p>

          </div>


          <div className="guides-category-grid">

            {categories.map((category) => (

              <GuideCard
                key={category.id}
                to={category.path}
                icon={category.icon}
                title={category.title}
                description={category.description}
              />

            ))}

          </div>

        </section>


        {/* ==================================================
            FINANCIAL EDUCATION
        ================================================== */}

        <section className="public-section guides-info-section">

          <div className="guides-info-card">

            <div className="guides-info-icon">
              ?
            </div>

            <div>

              <h2>
                {t("financialEducation", {
                  defaultValue: "Financial education",
                })}
              </h2>

              <p>
                {t("financialEducationDescription", {
                  defaultValue:
                    "Personal finance decisions can have long-term consequences. These guides are designed to explain financial concepts in clear, practical language so you can make better-informed decisions.",
                })}
              </p>

              <p>
                {t("financialEducationSourceNotice", {
                  defaultValue:
                    "Financial information can vary depending on your country, circumstances and applicable laws. Always consider your individual situation before making important financial decisions.",
                })}
              </p>

            </div>

          </div>

        </section>


        {/* ==================================================
            APP PROMOTION
        ================================================== */}

        <section className="public-section public-guide-promo">

          <div>

            <span className="public-eyebrow">
              LOOM
            </span>

            <h2>
              {t("manageFinancesWithLoom", {
                defaultValue:
                  "Put your financial knowledge into practice",
              })}
            </h2>

            <p>
              {t("manageFinancesWithLoomDescription", {
                defaultValue:
                  "LOOM helps you organize transactions, accounts, budgets, goals and investments in one place.",
              })}
            </p>

          </div>

          <Link
            to="/login"
            className="public-primary-button"
          >
            {t("getStarted", {
              defaultValue: "Get Started",
            })}
          </Link>

        </section>


        {/* ==================================================
            DISCLAIMER
        ================================================== */}

        <section className="public-disclaimer">

          <strong>
            {t("importantNotice", {
              defaultValue: "Important notice",
            })}
          </strong>

          <p>
            {t("financialEducationDisclaimer", {
              defaultValue:
                "Information provided by LOOM is intended for general informational and educational purposes. It does not constitute individualized investment, tax, legal or other professional financial advice. Financial decisions involve risk and users should consider their individual circumstances and seek qualified professional advice where appropriate.",
            })}
          </p>

        </section>

      </main>

      <PublicFooter />

    </div>
  );
}

export default FinancialGuides;