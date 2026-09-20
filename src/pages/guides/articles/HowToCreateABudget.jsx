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
          "A practical step-by-step guide to organizing your income, planning your expenses, and creating a budget you can realistically follow.",
      })}
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleIntroTitle", {
            defaultValue: "What a budget actually does",
          })}
        </h2>

        <p>
          {t("budgetArticleIntroText1", {
            defaultValue:
              "A budget is a plan for how you intend to use your money during a specific period, usually one month. It helps you see how much money comes in, where it is expected to go, and how much remains available for saving, investing, debt repayment, or other priorities.",
          })}
        </p>

        <p>
          {t("budgetArticleIntroText2", {
            defaultValue:
              "Creating a budget does not mean that every expense has to be predicted perfectly. The purpose is to create a realistic plan and then compare that plan with what actually happens.",
          })}
        </p>

        <p>
          {t("budgetArticleIntroText3", {
            defaultValue:
              "The most useful budget is therefore not necessarily the most detailed one. It is a budget that reflects your real financial situation and is simple enough to maintain regularly.",
          })}
        </p>

      </section>


      {/* ==================================================
          1. CALCULATE INCOME
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleStep1Title", {
            defaultValue: "1. Calculate your monthly income",
          })}
        </h2>

        <p>
          {t("budgetArticleStep1Text1", {
            defaultValue:
              "Start by determining how much money you expect to receive during the month.",
          })}
        </p>

        <p>
          {t("budgetArticleStep1Text2", {
            defaultValue:
              "Include your regular salary and other reliable sources of income. If you receive income from several sources, add them together to get your expected monthly total.",
          })}
        </p>

        <p>
          {t("budgetArticleStep1Text3", {
            defaultValue:
              "If your income changes from month to month, use a conservative estimate rather than assuming your highest possible income. This gives your budget more room to handle months when you earn less.",
          })}
        </p>

        <div className="article-tip">

          <strong>
            {t("budgetArticleIncomeTipTitle", {
              defaultValue: "Example",
            })}
          </strong>

          <p>
            {t("budgetArticleIncomeTipText", {
              defaultValue:
                "If your monthly income is usually between €1,800 and €2,100, using €1,800 as the planning figure can make your budget more conservative. Additional income can then be allocated when it actually arrives.",
            })}
          </p>

        </div>

      </section>


      {/* ==================================================
          2. FIXED AND VARIABLE EXPENSES
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleStep2Title", {
            defaultValue: "2. Separate fixed and variable expenses",
          })}
        </h2>

        <p>
          {t("budgetArticleStep2Intro", {
            defaultValue:
              "Next, list the expenses you normally have during the month. It is useful to separate them into expenses that are relatively predictable and expenses that can change.",
          })}
        </p>

        <h3>
          {t("budgetArticleFixedTitle", {
            defaultValue: "Fixed or predictable expenses",
          })}
        </h3>

        <p>
          {t("budgetArticleFixedText", {
            defaultValue:
              "These expenses usually have a similar amount each month or are necessary payments that you can anticipate.",
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

        <h3>
          {t("budgetArticleVariableTitle", {
            defaultValue: "Variable expenses",
          })}
        </h3>

        <p>
          {t("budgetArticleVariableText", {
            defaultValue:
              "Variable expenses can change from month to month. Looking at your previous spending can help you choose realistic amounts instead of arbitrary limits.",
          })}
        </p>

        <ul>

          <li>
            {t("budgetArticleVariableFood", {
              defaultValue: "Food and groceries",
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

      </section>


      {/* ==================================================
          3. IRREGULAR EXPENSES
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleStep3Title", {
            defaultValue: "3. Include irregular expenses",
          })}
        </h2>

        <p>
          {t("budgetArticleStep3Intro", {
            defaultValue:
              "Some expenses do not happen every month but can still have a significant effect on your finances.",
          })}
        </p>

        <p>
          {t("budgetArticleStep3Text1", {
            defaultValue:
              "Examples include annual insurance payments, vehicle maintenance, medical expenses, holidays, gifts, school costs, or home repairs.",
          })}
        </p>

        <p>
          {t("budgetArticleStep3Text2", {
            defaultValue:
              "One practical approach is to estimate the yearly cost and divide it by twelve. If you expect to spend €600 on an expense over a year, setting aside about €50 per month can make the eventual payment easier to handle.",
          })}
        </p>

        <div className="article-tip">

          <strong>
            {t("budgetArticleIrregularTipTitle", {
              defaultValue: "Why this matters",
            })}
          </strong>

          <p>
            {t("budgetArticleIrregularTipText", {
              defaultValue:
                "A monthly budget can look balanced until an irregular expense appears. Planning for these costs in advance reduces the chance that one large payment will disrupt the rest of your budget.",
            })}
          </p>

        </div>

      </section>


      {/* ==================================================
          4. CALCULATE WHAT IS LEFT
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleStep4Title", {
            defaultValue: "4. Calculate what is available",
          })}
        </h2>

        <p>
          {t("budgetArticleStep4Text1", {
            defaultValue:
              "Once you have estimated your income and expenses, calculate how much remains.",
          })}
        </p>

        <p>
          <strong>
            {t("budgetArticleFormula", {
              defaultValue:
                "Available money = total income − planned expenses",
            })}
          </strong>
        </p>

        <p>
          {t("budgetArticleStep4Text2", {
            defaultValue:
              "This amount shows how much room your budget has for savings, investing, additional debt repayment, goals, or flexible spending.",
          })}
        </p>

        <p>
          {t("budgetArticleStep4Text3", {
            defaultValue:
              "If your planned expenses are higher than your expected income, the budget needs to be adjusted before the month begins. You can review flexible expenses, postpone non-essential purchases, or reconsider the amount allocated to particular goals.",
          })}
        </p>

      </section>


      {/* ==================================================
          5. SET PRIORITIES
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleStep5Title", {
            defaultValue: "5. Set savings, debt, and goal amounts",
          })}
        </h2>

        <p>
          {t("budgetArticleStep5Text1", {
            defaultValue:
              "After accounting for essential expenses, decide what you want your remaining money to accomplish.",
          })}
        </p>

        <ul>

          <li>
            {t("budgetArticlePrioritySavings", {
              defaultValue: "Build or maintain an emergency fund",
            })}
          </li>

          <li>
            {t("budgetArticlePriorityDebt", {
              defaultValue: "Repay debt",
            })}
          </li>

          <li>
            {t("budgetArticlePriorityGoals", {
              defaultValue: "Save for specific financial goals",
            })}
          </li>

          <li>
            {t("budgetArticlePriorityInvesting", {
              defaultValue: "Invest according to your financial plan",
            })}
          </li>

        </ul>

        <p>
          {t("budgetArticleStep5Text2", {
            defaultValue:
              "Giving your money a purpose before you spend it can make it easier to decide which expenses are important and which can wait.",
          })}
        </p>

      </section>


      {/* ==================================================
          6. CREATE THE MONTHLY PLAN
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleStep6Title", {
            defaultValue: "6. Create your monthly budget",
          })}
        </h2>

        <p>
          {t("budgetArticleStep6Text1", {
            defaultValue:
              "Now combine your income, expenses, and priorities into one monthly plan.",
          })}
        </p>

        <p>
          {t("budgetArticleStep6Text2", {
            defaultValue:
              "Start with essential expenses, then include regular variable spending, irregular expense reserves, savings, debt repayment, and other priorities.",
          })}
        </p>

        <p>
          {t("budgetArticleStep6Text3", {
            defaultValue:
              "The goal is for the planned amounts to fit within your expected income without relying on money that you do not currently expect to receive.",
          })}
        </p>

      </section>


      {/* ==================================================
          PRACTICAL EXAMPLE
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleExampleTitle", {
            defaultValue: "A simple monthly budget example",
          })}
        </h2>

        <p>
          {t("budgetArticleExampleIntro", {
            defaultValue:
              "Imagine that your expected monthly income is €2,000. A simple plan could look like this:",
          })}
        </p>

        <ul>

          <li>
            {t("budgetArticleExampleHousing", {
              defaultValue: "Housing and utilities: €750",
            })}
          </li>

          <li>
            {t("budgetArticleExampleFood", {
              defaultValue: "Food and groceries: €350",
            })}
          </li>

          <li>
            {t("budgetArticleExampleTransport", {
              defaultValue: "Transportation: €150",
            })}
          </li>

          <li>
            {t("budgetArticleExampleInsurance", {
              defaultValue: "Insurance and other fixed costs: €150",
            })}
          </li>

          <li>
            {t("budgetArticleExampleSavings", {
              defaultValue: "Savings and financial goals: €300",
            })}
          </li>

          <li>
            {t("budgetArticleExampleFlexible", {
              defaultValue: "Entertainment and flexible spending: €200",
            })}
          </li>

          <li>
            {t("budgetArticleExampleReserve", {
              defaultValue: "Irregular expense reserve: €100",
            })}
          </li>

        </ul>

        <p>
          {t("budgetArticleExampleText", {
            defaultValue:
              "This example is not a recommended allocation for everyone. Housing costs, income, family size, debt, location, and personal priorities can produce very different budgets. The important part is that the planned amounts add up to an amount your income can support.",
          })}
        </p>

      </section>


      {/* ==================================================
          7. COMPARE WITH REALITY
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleStep7Title", {
            defaultValue: "7. Compare your plan with actual spending",
          })}
        </h2>

        <p>
          {t("budgetArticleStep7Text1", {
            defaultValue:
              "A budget becomes more useful when you compare the plan with what actually happened during the month.",
          })}
        </p>

        <p>
          {t("budgetArticleStep7Text2", {
            defaultValue:
              "At the end of the month, review your actual income and spending. Look for categories where the difference between the planned and actual amount is significant.",
          })}
        </p>

        <p>
          {t("budgetArticleStep7Text3", {
            defaultValue:
              "A difference does not automatically mean that you failed to follow the budget. It can simply show that the original estimate was unrealistic or that your circumstances changed.",
          })}
        </p>

      </section>


      {/* ==================================================
          8. ADJUST THE BUDGET
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleStep8Title", {
            defaultValue: "8. Adjust the budget when necessary",
          })}
        </h2>

        <p>
          {t("budgetArticleStep8Text1", {
            defaultValue:
              "Your budget should change when your income, expenses, or priorities change.",
          })}
        </p>

        <p>
          {t("budgetArticleStep8Text2", {
            defaultValue:
              "If a category is consistently higher than planned, investigate why. You may need to increase the planned amount, reduce spending elsewhere, or change the way the category is managed.",
          })}
        </p>

        <p>
          {t("budgetArticleStep8Text3", {
            defaultValue:
              "Avoid creating limits that are so unrealistic that you repeatedly exceed them. A realistic budget is generally more useful than a theoretically perfect budget that cannot be maintained.",
          })}
        </p>

      </section>


      {/* ==================================================
          COMMON MISTAKES
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleMistakesTitle", {
            defaultValue: "Common budgeting mistakes",
          })}
        </h2>

        <ul>

          <li>
            {t("budgetArticleMistake1", {
              defaultValue:
                "Forgetting irregular or annual expenses",
            })}
          </li>

          <li>
            {t("budgetArticleMistake2", {
              defaultValue:
                "Using an unrealistically high income estimate",
            })}
          </li>

          <li>
            {t("budgetArticleMistake3", {
              defaultValue:
                "Setting spending limits without checking previous spending",
            })}
          </li>

          <li>
            {t("budgetArticleMistake4", {
              defaultValue:
                "Treating every unexpected expense as a budgeting failure",
            })}
          </li>

          <li>
            {t("budgetArticleMistake5", {
              defaultValue:
                "Creating too many categories and making the budget difficult to maintain",
            })}
          </li>

        </ul>

      </section>


      {/* ==================================================
          FAQ
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleFaqTitle", {
            defaultValue: "Frequently asked questions",
          })}
        </h2>

        <h3>
          {t("budgetArticleFaq1Question", {
            defaultValue: "How often should I review my budget?",
          })}
        </h3>

        <p>
          {t("budgetArticleFaq1Answer", {
            defaultValue:
              "You can review your budget throughout the month and make a more complete comparison at the end of each month. The appropriate frequency depends on how often your income and expenses change.",
          })}
        </p>

        <h3>
          {t("budgetArticleFaq2Question", {
            defaultValue: "What if my income changes every month?",
          })}
        </h3>

        <p>
          {t("budgetArticleFaq2Answer", {
            defaultValue:
              "Use a conservative estimate for planning and adjust the budget when the actual income becomes known. This can help prevent you from committing money before you receive it.",
          })}
        </p>

        <h3>
          {t("budgetArticleFaq3Question", {
            defaultValue: "Do I need to track every single expense?",
          })}
        </h3>

        <p>
          {t("budgetArticleFaq3Answer", {
            defaultValue:
              "Detailed tracking can be useful, especially when you are trying to understand where your money goes. However, the level of detail should be practical enough that you can maintain it consistently.",
          })}
        </p>

        <h3>
          {t("budgetArticleFaq4Question", {
            defaultValue: "What if my expenses are higher than my income?",
          })}
        </h3>

        <p>
          {t("budgetArticleFaq4Answer", {
            defaultValue:
              "Start by identifying which expenses are essential and which are flexible. Review recurring costs, variable spending, debt payments, and planned goals to determine where changes may be possible.",
          })}
        </p>

      </section>


      {/* ==================================================
          SIMPLE TIP
      ================================================== */}

      <div className="article-tip">

        <strong>
          {t("budgetArticleTipTitle", {
            defaultValue: "Keep it realistic",
          })}
        </strong>

        <p>
          {t("budgetArticleTipText", {
            defaultValue:
              "A useful budget is one you can understand, maintain, and adjust. Start with the categories that matter most and add more detail only when it helps you make better financial decisions.",
          })}
        </p>

      </div>


      {/* ==================================================
          PRACTICAL SUMMARY
      ================================================== */}

      <section className="article-section">

        <h2>
          {t("budgetArticleSummaryTitle", {
            defaultValue: "Practical summary",
          })}
        </h2>

        <p>
          {t("budgetArticleSummaryIntro", {
            defaultValue:
              "A simple budgeting process can be summarized in a few steps:",
          })}
        </p>

        <ol>

          <li>
            {t("budgetArticleSummary1", {
              defaultValue:
                "Calculate your expected monthly income.",
            })}
          </li>

          <li>
            {t("budgetArticleSummary2", {
              defaultValue:
                "List fixed, variable, and irregular expenses.",
            })}
          </li>

          <li>
            {t("budgetArticleSummary3", {
              defaultValue:
                "Calculate how much money remains after planned expenses.",
            })}
          </li>

          <li>
            {t("budgetArticleSummary4", {
              defaultValue:
                "Give part of the remaining money a clear purpose, such as saving or debt repayment.",
            })}
          </li>

          <li>
            {t("budgetArticleSummary5", {
              defaultValue:
                "Compare the plan with your actual spending.",
            })}
          </li>

          <li>
            {t("budgetArticleSummary6", {
              defaultValue:
                "Adjust the budget when your circumstances or spending patterns change.",
            })}
          </li>

        </ol>

      </section>


      {/* ==================================================
          DISCLAIMER
      ================================================== */}

      <div className="article-end">

        <p>
          {t("budgetArticleEnd", {
            defaultValue:
              "Budgeting is a personal financial planning tool. The examples in this guide are for educational purposes only and are not personalized financial advice. Your appropriate budget depends on your income, expenses, obligations, goals, and individual circumstances.",
          })}
        </p>

      </div>

    </GuideLayout>
  );
}

export default HowToCreateABudget;