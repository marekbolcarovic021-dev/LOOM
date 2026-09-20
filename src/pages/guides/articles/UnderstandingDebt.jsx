import { useTranslation } from "react-i18next";

import ArticleLayout from "../../../components/public/articles/ArticleLayout";

function UnderstandingDebt() {
  const { t } = useTranslation();

  return (
    <ArticleLayout
      category={t("debt", {
        defaultValue: "Debt",
      })}
      title={t("understandingDebtTitle", {
        defaultValue: "Understanding and Managing Debt",
      })}
      description={t("understandingDebtIntro", {
        defaultValue:
          "A practical guide to understanding what you owe, what it costs, how to organize repayments and how to avoid unnecessary new debt.",
      })}
    >

      {/* ==================================================
          INTRODUCTION
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleIntroTitle", {
            defaultValue: "Debt is easier to manage when you understand it",
          })}
        </h2>

        <p>
          {t("debtArticleIntroText1", {
            defaultValue:
              "Debt is money that you have borrowed and are expected to repay, usually with interest or other costs. Mortgages, personal loans, credit cards, overdrafts and some installment purchases are common examples.",
          })}
        </p>

        <p>
          {t("debtArticleIntroText2", {
            defaultValue:
              "Having debt does not automatically mean that your finances are in poor condition. The important questions are how much you owe, what the debt costs, whether the required payments fit your budget and how the balance is changing over time.",
          })}
        </p>

        <p>
          {t("debtArticleIntroText3", {
            defaultValue:
              "A useful first step is therefore to replace uncertainty with a clear overview of your debts.",
          })}
        </p>

      </section>


      {/* ==================================================
          1. KNOW WHAT YOU OWE
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleStep1Title", {
            defaultValue: "1. Make a complete list of your debts",
          })}
        </h2>

        <p>
          {t("debtArticleStep1Text1", {
            defaultValue:
              "Start by listing every debt you currently have. For each one, record the current balance, interest rate, required monthly payment and remaining repayment period if available.",
          })}
        </p>

        <p>
          {t("debtArticleStep1Text2", {
            defaultValue:
              "It can also be useful to record the lender, payment date and whether the interest rate is fixed or variable.",
          })}
        </p>

        <ul>
          <li>
            {t("debtArticleStep1Item1", {
              defaultValue: "Current balance",
            })}
          </li>

          <li>
            {t("debtArticleStep1Item2", {
              defaultValue: "Interest rate",
            })}
          </li>

          <li>
            {t("debtArticleStep1Item3", {
              defaultValue: "Required monthly payment",
            })}
          </li>

          <li>
            {t("debtArticleStep1Item4", {
              defaultValue: "Payment date",
            })}
          </li>

          <li>
            {t("debtArticleStep1Item5", {
              defaultValue: "Remaining repayment period",
            })}
          </li>
        </ul>

        <p>
          {t("debtArticleStep1Text3", {
            defaultValue:
              "Once everything is listed together, you can see your total outstanding debt instead of looking at each payment separately.",
          })}
        </p>

      </section>


      {/* ==================================================
          2. UNDERSTAND THE COST
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleStep2Title", {
            defaultValue: "2. Understand what each debt costs",
          })}
        </h2>

        <p>
          {t("debtArticleStep2Text1", {
            defaultValue:
              "The amount you borrowed is not always the amount you will eventually repay. Interest, fees and other charges can increase the total cost of borrowing.",
          })}
        </p>

        <p>
          {t("debtArticleStep2Text2", {
            defaultValue:
              "When comparing debts, look beyond the monthly payment. A lower monthly payment can sometimes result from a longer repayment period, which may increase the total interest paid.",
          })}
        </p>

        <p>
          {t("debtArticleStep2Text3", {
            defaultValue:
              "For loans, the annual interest rate and the total repayment amount shown in the agreement can help you understand the cost. For credit cards and revolving credit, pay particular attention to the interest rate and how interest is calculated.",
          })}
        </p>

        <div className="article-tip">

          <strong>
            {t("debtArticleStep2TipTitle", {
              defaultValue: "Useful question",
            })}
          </strong>

          <p>
            {t("debtArticleStep2TipText", {
              defaultValue:
                "Ask yourself: if I keep making only the required payments, how much will this debt cost me in total?",
            })}
          </p>

        </div>

      </section>


      {/* ==================================================
          3. REQUIRED PAYMENTS
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleStep3Title", {
            defaultValue: "3. Make required payments a priority",
          })}
        </h2>

        <p>
          {t("debtArticleStep3Text1", {
            defaultValue:
              "Required debt payments should be included in your monthly budget before deciding how much money is available for optional spending, additional debt repayment or other goals.",
          })}
        </p>

        <p>
          {t("debtArticleStep3Text2", {
            defaultValue:
              "Missing a payment can result in additional charges or other consequences depending on the agreement and local rules. Setting up reminders or automatic payments can help reduce the risk of forgetting a due date.",
          })}
        </p>

        <p>
          {t("debtArticleStep3Text3", {
            defaultValue:
              "If you expect that you may not be able to make a required payment, contacting the lender before the payment is missed may give you more options than simply ignoring the problem.",
          })}
        </p>

      </section>


      {/* ==================================================
          4. CHECK AFFORDABILITY
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleStep4Title", {
            defaultValue: "4. Check how debt fits into your budget",
          })}
        </h2>

        <p>
          {t("debtArticleStep4Text1", {
            defaultValue:
              "Add your required debt payments to your regular monthly expenses. Then compare the total with your reliable monthly income.",
          })}
        </p>

        <p>
          {t("debtArticleStep4Text2", {
            defaultValue:
              "The goal is not simply to ask whether you can make the payment this month. Consider whether the payment remains manageable after housing, food, utilities, transportation, savings and other necessary expenses are included.",
          })}
        </p>

        <p>
          {t("debtArticleStep4Text3", {
            defaultValue:
              "If debt payments leave very little room in your budget, taking on additional borrowing may increase financial pressure even if the new payment appears affordable on its own.",
          })}
        </p>

      </section>


      {/* ==================================================
          5. CHOOSE REPAYMENT APPROACH
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleStep5Title", {
            defaultValue: "5. Choose how to repay extra debt",
          })}
        </h2>

        <p>
          {t("debtArticleStep5Text1", {
            defaultValue:
              "After covering all required payments, you can decide whether you want to put additional money toward one of your debts.",
          })}
        </p>

        <h3>
          {t("debtArticleStep5Method1Title", {
            defaultValue: "Highest-interest-first approach",
          })}
        </h3>

        <p>
          {t("debtArticleStep5Method1Text", {
            defaultValue:
              "With this approach, you make the required payment on every debt and direct additional money toward the debt with the highest interest rate. Once that debt is repaid, the additional amount can be redirected to the next debt.",
          })}
        </p>

        <h3>
          {t("debtArticleStep5Method2Title", {
            defaultValue: "Smallest-balance-first approach",
          })}
        </h3>

        <p>
          {t("debtArticleStep5Method2Text", {
            defaultValue:
              "Here, you continue making required payments on all debts but direct extra money toward the smallest outstanding balance first. After it is paid off, you move to the next smallest balance.",
          })}
        </p>

        <p>
          {t("debtArticleStep5Text2", {
            defaultValue:
              "These approaches organize extra repayments differently. The highest-interest-first method focuses on the cost of borrowing, while the smallest-balance-first method can make individual debts disappear sooner.",
          })}
        </p>

        <p>
          {t("debtArticleStep5Text3", {
            defaultValue:
              "Whichever approach you use, consistency matters. Avoid reducing required payments on other debts simply to concentrate money on one debt.",
          })}
        </p>

      </section>


      {/* ==================================================
          6. SIMPLE EXAMPLE
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleExampleTitle", {
            defaultValue: "A simple repayment example",
          })}
        </h2>

        <p>
          {t("debtArticleExampleIntro", {
            defaultValue:
              "Imagine that you have three debts and can afford an additional €150 per month after making all required payments.",
          })}
        </p>

        <ul>
          <li>
            {t("debtArticleExample1", {
              defaultValue:
                "Debt A: €5,000 balance at 4% interest",
            })}
          </li>

          <li>
            {t("debtArticleExample2", {
              defaultValue:
                "Debt B: €2,000 balance at 12% interest",
            })}
          </li>

          <li>
            {t("debtArticleExample3", {
              defaultValue:
                "Debt C: €800 balance at 8% interest",
            })}
          </li>
        </ul>

        <p>
          {t("debtArticleExampleText", {
            defaultValue:
              "Using a highest-interest-first approach, the additional €150 would initially be directed toward Debt B because it has the highest interest rate. The required payments on the other debts would continue as normal. This is only an illustration; actual repayment results depend on the loan terms and how interest is calculated.",
          })}
        </p>

      </section>


      {/* ==================================================
          7. AVOID NEW DEBT
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleStep6Title", {
            defaultValue: "6. Be careful about taking on new debt",
          })}
        </h2>

        <p>
          {t("debtArticleStep6Text1", {
            defaultValue:
              "Reducing existing debt can become much harder when new balances are continually added.",
          })}
        </p>

        <p>
          {t("debtArticleStep6Text2", {
            defaultValue:
              "Before borrowing, consider the total cost, the required payment and how the new obligation would fit alongside your existing debts and regular expenses.",
          })}
        </p>

        <p>
          {t("debtArticleStep6Text3", {
            defaultValue:
              "For discretionary purchases, waiting and saving the money first can sometimes avoid borrowing costs altogether.",
          })}
        </p>

      </section>


      {/* ==================================================
          8. BUILD A SMALL RESERVE
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleStep7Title", {
            defaultValue: "7. Keep some money available for unexpected costs",
          })}
        </h2>

        <p>
          {t("debtArticleStep7Text1", {
            defaultValue:
              "Putting every available euro toward debt can leave you with no cash for unexpected expenses.",
          })}
        </p>

        <p>
          {t("debtArticleStep7Text2", {
            defaultValue:
              "A small reserve can help cover unexpected costs without immediately relying on another loan or credit card.",
          })}
        </p>

        <p>
          {t("debtArticleStep7Text3", {
            defaultValue:
              "The appropriate amount depends on your income, expenses, job stability and personal circumstances. The important point is to consider both debt repayment and financial resilience rather than treating them as completely separate goals.",
          })}
        </p>

      </section>


      {/* ==================================================
          9. WHAT IF DEBT IS ALREADY DIFFICULT?
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleProblemTitle", {
            defaultValue: "What if your debt is already difficult to manage?",
          })}
        </h2>

        <p>
          {t("debtArticleProblemText1", {
            defaultValue:
              "If required payments are consistently difficult to make, start by reviewing your budget and identifying exactly where the pressure comes from.",
          })}
        </p>

        <p>
          {t("debtArticleProblemText2", {
            defaultValue:
              "Avoid ignoring bills or taking on additional expensive borrowing simply to postpone an existing problem. Depending on your circumstances and country, a lender, nonprofit debt-advice organization or qualified financial professional may be able to explain available options.",
          })}
        </p>

        <p>
          {t("debtArticleProblemText3", {
            defaultValue:
              "Be cautious with companies that promise to eliminate your debt quickly or guarantee a specific result in exchange for upfront fees. Check the terms carefully before sharing financial information or signing an agreement.",
          })}
        </p>

      </section>


      {/* ==================================================
          10. COMMON MISTAKES
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleMistakesTitle", {
            defaultValue: "Common debt-management mistakes",
          })}
        </h2>

        <ul>
          <li>
            {t("debtArticleMistake1", {
              defaultValue:
                "Looking only at the monthly payment instead of the total borrowing cost.",
            })}
          </li>

          <li>
            {t("debtArticleMistake2", {
              defaultValue:
                "Forgetting about annual, irregular or additional fees.",
            })}
          </li>

          <li>
            {t("debtArticleMistake3", {
              defaultValue:
                "Using new debt to repeatedly cover ordinary spending.",
            })}
          </li>

          <li>
            {t("debtArticleMistake4", {
              defaultValue:
                "Putting every available euro toward debt while keeping no emergency reserve.",
            })}
          </li>

          <li>
            {t("debtArticleMistake5", {
              defaultValue:
                "Ignoring a payment problem instead of contacting the lender or seeking appropriate advice.",
            })}
          </li>
        </ul>

      </section>


      {/* ==================================================
          11. REVIEW PROGRESS
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleReviewTitle", {
            defaultValue: "Review your progress regularly",
          })}
        </h2>

        <p>
          {t("debtArticleReviewText1", {
            defaultValue:
              "Check your debt balances regularly and compare them with previous months. A simple record can show whether your total debt is moving in the direction you want.",
          })}
        </p>

        <p>
          {t("debtArticleReviewText2", {
            defaultValue:
              "When one debt is fully repaid, review your budget. The payment that has become available can potentially be redirected toward another debt, savings or another financial goal.",
          })}
        </p>

      </section>


      {/* ==================================================
          FAQ
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleFaqTitle", {
            defaultValue: "Frequently asked questions",
          })}
        </h2>

        <h3>
          {t("debtArticleFaq1Question", {
            defaultValue: "Should I pay off debt before saving?",
          })}
        </h3>

        <p>
          {t("debtArticleFaq1Answer", {
            defaultValue:
              "There is no single answer for every situation. Required payments should be maintained, while a basic cash reserve can help with unexpected expenses. The balance between saving and additional debt repayment depends on factors such as interest rates, financial stability and your ability to handle emergencies.",
          })}
        </p>

        <h3>
          {t("debtArticleFaq2Question", {
            defaultValue: "Should I always pay the highest-interest debt first?",
          })}
        </h3>

        <p>
          {t("debtArticleFaq2Answer", {
            defaultValue:
              "It is a common repayment strategy because directing extra money toward a higher-interest debt can reduce the amount of interest charged compared with focusing on a lower-interest debt. However, your overall circumstances and loan terms should also be considered.",
          })}
        </p>

        <h3>
          {t("debtArticleFaq3Question", {
            defaultValue: "Is having debt always bad?",
          })}
        </h3>

        <p>
          {t("debtArticleFaq3Answer", {
            defaultValue:
              "Not necessarily. Some borrowing can finance a long-term purchase or investment, but debt creates an obligation that must be repaid. The cost, risk and affordability of the borrowing are important factors.",
          })}
        </p>

        <h3>
          {t("debtArticleFaq4Question", {
            defaultValue: "Should I use savings to pay off debt?",
          })}
        </h3>

        <p>
          {t("debtArticleFaq4Answer", {
            defaultValue:
              "It depends on the circumstances. Using savings can reduce debt and future interest costs, but using all available cash can leave you vulnerable to unexpected expenses. Consider the debt cost, your emergency reserve and your financial stability before making a decision.",
          })}
        </p>

        <h3>
          {t("debtArticleFaq5Question", {
            defaultValue: "What should I do if I cannot make a debt payment?",
          })}
        </h3>

        <p>
          {t("debtArticleFaq5Answer", {
            defaultValue:
              "Review your budget and contact the lender as early as possible. Depending on the agreement and local rules, there may be options for changing the payment arrangement or seeking assistance. Avoid simply ignoring the payment.",
          })}
        </p>

      </section>


      {/* ==================================================
          PRACTICAL SUMMARY
      ================================================== */}

      <section>

        <h2>
          {t("debtArticleSummaryTitle", {
            defaultValue: "A practical debt-management checklist",
          })}
        </h2>

        <p>
          {t("debtArticleSummaryIntro", {
            defaultValue:
              "A simple system can make debt easier to understand and manage:",
          })}
        </p>

        <ol>
          <li>
            {t("debtArticleSummary1", {
              defaultValue: "List every debt and its current balance.",
            })}
          </li>

          <li>
            {t("debtArticleSummary2", {
              defaultValue:
                "Record interest rates, fees and required payments.",
            })}
          </li>

          <li>
            {t("debtArticleSummary3", {
              defaultValue:
                "Include required debt payments in your monthly budget.",
            })}
          </li>

          <li>
            {t("debtArticleSummary4", {
              defaultValue:
                "Choose a consistent approach for making additional repayments.",
            })}
          </li>

          <li>
            {t("debtArticleSummary5", {
              defaultValue:
                "Avoid unnecessary new borrowing while reducing existing debt.",
            })}
          </li>

          <li>
            {t("debtArticleSummary6", {
              defaultValue:
                "Keep some money available for unexpected expenses.",
            })}
          </li>

          <li>
            {t("debtArticleSummary7", {
              defaultValue:
                "Review your balances and budget regularly.",
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
            {t("debtArticleFinalTipTitle", {
              defaultValue: "The key principle",
            })}
          </strong>

          <p>
            {t("debtArticleFinalTipText", {
              defaultValue:
                "Debt becomes easier to manage when you know exactly what you owe, understand what it costs and make repayment part of your regular financial plan.",
            })}
          </p>

        </div>

      </section>


      {/* ==================================================
          IMPORTANT NOTICE
      ================================================== */}

      <section className="article-notice">

        <strong>
          {t("importantNotice", {
            defaultValue: "Important notice",
          })}
        </strong>

        <p>
          {t("debtArticleEnd", {
            defaultValue:
              "Debt-management decisions depend on individual circumstances, loan agreements, interest rates, local laws and other financial obligations. This guide provides general educational information and is not individualized financial advice.",
          })}
        </p>

      </section>

    </ArticleLayout>
  );
}

export default UnderstandingDebt;