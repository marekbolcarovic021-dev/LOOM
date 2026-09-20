import { useTranslation } from "react-i18next";
import ArticleLayout from "../../../components/public/articles/ArticleLayout";

function CreateMonthlyBudget() {
  const { t } = useTranslation();

  return (
    <ArticleLayout
      category={t("budgeting", {
        defaultValue: "Budgeting",
      })}
      title={t("createMonthlyBudgetTitle", {
        defaultValue: "How to Create a Monthly Budget That Actually Works",
      })}
      description={t("createMonthlyBudgetIntro", {
        defaultValue:
          "A practical guide to organizing income, expenses, savings and financial priorities.",
      })}
    >

      <section>
        <p className="article-lead">
          {t("createMonthlyBudgetArticleLead", {
            defaultValue:
              "A monthly budget is a plan that gives every part of your income a purpose. The goal is not simply to spend as little as possible. A useful budget should help you cover necessary expenses, make progress toward your financial goals and leave enough flexibility for unexpected costs.",
          })}
        </p>
      </section>


      <section>
        <h2>
          {t("createMonthlyBudgetArticleStep1Title", {
            defaultValue: "1. Start with your income",
          })}
        </h2>

        <p>
          {t("createMonthlyBudgetArticleStep1Text1", {
            defaultValue:
              "Begin by identifying the income you expect to receive during the month. For someone with a predictable salary, this may be relatively straightforward. If your income changes from month to month, using a conservative estimate can make the budget more resilient.",
          })}
        </p>

        <p>
          {t("createMonthlyBudgetArticleStep1Text2", {
            defaultValue:
              "Focus on money you realistically expect to receive rather than assuming that occasional or uncertain income will always be available.",
          })}
        </p>
      </section>


      <section>
        <h2>
          {t("createMonthlyBudgetArticleStep2Title", {
            defaultValue: "2. Separate essential and discretionary expenses",
          })}
        </h2>

        <p>
          {t("createMonthlyBudgetArticleStep2Text1", {
            defaultValue:
              "The next step is to understand your expenses. A useful starting point is to separate expenses into two broad groups: essential expenses and discretionary expenses.",
          })}
        </p>

        <p>
          {t("createMonthlyBudgetArticleStep2Text2", {
            defaultValue:
              "Essential expenses can include housing, utilities, basic food, transportation, insurance and required debt payments. Discretionary expenses can include entertainment, restaurants, hobbies and other spending that is more flexible.",
          })}
        </p>
      </section>


      <section>
        <h2>
          {t("createMonthlyBudgetArticleStep3Title", {
            defaultValue: "3. Look at your actual spending",
          })}
        </h2>

        <p>
          {t("createMonthlyBudgetArticleStep3Text1", {
            defaultValue:
              "A budget becomes much more useful when it is based on your real spending rather than assumptions.",
          })}
        </p>

        <p>
          {t("createMonthlyBudgetArticleStep3Text2", {
            defaultValue:
              "Review several months of transactions and look for recurring expenses, unusually large purchases and categories where spending regularly exceeds your expectations.",
          })}
        </p>

        <p>
          {t("createMonthlyBudgetArticleStep3Text3", {
            defaultValue:
              "Looking at multiple months is particularly useful because one month can contain unusual expenses that do not represent your normal spending pattern.",
          })}
        </p>
      </section>


      <section>
        <h2>
          {t("createMonthlyBudgetArticleStep4Title", {
            defaultValue: "4. Include savings in the budget",
          })}
        </h2>

        <p>
          {t("createMonthlyBudgetArticleStep4Text1", {
            defaultValue:
              "Savings should not necessarily be treated as whatever happens to remain at the end of the month. If saving is important to you, include it as a planned part of your monthly allocation.",
          })}
        </p>

        <p>
          {t("createMonthlyBudgetArticleStep4Text2", {
            defaultValue:
              "You can divide savings between different purposes, such as an emergency reserve, a future purchase, retirement or other long-term goals.",
          })}
        </p>
      </section>


      <section>
        <h2>
          {t("createMonthlyBudgetArticleStep5Title", {
            defaultValue:
              "5. Don't make the budget unrealistically strict",
          })}
        </h2>

        <p>
          {t("createMonthlyBudgetArticleStep5Text1", {
            defaultValue:
              "A budget that leaves no room for ordinary variation can be difficult to maintain. Unexpected expenses happen, and some months will naturally look different from others.",
          })}
        </p>

        <p>
          {t("createMonthlyBudgetArticleStep5Text2", {
            defaultValue:
              "Instead of trying to predict every expense perfectly, leave some flexibility in the plan and review it regularly.",
          })}
        </p>
      </section>


      <section>
        <h2>
          {t("createMonthlyBudgetArticleStep6Title", {
            defaultValue: "6. Review the budget regularly",
          })}
        </h2>

        <p>
          {t("createMonthlyBudgetArticleStep6Text1", {
            defaultValue:
              "A budget is not something you create once and never change. Your income, expenses and priorities can change over time.",
          })}
        </p>

        <p>
          {t("createMonthlyBudgetArticleStep6Text2", {
            defaultValue:
              "Reviewing your spending at the end of each month can help you identify what worked, what did not and what should be adjusted for the following month.",
          })}
        </p>
      </section>


      <section>
        <h2>
          {t("createMonthlyBudgetArticleExampleTitle", {
            defaultValue: "A simple example",
          })}
        </h2>

        <p>
          {t("createMonthlyBudgetArticleExampleText1", {
            defaultValue:
              "Imagine someone receives €3,000 of monthly income after taxes. They might first account for essential costs such as housing, utilities, food, transportation and insurance.",
          })}
        </p>

        <p>
          {t("createMonthlyBudgetArticleExampleText2", {
            defaultValue:
              "They could then decide how much to allocate toward savings and financial goals before determining how much remains available for discretionary spending.",
          })}
        </p>

        <p>
          {t("createMonthlyBudgetArticleExampleText3", {
            defaultValue:
              "The exact amounts will depend on the person's circumstances. The important principle is that the budget should reflect actual needs and priorities rather than an arbitrary formula.",
          })}
        </p>
      </section>


      <section>
        <h2>
          {t("createMonthlyBudgetArticleMistakesTitle", {
            defaultValue: "Common budgeting mistakes",
          })}
        </h2>

        <ul>
          <li>
            {t("createMonthlyBudgetArticleMistake1", {
              defaultValue:
                "Forgetting irregular or annual expenses.",
            })}
          </li>

          <li>
            {t("createMonthlyBudgetArticleMistake2", {
              defaultValue:
                "Underestimating small recurring purchases.",
            })}
          </li>

          <li>
            {t("createMonthlyBudgetArticleMistake3", {
              defaultValue:
                "Creating a budget based on ideal spending instead of actual spending.",
            })}
          </li>

          <li>
            {t("createMonthlyBudgetArticleMistake4", {
              defaultValue:
                "Leaving no flexibility for unexpected expenses.",
            })}
          </li>

          <li>
            {t("createMonthlyBudgetArticleMistake5", {
              defaultValue:
                "Treating savings as an afterthought.",
            })}
          </li>

          <li>
            {t("createMonthlyBudgetArticleMistake6", {
              defaultValue:
                "Never reviewing the budget after creating it.",
            })}
          </li>
        </ul>
      </section>


      <section>
        <h2>
          {t("createMonthlyBudgetArticleKeyTakeawayTitle", {
            defaultValue: "Key takeaway",
          })}
        </h2>

        <p>
          {t("createMonthlyBudgetArticleKeyTakeawayText", {
            defaultValue:
              "A good budget should make your financial situation clearer, not make your life unnecessarily complicated. Start with your actual income and expenses, account for savings and goals, leave reasonable flexibility and review the plan regularly.",
          })}
        </p>
      </section>

    </ArticleLayout>
  );
}

export default CreateMonthlyBudget;