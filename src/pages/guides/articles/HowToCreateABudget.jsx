import { useTranslation } from "react-i18next";

import GuideLayout from "../../../components/public/GuideLayout";

function HowToCreateABudget() {
  const { t } = useTranslation();

  return (
    <GuideLayout
      icon="▣"
      category={t("budgeting", {
        defaultValue: "Budgeting",
      })}
      categoryPath="/guides/budgeting"
      title={t("howToCreateABudgetTitle", {
        defaultValue: "How to Create a Budget",
      })}
      description={t("howToCreateABudgetIntro", {
        defaultValue:
          "A simple way to organize your income and expenses and build a budget you can actually follow.",
      })}
    >

      {/* ==================================================
          1. CALCULATE YOUR INCOME
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleStep1Title", {
            defaultValue: "1. Calculate your income",
          })}
        </h2>

        <p>
          {t("budgetArticleStep1Text1", {
            defaultValue:
              "Start by calculating how much money you receive each month.",
          })}
        </p>

        <p>
          {t("budgetArticleStep1Text2", {
            defaultValue:
              "Include your regular salary and other reliable sources of income.",
          })}
        </p>

        <p>
          {t("budgetArticleStep1Text3", {
            defaultValue:
              "If your income changes from month to month, use a conservative estimate rather than assuming your highest possible income.",
          })}
        </p>

      </section>


      {/* ==================================================
          2. LIST REGULAR EXPENSES
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleStep2Title", {
            defaultValue: "2. List your regular expenses",
          })}
        </h2>

        <p>
          {t("budgetArticleStep2Intro", {
            defaultValue:
              "Write down expenses that you normally have every month.",
          })}
        </p>

        <ul>

          <li>
            {t("budgetArticleExpenseRent", {
              defaultValue: "Rent or mortgage",
            })}
          </li>

          <li>
            {t("budgetArticleExpenseUtilities", {
              defaultValue: "Utilities",
            })}
          </li>

          <li>
            {t("budgetArticleExpenseInsurance", {
              defaultValue: "Insurance",
            })}
          </li>

          <li>
            {t("budgetArticleExpenseDebt", {
              defaultValue: "Debt payments",
            })}
          </li>

          <li>
            {t("budgetArticleExpenseSubscriptions", {
              defaultValue: "Subscriptions",
            })}
          </li>

          <li>
            {t("budgetArticleExpenseTransport", {
              defaultValue: "Transportation",
            })}
          </li>

        </ul>

        <p>
          {t("budgetArticleStep2Text", {
            defaultValue:
              "These expenses are usually easier to predict because they do not change significantly from month to month.",
          })}
        </p>

      </section>


      {/* ==================================================
          3. TRACK EVERYDAY SPENDING
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleStep3Title", {
            defaultValue: "3. Track your everyday spending",
          })}
        </h2>

        <p>
          {t("budgetArticleStep3Intro", {
            defaultValue:
              "Next, look at expenses that can change from month to month.",
          })}
        </p>

        <ul>

          <li>
            {t("budgetArticleVariableFood", {
              defaultValue: "Food",
            })}
          </li>

          <li>
            {t("budgetArticleVariableEntertainment", {
              defaultValue: "Entertainment",
            })}
          </li>

          <li>
            {t("budgetArticleVariableShopping", {
              defaultValue: "Shopping",
            })}
          </li>

          <li>
            {t("budgetArticleVariableOther", {
              defaultValue: "Other everyday expenses",
            })}
          </li>

        </ul>

        <p>
          {t("budgetArticleStep3Text", {
            defaultValue:
              "Looking at your actual spending makes it easier to create limits that are realistic for you.",
          })}
        </p>

      </section>


      {/* ==================================================
          4. SET YOUR PRIORITIES
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleStep4Title", {
            defaultValue: "4. Set your priorities",
          })}
        </h2>

        <p>
          {t("budgetArticleStep4Text1", {
            defaultValue:
              "After covering your essential expenses, decide how much you want to put toward savings, debt repayment and other goals.",
          })}
        </p>

        <p>
          {t("budgetArticleStep4Text2", {
            defaultValue:
              "Give your money a purpose before you start spending it.",
          })}
        </p>

      </section>


      {/* ==================================================
          5. COMPARE YOUR PLAN WITH REALITY
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleStep5Title", {
            defaultValue:
              "5. Compare your budget with your actual spending",
          })}
        </h2>

        <p>
          {t("budgetArticleStep5Text1", {
            defaultValue:
              "A budget is only useful if it reflects your real life. At the end of the month, compare what you planned with what you actually spent.",
          })}
        </p>

        <p>
          {t("budgetArticleStep5Text2", {
            defaultValue:
              "If a category is consistently too low, adjust it instead of setting an unrealistic limit that you cannot maintain.",
          })}
        </p>

      </section>


      {/* ==================================================
          SIMPLE RULE
      ================================================== */}

      <div className="article-tip">

        <strong>
          {t("budgetArticleTipTitle", {
            defaultValue: "Keep it simple",
          })}
        </strong>

        <p>
          {t("budgetArticleTipText", {
            defaultValue:
              "The best budget is one you can follow consistently. Start with the categories that matter most and make it more detailed only if you need to.",
          })}
        </p>

      </div>


      {/* ==================================================
          END
      ================================================== */}

      <div className="article-end">

        <p>
          {t("budgetArticleEnd", {
            defaultValue:
              "A good budget does not mean avoiding all spending. It means knowing where your money is going and making sure it supports your priorities.",
          })}
        </p>

      </div>

    </GuideLayout>
  );
}

export default HowToCreateABudget;