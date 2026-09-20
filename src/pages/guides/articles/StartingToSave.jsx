import { useTranslation } from "react-i18next";
import ArticleLayout from "../../../components/public/articles/ArticleLayout";

function StartingToSave() {
  const { t } = useTranslation();

  return (
    <ArticleLayout
      category={t("saving", {
        defaultValue: "Saving",
      })}
      title={t("startingToSaveTitle", {
        defaultValue: "How to Start Saving Money",
      })}
      description={t("startingToSaveIntro", {
        defaultValue:
          "A practical guide to building savings, creating financial reserves and turning saving into a sustainable habit.",
      })}
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <section>
        <h2>
          {t("savingArticleIntroTitle", {
            defaultValue: "Saving is a process, not a one-time decision",
          })}
        </h2>

        <p>
          {t("savingArticleIntroText1", {
            defaultValue:
              "Saving money means intentionally keeping part of your income instead of spending all of it. The amount does not have to be large at the beginning. What matters is that the amount is realistic and that you can continue saving regularly.",
          })}
        </p>

        <p>
          {t("savingArticleIntroText2", {
            defaultValue:
              "A useful saving plan should fit your actual income, regular expenses, debts and financial goals. Trying to save an amount that leaves too little money for necessary expenses can make the plan difficult to maintain.",
          })}
        </p>

        <p>
          {t("savingArticleIntroText3", {
            defaultValue:
              "The following steps can help you turn saving from an occasional activity into a predictable part of your monthly financial routine.",
          })}
        </p>
      </section>


      {/* ==================================================
          1. KNOW HOW MUCH YOU CAN SAVE
      ================================================== */}

      <section>
        <h2>
          {t("savingArticleStep1Title", {
            defaultValue: "1. Find a realistic amount to save",
          })}
        </h2>

        <p>
          {t("savingArticleStep1Text1", {
            defaultValue:
              "Start by looking at your monthly income and normal expenses. The amount available for saving is the money that remains after necessary and planned spending.",
          })}
        </p>

        <p>
          {t("savingArticleStep1Text2", {
            defaultValue:
              "If your income changes from month to month, use a conservative estimate rather than assuming your highest typical income.",
          })}
        </p>

        <div className="article-tip">
          <strong>
            {t("savingArticleStep1TipTitle", {
              defaultValue: "A simple calculation",
            })}
          </strong>

          <p>
            {t("savingArticleStep1TipText", {
              defaultValue:
                "For example, if your monthly income is 2,000 € and your planned expenses are 1,750 €, the amount available before any additional priorities is 250 €. You could use part or all of this amount for savings, depending on your other goals and financial obligations.",
            })}
          </p>
        </div>
      </section>


      {/* ==================================================
          2. START SMALL AND BE CONSISTENT
      ================================================== */}

      <section>
        <h2>
          {t("savingArticleStep2Title", {
            defaultValue: "2. Start small and stay consistent",
          })}
        </h2>

        <p>
          {t("savingArticleStep2Text1", {
            defaultValue:
              "You do not need to begin with a large savings target. A smaller amount that you can maintain every month can be a better starting point than an ambitious target that repeatedly causes problems.",
          })}
        </p>

        <p>
          {t("savingArticleStep2Text2", {
            defaultValue:
              "Once regular saving becomes part of your routine, you can gradually increase the amount when your financial situation allows it.",
          })}
        </p>

        <ul>
          <li>
            {t("savingArticleStep2Example1", {
              defaultValue: "50 € per month = 600 € over one year",
            })}
          </li>
          <li>
            {t("savingArticleStep2Example2", {
              defaultValue: "100 € per month = 1,200 € over one year",
            })}
          </li>
          <li>
            {t("savingArticleStep2Example3", {
              defaultValue: "200 € per month = 2,400 € over one year",
            })}
          </li>
        </ul>

        <p>
          {t("savingArticleStep2Text3", {
            defaultValue:
              "These examples do not account for interest or investment returns. They simply show how regular contributions accumulate over time.",
          })}
        </p>
      </section>


      {/* ==================================================
          3. SAVE BEFORE SPENDING
      ================================================== */}

      <section>
        <h2>
          {t("savingArticleStep3Title", {
            defaultValue: "3. Save before spending the rest",
          })}
        </h2>

        <p>
          {t("savingArticleStep3Text1", {
            defaultValue:
              "One practical approach is to treat saving as a regular monthly expense. Instead of waiting until the end of the month to see what remains, set aside the planned amount shortly after receiving your income.",
          })}
        </p>

        <p>
          {t("savingArticleStep3Text2", {
            defaultValue:
              "This does not mean ignoring necessary expenses. The amount you transfer should be based on a realistic budget that already accounts for your regular obligations.",
          })}
        </p>

        <div className="article-tip">
          <strong>
            {t("savingArticleStep3TipTitle", {
              defaultValue: "Make the decision in advance",
            })}
          </strong>

          <p>
            {t("savingArticleStep3TipText", {
              defaultValue:
                "Deciding how much to save before the month begins reduces the chance that the money will simply disappear through unplanned spending.",
            })}
          </p>
        </div>
      </section>


      {/* ==================================================
          4. BUILD AN EMERGENCY FUND
      ================================================== */}

      <section>
        <h2>
          {t("savingArticleStep4Title", {
            defaultValue: "4. Build an emergency fund",
          })}
        </h2>

        <p>
          {t("savingArticleStep4Text1", {
            defaultValue:
              "An emergency fund is money set aside for unexpected expenses or a temporary reduction or loss of income.",
          })}
        </p>

        <p>
          {t("savingArticleStep4Text2", {
            defaultValue:
              "Examples can include an unexpected home or car repair, an urgent medical expense, or a period when your normal income is temporarily unavailable.",
          })}
        </p>

        <p>
          {t("savingArticleStep4Text3", {
            defaultValue:
              "The appropriate size of an emergency reserve depends on your income stability, essential monthly expenses, family situation and other financial obligations. There is no single amount that is appropriate for everyone.",
          })}
        </p>

        <div className="article-tip">
          <strong>
            {t("savingArticleStep4TipTitle", {
              defaultValue: "Keep emergency savings accessible",
            })}
          </strong>

          <p>
            {t("savingArticleStep4TipText", {
              defaultValue:
                "Emergency money is intended to be available when you need it. It should therefore generally be kept somewhere that allows reasonably quick access rather than being dependent on assets whose value can fluctuate significantly.",
            })}
          </p>
        </div>
      </section>


      {/* ==================================================
          5. GIVE YOUR SAVINGS A PURPOSE
      ================================================== */}

      <section>
        <h2>
          {t("savingArticleStep5Title", {
            defaultValue: "5. Give your savings a specific purpose",
          })}
        </h2>

        <p>
          {t("savingArticleStep5Text1", {
            defaultValue:
              "Saving can become easier when you know what the money is intended for. A specific goal gives you a clearer amount and timeframe to work toward.",
          })}
        </p>

        <ul>
          <li>
            {t("savingArticleGoal1", {
              defaultValue: "Emergency expenses",
            })}
          </li>
          <li>
            {t("savingArticleGoal2", {
              defaultValue: "A holiday or trip",
            })}
          </li>
          <li>
            {t("savingArticleGoal3", {
              defaultValue: "A car or other large purchase",
            })}
          </li>
          <li>
            {t("savingArticleGoal4", {
              defaultValue: "Home improvements",
            })}
          </li>
          <li>
            {t("savingArticleGoal5", {
              defaultValue: "Education or future expenses",
            })}
          </li>
        </ul>

        <p>
          {t("savingArticleStep5Text2", {
            defaultValue:
              "For example, if you need 1,200 € for a planned expense in 12 months, saving 100 € per month would provide 1,200 € before considering any interest.",
          })}
        </p>

        <p>
          {t("savingArticleStep5Text3", {
            defaultValue:
              "Separating different goals can also make it easier to see how much money is available for each purpose.",
          })}
        </p>
      </section>


      {/* ==================================================
          6. AUTOMATE YOUR SAVING
      ================================================== */}

      <section>
        <h2>
          {t("savingArticleStep6Title", {
            defaultValue: "6. Make saving automatic",
          })}
        </h2>

        <p>
          {t("savingArticleStep6Text1", {
            defaultValue:
              "If your bank provides automatic transfers, you can schedule a transfer to your savings account shortly after your regular income arrives.",
          })}
        </p>

        <p>
          {t("savingArticleStep6Text2", {
            defaultValue:
              "Automation reduces the need to remember the transfer every month and can make saving part of your normal financial routine.",
          })}
        </p>

        <p>
          {t("savingArticleStep6Text3", {
            defaultValue:
              "Before setting up an automatic transfer, make sure the amount is compatible with your normal cash flow and necessary payments.",
          })}
        </p>
      </section>


      {/* ==================================================
          7. INCREASE SAVING OVER TIME
      ================================================== */}

      <section>
        <h2>
          {t("savingArticleStep7Title", {
            defaultValue: "7. Increase your savings gradually",
          })}
        </h2>

        <p>
          {t("savingArticleStep7Text1", {
            defaultValue:
              "Your saving capacity can change over time. A salary increase, lower housing costs, a finished loan payment or another change in your expenses may create additional room in your budget.",
          })}
        </p>

        <p>
          {t("savingArticleStep7Text2", {
            defaultValue:
              "When your financial situation improves, consider directing at least part of the additional money toward your savings or financial goals instead of automatically increasing spending.",
          })}
        </p>

        <p>
          {t("savingArticleStep7Text3", {
            defaultValue:
              "You can also review recurring expenses and decide whether services or purchases that no longer provide enough value could be reduced or cancelled.",
          })}
        </p>
      </section>


      {/* ==================================================
          8. SIMPLE SAVING EXAMPLE
      ================================================== */}

      <section>
        <h2>
          {t("savingArticleExampleTitle", {
            defaultValue: "A simple monthly saving example",
          })}
        </h2>

        <p>
          {t("savingArticleExampleIntro", {
            defaultValue:
              "Imagine that your monthly income is 2,000 € and your planned necessary and regular expenses are 1,700 €. You have 300 € of remaining room before considering additional financial priorities.",
          })}
        </p>

        <ul>
          <li>
            {t("savingArticleExample1", {
              defaultValue: "100 € → emergency reserve",
            })}
          </li>
          <li>
            {t("savingArticleExample2", {
              defaultValue: "100 € → planned future expense",
            })}
          </li>
          <li>
            {t("savingArticleExample3", {
              defaultValue: "100 € → longer-term financial goal",
            })}
          </li>
        </ul>

        <p>
          {t("savingArticleExampleText", {
            defaultValue:
              "This is only an example, not a recommended allocation. A different person may need to use the same 300 € for debt repayment, essential expenses, a larger emergency reserve or another priority.",
          })}
        </p>
      </section>


      {/* ==================================================
          9. COMMON MISTAKES
      ================================================== */}

      <section>
        <h2>
          {t("savingArticleMistakesTitle", {
            defaultValue: "Common saving mistakes",
          })}
        </h2>

        <ul>
          <li>
            {t("savingArticleMistake1", {
              defaultValue:
                "Setting a savings target that is unrealistic for your income",
            })}
          </li>
          <li>
            {t("savingArticleMistake2", {
              defaultValue:
                "Ignoring irregular expenses when deciding how much you can save",
            })}
          </li>
          <li>
            {t("savingArticleMistake3", {
              defaultValue:
                "Using emergency savings for normal recurring spending",
            })}
          </li>
          <li>
            {t("savingArticleMistake4", {
              defaultValue:
                "Increasing spending automatically whenever income increases",
            })}
          </li>
          <li>
            {t("savingArticleMistake5", {
              defaultValue:
                "Keeping no clear distinction between emergency savings and money saved for planned purchases",
            })}
          </li>
        </ul>
      </section>


      {/* ==================================================
          10. WHEN YOU ARE HAVING TROUBLE SAVING
      ================================================== */}

      <section>
        <h2>
          {t("savingArticleProblemTitle", {
            defaultValue: "What if you cannot save right now?",
          })}
        </h2>

        <p>
          {t("savingArticleProblemText1", {
            defaultValue:
              "There may be periods when your income is too low relative to necessary expenses to save a meaningful amount. This does not mean that budgeting has failed.",
          })}
        </p>

        <p>
          {t("savingArticleProblemText2", {
            defaultValue:
              "Start by understanding where the money is going. Review recurring costs, variable spending and debt payments. Look for changes that are realistic rather than trying to eliminate every non-essential expense at once.",
          })}
        </p>

        <p>
          {t("savingArticleProblemText3", {
            defaultValue:
              "If there is currently no room for saving, the immediate goal may simply be to avoid increasing debt and create enough financial stability to begin saving later.",
          })}
        </p>
      </section>


      {/* ==================================================
          FAQ
      ================================================== */}

      <section>
        <h2>
          {t("savingArticleFaqTitle", {
            defaultValue: "Frequently asked questions",
          })}
        </h2>

        <h3>
          {t("savingArticleFaq1Question", {
            defaultValue: "How much should I save each month?",
          })}
        </h3>

        <p>
          {t("savingArticleFaq1Answer", {
            defaultValue:
              "There is no single amount that works for everyone. Consider your income, necessary expenses, debt obligations, financial goals and the stability of your income. A realistic amount that you can maintain is a useful starting point.",
          })}
        </p>

        <h3>
          {t("savingArticleFaq2Question", {
            defaultValue: "Should I save or pay off debt first?",
          })}
        </h3>

        <p>
          {t("savingArticleFaq2Answer", {
            defaultValue:
              "The answer depends on the type and cost of the debt, your emergency reserves and your overall financial situation. High-cost debt can significantly affect your finances, while having no emergency reserve can leave you vulnerable to unexpected expenses. Consider both factors when setting priorities.",
          })}
        </p>

        <h3>
          {t("savingArticleFaq3Question", {
            defaultValue: "Where should I keep emergency savings?",
          })}
        </h3>

        <p>
          {t("savingArticleFaq3Answer", {
            defaultValue:
              "Emergency savings are generally intended to be accessible and relatively stable. The appropriate account or product depends on your country, available banking products, access requirements and personal circumstances.",
          })}
        </p>

        <h3>
          {t("savingArticleFaq4Question", {
            defaultValue: "Is saving 50 € per month worth it?",
          })}
        </h3>

        <p>
          {t("savingArticleFaq4Answer", {
            defaultValue:
              "Regular saving can still be useful even when the monthly amount is relatively small. At 50 € per month, you would set aside 600 € over one year before considering interest or investment returns.",
          })}
        </p>

        <h3>
          {t("savingArticleFaq5Question", {
            defaultValue: "Should I keep all my savings in one account?",
          })}
        </h3>

        <p>
          {t("savingArticleFaq5Answer", {
            defaultValue:
              "Not necessarily. Separating emergency reserves from money intended for planned purchases can make it easier to understand what your savings are actually available for.",
          })}
        </p>
      </section>


      {/* ==================================================
          PRACTICAL SUMMARY
      ================================================== */}

      <section>
        <h2>
          {t("savingArticleSummaryTitle", {
            defaultValue: "A practical saving plan",
          })}
        </h2>

        <p>
          {t("savingArticleSummaryIntro", {
            defaultValue:
              "A simple saving strategy can be summarized in these steps:",
          })}
        </p>

        <ol>
          <li>
            {t("savingArticleSummary1", {
              defaultValue:
                "Review your income and regular expenses.",
            })}
          </li>
          <li>
            {t("savingArticleSummary2", {
              defaultValue:
                "Choose a realistic amount that you can save regularly.",
            })}
          </li>
          <li>
            {t("savingArticleSummary3", {
              defaultValue:
                "Build an accessible emergency reserve.",
            })}
          </li>
          <li>
            {t("savingArticleSummary4", {
              defaultValue:
                "Create separate goals for planned future expenses.",
            })}
          </li>
          <li>
            {t("savingArticleSummary5", {
              defaultValue:
                "Automate saving when your cash flow allows it.",
            })}
          </li>
          <li>
            {t("savingArticleSummary6", {
              defaultValue:
                "Review and increase your saving amount when your financial situation improves.",
            })}
          </li>
        </ol>
      </section>


      {/* ==================================================
          FINAL TIP
      ================================================== */}

      <section>
        <div className="article-tip">
          <strong>
            {t("savingArticleFinalTipTitle", {
              defaultValue: "Keep the system simple",
            })}
          </strong>

          <p>
            {t("savingArticleFinalTipText", {
              defaultValue:
                "The best saving system is one you can understand and maintain. Start with a realistic amount, give your savings a clear purpose and review the plan when your income, expenses or priorities change.",
            })}
          </p>
        </div>

        <p>
          {t("savingArticleEnd", {
            defaultValue:
              "Saving is a personal financial planning activity. The examples in this article are provided for educational purposes only and do not constitute personalized financial advice. Your appropriate saving strategy depends on your income, expenses, obligations, goals and individual circumstances.",
          })}
        </p>
      </section>

    </ArticleLayout>
  );
}

export default StartingToSave;