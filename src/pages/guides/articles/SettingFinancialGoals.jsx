import { useTranslation } from "react-i18next";

import ArticleLayout from "../../../components/public/articles/ArticleLayout";

function SettingFinancialGoals() {
  const { t } = useTranslation();

  return (
    <ArticleLayout
      category={t("financialGoals", {
        defaultValue: "Financial Goals",
      })}
      title={t("settingFinancialGoalsTitle", {
        defaultValue: "How to Set a Financial Goal",
      })}
      description={t("settingFinancialGoalsIntro", {
        defaultValue:
          "Turn a general idea such as 'I want to save more' into a clear financial goal you can actually track.",
      })}
    >

      {/* ==================================================
          1. MAKE THE GOAL SPECIFIC
      ================================================== */}

      <section>

        <h2>
          {t("financialGoalsArticleStep1Title", {
            defaultValue: "1. Make the goal specific",
          })}
        </h2>

        <p>
          {t("financialGoalsArticleStep1Text1", {
            defaultValue:
              "Start by deciding exactly what you want to achieve.",
          })}
        </p>

        <p>
          {t("financialGoalsArticleStep1Text2", {
            defaultValue:
              'Instead of saying "I want to save more", define a specific target such as saving €2,000 for a particular purpose.',
          })}
        </p>

        <p>
          {t("financialGoalsArticleStep1Text3", {
            defaultValue:
              "A specific target makes it easier to measure your progress.",
          })}
        </p>

      </section>


      {/* ==================================================
          2. SET A DEADLINE
      ================================================== */}

      <section>

        <h2>
          {t("financialGoalsArticleStep2Title", {
            defaultValue: "2. Set a deadline",
          })}
        </h2>

        <p>
          {t("financialGoalsArticleStep2Text1", {
            defaultValue:
              "Decide when you want to reach the goal.",
          })}
        </p>

        <p>
          {t("financialGoalsArticleStep2Text2", {
            defaultValue:
              "A deadline turns the goal into something you can plan for rather than an open-ended intention.",
          })}
        </p>

        <div className="article-tip">

          <strong>
            {t("financialGoalsArticleStep2TipTitle", {
              defaultValue: "Keep the deadline realistic",
            })}
          </strong>

          <p>
            {t("financialGoalsArticleStep2TipText", {
              defaultValue:
                "A deadline that requires an amount you cannot realistically afford each month will make the plan difficult to maintain.",
            })}
          </p>

        </div>

      </section>


      {/* ==================================================
          3. CALCULATE THE MONTHLY TARGET
      ================================================== */}

      <section>

        <h2>
          {t("financialGoalsArticleStep3Title", {
            defaultValue:
              "3. Calculate how much you need each month",
          })}
        </h2>

        <p>
          {t("financialGoalsArticleStep3Text1", {
            defaultValue:
              "Once you know the amount you want to reach and the time available, calculate the amount you need to set aside regularly.",
          })}
        </p>

        <div className="article-tip">

          <strong>
            {t("financialGoalsArticleStep3TipTitle", {
              defaultValue: "Simple calculation",
            })}
          </strong>

          <p>
            {t("financialGoalsArticleStep3TipText", {
              defaultValue:
                "Amount still needed ÷ Number of months = Approximate monthly amount",
            })}
          </p>

        </div>

        <p>
          {t("financialGoalsArticleStep3Text2", {
            defaultValue:
              "For example, if you need €1,200 and have 12 months, the target is approximately €100 per month.",
          })}
        </p>

      </section>


      {/* ==================================================
          4. CHECK YOUR BUDGET
      ================================================== */}

      <section>

        <h2>
          {t("financialGoalsArticleStep4Title", {
            defaultValue:
              "4. Check whether the goal fits your budget",
          })}
        </h2>

        <p>
          {t("financialGoalsArticleStep4Text1", {
            defaultValue:
              "Compare the monthly amount required for the goal with your current income and expenses.",
          })}
        </p>

        <p>
          {t("financialGoalsArticleStep4Text2", {
            defaultValue:
              "If the amount is too high, you may need to extend the deadline, reduce the target, reduce other spending, or find additional income.",
          })}
        </p>

        <p>
          {t("financialGoalsArticleStep4Text3", {
            defaultValue:
              "Do not create a savings target that leaves you unable to cover your normal expenses.",
          })}
        </p>

      </section>


      {/* ==================================================
          5. KEEP THE MONEY SEPARATE
      ================================================== */}

      <section>

        <h2>
          {t("financialGoalsArticleStep5Title", {
            defaultValue: "5. Make the goal easy to track",
          })}
        </h2>

        <p>
          {t("financialGoalsArticleStep5Text1", {
            defaultValue:
              "Keeping money for a specific goal separate from everyday spending can make it easier to see how much you have already saved.",
          })}
        </p>

        <p>
          {t("financialGoalsArticleStep5Text2", {
            defaultValue:
              "You can also track the goal using a simple progress calculation:",
          })}
        </p>

        <div className="article-tip">

          <strong>
            {t("financialGoalsArticleStep5TipTitle", {
              defaultValue: "Progress",
            })}
          </strong>

          <p>
            {t("financialGoalsArticleStep5TipText", {
              defaultValue:
                "Amount saved ÷ Target amount × 100 = Percentage completed",
            })}
          </p>

        </div>

      </section>


      {/* ==================================================
          6. REVIEW THE PLAN
      ================================================== */}

      <section>

        <h2>
          {t("financialGoalsArticleStep6Title", {
            defaultValue: "6. Review the goal regularly",
          })}
        </h2>

        <p>
          {t("financialGoalsArticleStep6Text1", {
            defaultValue:
              "Your income and expenses can change, so review the plan regularly.",
          })}
        </p>

        <p>
          {t("financialGoalsArticleStep6Text2", {
            defaultValue:
              "If your circumstances change, adjust the monthly amount or deadline rather than abandoning the goal completely.",
          })}
        </p>

      </section>


      {/* ==================================================
          QUICK SUMMARY
      ================================================== */}

      <section>

        <h2>
          {t("financialGoalsArticleSummaryTitle", {
            defaultValue: "A simple financial goal plan",
          })}
        </h2>

        <ol>
          <li>
            {t("financialGoalsArticleSummary1", {
              defaultValue: "Choose a specific target.",
            })}
          </li>

          <li>
            {t("financialGoalsArticleSummary2", {
              defaultValue: "Set a realistic deadline.",
            })}
          </li>

          <li>
            {t("financialGoalsArticleSummary3", {
              defaultValue:
                "Calculate the required monthly amount.",
            })}
          </li>

          <li>
            {t("financialGoalsArticleSummary4", {
              defaultValue: "Check that it fits your budget.",
            })}
          </li>

          <li>
            {t("financialGoalsArticleSummary5", {
              defaultValue: "Track your progress.",
            })}
          </li>

          <li>
            {t("financialGoalsArticleSummary6", {
              defaultValue:
                "Review and adjust the plan when necessary.",
            })}
          </li>
        </ol>

      </section>

    </ArticleLayout>
  );
}

export default SettingFinancialGoals;