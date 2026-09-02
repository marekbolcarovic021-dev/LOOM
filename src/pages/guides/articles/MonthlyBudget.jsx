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
          1. Calculate your income
        </h2>

        <p>
          Start by calculating how much money you
          receive each month.
        </p>

        <p>
          Include your regular salary and other
          reliable sources of income.
        </p>

        <p>
          If your income changes from month to month,
          use a conservative estimate rather than
          assuming your highest possible income.
        </p>

      </section>


      {/* ==================================================
          2. LIST REGULAR EXPENSES
      ================================================== */}

      <section>

        <h2>
          2. List your regular expenses
        </h2>

        <p>
          Write down expenses that you normally have
          every month.
        </p>

        <ul>
          <li>Rent or mortgage</li>
          <li>Utilities</li>
          <li>Insurance</li>
          <li>Debt payments</li>
          <li>Subscriptions</li>
          <li>Transportation</li>
        </ul>

        <p>
          These expenses are usually easier to predict
          because they do not change significantly from
          month to month.
        </p>

      </section>


      {/* ==================================================
          3. TRACK EVERYDAY SPENDING
      ================================================== */}

      <section>

        <h2>
          3. Track your everyday spending
        </h2>

        <p>
          Next, look at expenses that can change from
          month to month.
        </p>

        <ul>
          <li>Food</li>
          <li>Shopping</li>
          <li>Entertainment</li>
          <li>Eating out</li>
          <li>Other personal spending</li>
        </ul>

        <p>
          Looking at your previous few months can help
          you estimate these expenses more realistically.
        </p>

      </section>


      {/* ==================================================
          4. COMPARE INCOME AND EXPENSES
      ================================================== */}

      <section>

        <h2>
          4. Compare your income and expenses
        </h2>

        <p>
          Add your expected expenses together and
          compare the total with your income.
        </p>

        <div className="article-tip">

          <strong>
            Simple calculation
          </strong>

          <p>
            Income − Expenses = Money left over
          </p>

        </div>

        <p>
          If your expenses are higher than your income,
          you need to reduce spending, increase income,
          or adjust your financial plan.
        </p>

      </section>


      {/* ==================================================
          5. GIVE YOUR REMAINING MONEY A PURPOSE
      ================================================== */}

      <section>

        <h2>
          5. Give your remaining money a purpose
        </h2>

        <p>
          If you have money left after your planned
          expenses, decide what you want to do with it.
        </p>

        <ul>
          <li>Build an emergency fund</li>
          <li>Save for a specific goal</li>
          <li>Pay down debt</li>
          <li>Invest for the long term</li>
          <li>Keep some money available for flexible spending</li>
        </ul>

      </section>


      {/* ==================================================
          6. REVIEW YOUR BUDGET
      ================================================== */}

      <section>

        <h2>
          6. Review your budget regularly
        </h2>

        <p>
          A budget is not something you create once
          and never change.
        </p>

        <p>
          Review your actual spending at the end of
          each month and adjust your plan when your
          income or expenses change.
        </p>

        <p>
          The goal is not to predict every expense
          perfectly. The goal is to understand where
          your money goes and make deliberate decisions
          about it.
        </p>

      </section>


      {/* ==================================================
          QUICK SUMMARY
      ================================================== */}

      <section>

        <h2>
          A simple monthly budget
        </h2>

        <ol>
          <li>Calculate your income.</li>
          <li>List your regular expenses.</li>
          <li>Estimate your everyday spending.</li>
          <li>Compare your income with your expenses.</li>
          <li>Decide what to do with the money left over.</li>
          <li>Review and adjust your budget each month.</li>
        </ol>

      </section>

    </ArticleLayout>
  );
}

export default MonthlyBudget;