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
          1. Know how much money comes in
        </h2>

        <p>
          Start with the money you regularly receive.
          This can include employment income, business
          income or other reliable sources.
        </p>

        <p>
          If your income changes from month to month,
          use a realistic estimate rather than assuming
          your best month will repeat.
        </p>

      </section>


      {/* ==================================================
          2. KNOW YOUR SPENDING
      ================================================== */}

      <section>

        <h2>
          2. Understand where your money goes
        </h2>

        <p>
          Look at your regular and variable expenses.
          This shows how much of your income is being
          used and where you may have room to adjust.
        </p>

        <p>
          Reviewing your actual spending is usually
          more useful than relying on estimates.
        </p>

      </section>


      {/* ==================================================
          3. KNOW WHAT YOU OWN
      ================================================== */}

      <section>

        <h2>
          3. Know what you own
        </h2>

        <p>
          Your financial position includes the assets
          you own.
        </p>

        <p>
          Depending on your situation, these may include:
        </p>

        <ul>
          <li>Money in bank accounts</li>
          <li>Savings</li>
          <li>Investments</li>
          <li>Property</li>
          <li>Other valuable assets</li>
        </ul>

        <p>
          Knowing what you own gives you a clearer view
          of your overall financial position.
        </p>

      </section>


      {/* ==================================================
          4. KNOW WHAT YOU OWE
      ================================================== */}

      <section>

        <h2>
          4. Know what you owe
        </h2>

        <p>
          Debts are another important part of your
          financial situation.
        </p>

        <p>
          Depending on your circumstances, this may
          include mortgages, personal loans, credit-card
          balances or other outstanding obligations.
        </p>

        <p>
          Keep track of both the amount owed and the
          payments you are required to make.
        </p>

      </section>


      {/* ==================================================
          5. UNDERSTAND NET WORTH
      ================================================== */}

      <section>

        <h2>
          5. Understand your net worth
        </h2>

        <p>
          Net worth is a simple way to compare what you
          own with what you owe.
        </p>

        <div className="article-tip">

          <strong>
            Simple calculation
          </strong>

          <p>
            Assets − Debts = Net worth
          </p>

        </div>

        <p>
          For example, if you own €50,000 in assets
          and owe €20,000, your net worth is €30,000.
        </p>

        <p>
          Net worth is only one measure of your financial
          situation. It does not show everything about
          your finances or your ability to handle
          short-term expenses.
        </p>

      </section>


      {/* ==================================================
          6. LOOK AT CASH FLOW
      ================================================== */}

      <section>

        <h2>
          6. Look at your monthly cash flow
        </h2>

        <p>
          Your cash flow shows what happens to your money
          during a period.
        </p>

        <div className="article-tip">

          <strong>
            Simple calculation
          </strong>

          <p>
            Income − Spending = Money available
          </p>

        </div>

        <p>
          If you regularly spend more than you receive,
          the difference needs to be addressed.
        </p>

        <p>
          If you consistently have money left over,
          you can decide whether to use it for savings,
          debt repayment, financial goals or other
          priorities.
        </p>

      </section>


      {/* ==================================================
          7. REVIEW REGULARLY
      ================================================== */}

      <section>

        <h2>
          7. Review your financial picture
        </h2>

        <p>
          Your financial situation changes over time.
          Income can change, debts can be repaid,
          savings can grow and expenses can increase.
        </p>

        <p>
          Reviewing your finances regularly helps you
          notice these changes and adjust your plans.
        </p>

      </section>


      {/* ==================================================
          QUICK SUMMARY
      ================================================== */}

      <section>

        <h2>
          Your financial picture at a glance
        </h2>

        <ol>
          <li>Know your income.</li>
          <li>Track your spending.</li>
          <li>List what you own.</li>
          <li>List what you owe.</li>
          <li>Calculate your net worth.</li>
          <li>Check your monthly cash flow.</li>
          <li>Review everything regularly.</li>
        </ol>

      </section>

    </ArticleLayout>
  );
}

export default UnderstandingYourFinances;