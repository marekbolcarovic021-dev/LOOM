import { useTranslation } from "react-i18next";

import ArticleLayout from "../../../components/public/articles/ArticleLayout";

function UnderstandingYourFinances() {
  const { t } = useTranslation();

  return (
    <ArticleLayout
      category={t("personalFinance", {
        defaultValue: "Personal Finance",
      })}
      title={t("understandingYourFinancesTitle", {
        defaultValue: "Understanding Your Financial Situation",
      })}
      description={t("understandingYourFinancesIntro", {
        defaultValue:
          "A simple way to look at your income, spending, savings, assets and debts as one financial picture.",
      })}
    >

      {/* ==================================================
          1. KNOW YOUR INCOME
      ================================================== */}

      <section>

        <h2>
          {t("financialSituationArticleStep1Title", {
            defaultValue: "1. Know how much money comes in",
          })}
        </h2>

        <p>
          {t("financialSituationArticleStep1Text1", {
            defaultValue:
              "Start with the money you regularly receive. This can include employment income, business income or other reliable sources.",
          })}
        </p>

        <p>
          {t("financialSituationArticleStep1Text2", {
            defaultValue:
              "If your income changes from month to month, use a realistic estimate rather than assuming your best month will repeat.",
          })}
        </p>

      </section>


      {/* ==================================================
          2. KNOW YOUR SPENDING
      ================================================== */}

      <section>

        <h2>
          {t("financialSituationArticleStep2Title", {
            defaultValue: "2. Understand where your money goes",
          })}
        </h2>

        <p>
          {t("financialSituationArticleStep2Text1", {
            defaultValue:
              "Look at your regular and variable expenses. This shows how much of your income is being used and where you may have room to adjust.",
          })}
        </p>

        <p>
          {t("financialSituationArticleStep2Text2", {
            defaultValue:
              "Reviewing your actual spending is usually more useful than relying on estimates.",
          })}
        </p>

      </section>


      {/* ==================================================
          3. KNOW WHAT YOU OWN
      ================================================== */}

      <section>

        <h2>
          {t("financialSituationArticleStep3Title", {
            defaultValue: "3. Know what you own",
          })}
        </h2>

        <p>
          {t("financialSituationArticleStep3Text1", {
            defaultValue:
              "Your financial position includes the assets you own.",
          })}
        </p>

        <p>
          {t("financialSituationArticleStep3Text2", {
            defaultValue:
              "Depending on your situation, these may include:",
          })}
        </p>

        <ul>
          <li>
            {t("financialSituationArticleStep3Item1", {
              defaultValue: "Money in bank accounts",
            })}
          </li>

          <li>
            {t("financialSituationArticleStep3Item2", {
              defaultValue: "Savings",
            })}
          </li>

          <li>
            {t("financialSituationArticleStep3Item3", {
              defaultValue: "Investments",
            })}
          </li>

          <li>
            {t("financialSituationArticleStep3Item4", {
              defaultValue: "Property",
            })}
          </li>

          <li>
            {t("financialSituationArticleStep3Item5", {
              defaultValue: "Other valuable assets",
            })}
          </li>
        </ul>

        <p>
          {t("financialSituationArticleStep3Text3", {
            defaultValue:
              "Knowing what you own gives you a clearer view of your overall financial position.",
          })}
        </p>

      </section>


      {/* ==================================================
          4. KNOW WHAT YOU OWE
      ================================================== */}

      <section>

        <h2>
          {t("financialSituationArticleStep4Title", {
            defaultValue: "4. Know what you owe",
          })}
        </h2>

        <p>
          {t("financialSituationArticleStep4Text1", {
            defaultValue:
              "Debts are another important part of your financial situation.",
          })}
        </p>

        <p>
          {t("financialSituationArticleStep4Text2", {
            defaultValue:
              "Depending on your circumstances, this may include mortgages, personal loans, credit-card balances or other outstanding obligations.",
          })}
        </p>

        <p>
          {t("financialSituationArticleStep4Text3", {
            defaultValue:
              "Keep track of both the amount owed and the payments you are required to make.",
          })}
        </p>

      </section>


      {/* ==================================================
          5. UNDERSTAND NET WORTH
      ================================================== */}

      <section>

        <h2>
          {t("financialSituationArticleStep5Title", {
            defaultValue: "5. Understand your net worth",
          })}
        </h2>

        <p>
          {t("financialSituationArticleStep5Text1", {
            defaultValue:
              "Net worth is a simple way to compare what you own with what you owe.",
          })}
        </p>

        <div className="article-tip">

          <strong>
            {t("financialSituationArticleStep5TipTitle", {
              defaultValue: "Simple calculation",
            })}
          </strong>

          <p>
            {t("financialSituationArticleStep5TipText", {
              defaultValue:
                "Assets − Debts = Net worth",
            })}
          </p>

        </div>

        <p>
          {t("financialSituationArticleStep5Text2", {
            defaultValue:
              "For example, if you own €50,000 in assets and owe €20,000, your net worth is €30,000.",
          })}
        </p>

        <p>
          {t("financialSituationArticleStep5Text3", {
            defaultValue:
              "Net worth is only one measure of your financial situation. It does not show everything about your finances or your ability to handle short-term expenses.",
          })}
        </p>

      </section>


      {/* ==================================================
          6. LOOK AT CASH FLOW
      ================================================== */}

      <section>

        <h2>
          {t("financialSituationArticleStep6Title", {
            defaultValue: "6. Look at your monthly cash flow",
          })}
        </h2>

        <p>
          {t("financialSituationArticleStep6Text1", {
            defaultValue:
              "Your cash flow shows what happens to your money during a period.",
          })}
        </p>

        <div className="article-tip">

          <strong>
            {t("financialSituationArticleStep6TipTitle", {
              defaultValue: "Simple calculation",
            })}
          </strong>

          <p>
            {t("financialSituationArticleStep6TipText", {
              defaultValue:
                "Income − Spending = Money available",
            })}
          </p>

        </div>

        <p>
          {t("financialSituationArticleStep6Text2", {
            defaultValue:
              "If you regularly spend more than you receive, the difference needs to be addressed.",
          })}
        </p>

        <p>
          {t("financialSituationArticleStep6Text3", {
            defaultValue:
              "If you consistently have money left over, you can decide whether to use it for savings, debt repayment, financial goals or other priorities.",
          })}
        </p>

      </section>


      {/* ==================================================
          7. REVIEW REGULARLY
      ================================================== */}

      <section>

        <h2>
          {t("financialSituationArticleStep7Title", {
            defaultValue: "7. Review your financial picture",
          })}
        </h2>

        <p>
          {t("financialSituationArticleStep7Text1", {
            defaultValue:
              "Your financial situation changes over time. Income can change, debts can be repaid, savings can grow and expenses can increase.",
          })}
        </p>

        <p>
          {t("financialSituationArticleStep7Text2", {
            defaultValue:
              "Reviewing your finances regularly helps you notice these changes and adjust your plans.",
          })}
        </p>

      </section>


      {/* ==================================================
          QUICK SUMMARY
      ================================================== */}

      <section>

        <h2>
          {t("financialSituationArticleSummaryTitle", {
            defaultValue: "Your financial picture at a glance",
          })}
        </h2>

        <ol>
          <li>
            {t("financialSituationArticleSummary1", {
              defaultValue: "Know your income.",
            })}
          </li>

          <li>
            {t("financialSituationArticleSummary2", {
              defaultValue: "Track your spending.",
            })}
          </li>

          <li>
            {t("financialSituationArticleSummary3", {
              defaultValue: "List what you own.",
            })}
          </li>

          <li>
            {t("financialSituationArticleSummary4", {
              defaultValue: "List what you owe.",
            })}
          </li>

          <li>
            {t("financialSituationArticleSummary5", {
              defaultValue: "Calculate your net worth.",
            })}
          </li>

          <li>
            {t("financialSituationArticleSummary6", {
              defaultValue: "Check your monthly cash flow.",
            })}
          </li>

          <li>
            {t("financialSituationArticleSummary7", {
              defaultValue: "Review everything regularly.",
            })}
          </li>
        </ol>

      </section>

    </ArticleLayout>
  );
}

export default UnderstandingYourFinances;