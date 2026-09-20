import { useTranslation } from "react-i18next";

import ArticleLayout from "../../../components/public/articles/ArticleLayout";

function MonthlyBudget() {
  const { t } = useTranslation();

  return (
    <ArticleLayout
      category={t("budgeting", {
        defaultValue: "Budgeting",
      })}
      title={t("monthlyBudgetTitle", {
        defaultValue: "How to Create a Monthly Budget",
      })}
      description={t("monthlyBudgetIntro", {
        defaultValue:
          "A simple way to understand your income, control your spending and plan where your money should go each month.",
      })}
    >

      {/* ==================================================
          1. CALCULATE YOUR INCOME
      ================================================== */}

      <section>

        <h2>
          {t("monthlyBudgetArticleStep1Title", {
            defaultValue: "1. Calculate your income",
          })}
        </h2>

        <p>
          {t("monthlyBudgetArticleStep1Text1", {
            defaultValue:
              "Start by calculating how much money you receive each month.",
          })}
        </p>

        <p>
          {t("monthlyBudgetArticleStep1Text2", {
            defaultValue:
              "Include your regular salary and other reliable sources of income.",
          })}
        </p>

        <p>
          {t("monthlyBudgetArticleStep1Text3", {
            defaultValue:
              "If your income changes from month to month, use a conservative estimate rather than assuming your highest possible income.",
          })}
        </p>

      </section>


      {/* ==================================================
          2. LIST REGULAR EXPENSES
      ================================================== */}

      <section>

        <h2>
          {t("monthlyBudgetArticleStep2Title", {
            defaultValue: "2. List your regular expenses",
          })}
        </h2>

        <p>
          {t("monthlyBudgetArticleStep2Text1", {
            defaultValue:
              "Write down expenses that you normally have every month.",
          })}
        </p>

        <ul>
          <li>
            {t("monthlyBudgetArticleStep2Item1", {
              defaultValue: "Rent or mortgage",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleStep2Item2", {
              defaultValue: "Utilities",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleStep2Item3", {
              defaultValue: "Insurance",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleStep2Item4", {
              defaultValue: "Debt payments",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleStep2Item5", {
              defaultValue: "Subscriptions",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleStep2Item6", {
              defaultValue: "Transportation",
            })}
          </li>
        </ul>

        <p>
          {t("monthlyBudgetArticleStep2Text2", {
            defaultValue:
              "These expenses are usually easier to predict because they do not change significantly from month to month.",
          })}
        </p>

      </section>


      {/* ==================================================
          3. TRACK EVERYDAY SPENDING
      ================================================== */}

      <section>

        <h2>
          {t("monthlyBudgetArticleStep3Title", {
            defaultValue: "3. Track your everyday spending",
          })}
        </h2>

        <p>
          {t("monthlyBudgetArticleStep3Text1", {
            defaultValue:
              "Next, look at expenses that can change from month to month.",
          })}
        </p>

        <ul>
          <li>
            {t("monthlyBudgetArticleStep3Item1", {
              defaultValue: "Food",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleStep3Item2", {
              defaultValue: "Shopping",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleStep3Item3", {
              defaultValue: "Entertainment",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleStep3Item4", {
              defaultValue: "Eating out",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleStep3Item5", {
              defaultValue: "Other personal spending",
            })}
          </li>
        </ul>

        <p>
          {t("monthlyBudgetArticleStep3Text2", {
            defaultValue:
              "Looking at your previous few months can help you estimate these expenses more realistically.",
          })}
        </p>

      </section>


      {/* ==================================================
          4. COMPARE INCOME AND EXPENSES
      ================================================== */}

      <section>

        <h2>
          {t("monthlyBudgetArticleStep4Title", {
            defaultValue: "4. Compare your income and expenses",
          })}
        </h2>

        <p>
          {t("monthlyBudgetArticleStep4Text1", {
            defaultValue:
              "Add your expected expenses together and compare the total with your income.",
          })}
        </p>

        <div className="article-tip">

          <strong>
            {t("monthlyBudgetArticleStep4TipTitle", {
              defaultValue: "Simple calculation",
            })}
          </strong>

          <p>
            {t("monthlyBudgetArticleStep4TipText", {
              defaultValue:
                "Income − Expenses = Money left over",
            })}
          </p>

        </div>

        <p>
          {t("monthlyBudgetArticleStep4Text2", {
            defaultValue:
              "If your expenses are higher than your income, you need to reduce spending, increase income, or adjust your financial plan.",
          })}
        </p>

      </section>


      {/* ==================================================
          5. GIVE YOUR REMAINING MONEY A PURPOSE
      ================================================== */}

      <section>

        <h2>
          {t("monthlyBudgetArticleStep5Title", {
            defaultValue: "5. Give your remaining money a purpose",
          })}
        </h2>

        <p>
          {t("monthlyBudgetArticleStep5Text1", {
            defaultValue:
              "If you have money left after your planned expenses, decide what you want to do with it.",
          })}
        </p>

        <ul>
          <li>
            {t("monthlyBudgetArticleStep5Item1", {
              defaultValue: "Build an emergency fund",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleStep5Item2", {
              defaultValue: "Save for a specific goal",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleStep5Item3", {
              defaultValue: "Pay down debt",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleStep5Item4", {
              defaultValue: "Invest for the long term",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleStep5Item5", {
              defaultValue:
                "Keep some money available for flexible spending",
            })}
          </li>
        </ul>

      </section>


      {/* ==================================================
          6. REVIEW YOUR BUDGET
      ================================================== */}

      <section>

        <h2>
          {t("monthlyBudgetArticleStep6Title", {
            defaultValue: "6. Review your budget regularly",
          })}
        </h2>

        <p>
          {t("monthlyBudgetArticleStep6Text1", {
            defaultValue:
              "A budget is not something you create once and never change.",
          })}
        </p>

        <p>
          {t("monthlyBudgetArticleStep6Text2", {
            defaultValue:
              "Review your actual spending at the end of each month and adjust your plan when your income or expenses change.",
          })}
        </p>

        <p>
          {t("monthlyBudgetArticleStep6Text3", {
            defaultValue:
              "The goal is not to predict every expense perfectly. The goal is to understand where your money goes and make deliberate decisions about it.",
          })}
        </p>

      </section>


      {/* ==================================================
          QUICK SUMMARY
      ================================================== */}

      <section>

        <h2>
          {t("monthlyBudgetArticleSummaryTitle", {
            defaultValue: "A simple monthly budget",
          })}
        </h2>

        <ol>
          <li>
            {t("monthlyBudgetArticleSummary1", {
              defaultValue: "Calculate your income.",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleSummary2", {
              defaultValue: "List your regular expenses.",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleSummary3", {
              defaultValue: "Estimate your everyday spending.",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleSummary4", {
              defaultValue:
                "Compare your income with your expenses.",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleSummary5", {
              defaultValue:
                "Decide what to do with the money left over.",
            })}
          </li>
          <li>
            {t("monthlyBudgetArticleSummary6", {
              defaultValue:
                "Review and adjust your budget each month.",
            })}
          </li>
        </ol>

      </section>

    </ArticleLayout>
  );
}

export default MonthlyBudget;