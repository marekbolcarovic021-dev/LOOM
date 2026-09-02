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
          "A simple guide to understanding what you owe, what it costs and how to approach repayment.",
      })}
    >

      {/* ==================================================
          1. KNOW WHAT YOU OWE
      ================================================== */}

      <section>

        <h2>
          1. Know what you owe
        </h2>

        <p>
          Start by making a list of your debts.
          Include the current balance, required payment
          and any important terms for each debt.
        </p>

        <p>
          Seeing everything in one place makes it easier
          to understand your overall debt situation.
        </p>

      </section>


      {/* ==================================================
          2. UNDERSTAND THE COST
      ================================================== */}

      <section>

        <h2>
          2. Understand what your debt costs
        </h2>

        <p>
          Interest and other charges can increase the
          total amount you pay over time.
        </p>

        <p>
          Pay attention to the interest rate, fees and
          repayment period when reviewing a debt.
        </p>

      </section>


      {/* ==================================================
          3. PRIORITIZE PAYMENTS
      ================================================== */}

      <section>

        <h2>
          3. Make your required payments first
        </h2>

        <p>
          Missing required payments can lead to additional
          costs and other consequences.
        </p>

        <p>
          Make sure your regular debt payments are included
          in your monthly budget before deciding how to use
          money for other purposes.
        </p>

      </section>


      {/* ==================================================
          4. CHOOSE A REPAYMENT APPROACH
      ================================================== */}

      <section>

        <h2>
          4. Choose a repayment approach
        </h2>

        <p>
          After covering your required payments, you can
          decide how to direct additional money toward
          your debts.
        </p>

        <p>
          Two common approaches are:
        </p>

        <ul>
          <li>
            Paying extra toward the debt with the highest
            interest rate.
          </li>

          <li>
            Paying extra toward the smallest balance first.
          </li>
        </ul>

        <p>
          The first approach can reduce interest costs,
          while the second can provide quicker visible
          progress.
        </p>

      </section>


      {/* ==================================================
          5. AVOID NEW DEBT
      ================================================== */}

      <section>

        <h2>
          5. Be careful about taking on new debt
        </h2>

        <p>
          Paying down existing debt becomes harder if new
          balances continue to build.
        </p>

        <p>
          Before borrowing more money, consider whether
          the new payment fits comfortably into your
          existing budget.
        </p>

      </section>


      {/* ==================================================
          6. BUILD SOME SAVINGS
      ================================================== */}

      <section>

        <h2>
          6. Keep some money available for unexpected costs
        </h2>

        <p>
          Unexpected expenses can make debt repayment more
          difficult if you have no money available to cover
          them.
        </p>

        <p>
          Even a small emergency reserve can help reduce
          the need to rely on new borrowing when something
          unexpected happens.
        </p>

      </section>


      {/* ==================================================
          7. REVIEW YOUR PROGRESS
      ================================================== */}

      <section>

        <h2>
          7. Review your debt regularly
        </h2>

        <p>
          Keep track of your balances and payments over
          time.
        </p>

        <p>
          As your balances decrease, review your budget
          and decide how you want to use the money that
          becomes available.
        </p>

      </section>


      {/* ==================================================
          QUICK SUMMARY
      ================================================== */}

      <section>

        <h2>
          A simple debt checklist
        </h2>

        <ol>
          <li>List all your debts.</li>
          <li>Understand their interest and fees.</li>
          <li>Make required payments on time.</li>
          <li>Choose a repayment approach.</li>
          <li>Be careful about taking on new debt.</li>
          <li>Keep some money available for emergencies.</li>
          <li>Review your progress regularly.</li>
        </ol>

      </section>


      {/* ==================================================
          IMPORTANT NOTICE
      ================================================== */}

      <section className="article-notice">

        <strong>
          Important notice
        </strong>

        <p>
          The best way to manage debt depends on your
          individual circumstances, including your income,
          expenses, interest rates and financial obligations.
          This guide provides general educational information
          and is not individualized financial advice.
        </p>

      </section>

    </ArticleLayout>
  );
}

export default UnderstandingDebt;