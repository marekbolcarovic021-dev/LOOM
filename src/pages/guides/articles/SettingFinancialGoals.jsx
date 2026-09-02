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
          1. Make the goal specific
        </h2>

        <p>
          Start by deciding exactly what you want
          to achieve.
        </p>

        <p>
          Instead of saying "I want to save more",
          define a specific target such as saving
          €2,000 for a particular purpose.
        </p>

        <p>
          A specific target makes it easier to measure
          your progress.
        </p>

      </section>


      {/* ==================================================
          2. SET A DEADLINE
      ================================================== */}

      <section>

        <h2>
          2. Set a deadline
        </h2>

        <p>
          Decide when you want to reach the goal.
        </p>

        <p>
          A deadline turns the goal into something
          you can plan for rather than an open-ended
          intention.
        </p>

        <div className="article-tip">

          <strong>
            Keep the deadline realistic
          </strong>

          <p>
            A deadline that requires an amount you
            cannot realistically afford each month
            will make the plan difficult to maintain.
          </p>

        </div>

      </section>


      {/* ==================================================
          3. CALCULATE THE MONTHLY TARGET
      ================================================== */}

      <section>

        <h2>
          3. Calculate how much you need each month
        </h2>

        <p>
          Once you know the amount you want to reach
          and the time available, calculate the amount
          you need to set aside regularly.
        </p>

        <div className="article-tip">

          <strong>
            Simple calculation
          </strong>

          <p>
            Amount still needed ÷ Number of months
            = Approximate monthly amount
          </p>

        </div>

        <p>
          For example, if you need €1,200 and have
          12 months, the target is approximately
          €100 per month.
        </p>

      </section>


      {/* ==================================================
          4. CHECK YOUR BUDGET
      ================================================== */}

      <section>

        <h2>
          4. Check whether the goal fits your budget
        </h2>

        <p>
          Compare the monthly amount required for
          the goal with your current income and
          expenses.
        </p>

        <p>
          If the amount is too high, you may need
          to extend the deadline, reduce the target,
          reduce other spending, or find additional
          income.
        </p>

        <p>
          Do not create a savings target that leaves
          you unable to cover your normal expenses.
        </p>

      </section>


      {/* ==================================================
          5. KEEP THE MONEY SEPARATE
      ================================================== */}

      <section>

        <h2>
          5. Make the goal easy to track
        </h2>

        <p>
          Keeping money for a specific goal separate
          from everyday spending can make it easier
          to see how much you have already saved.
        </p>

        <p>
          You can also track the goal using a simple
          progress calculation:
        </p>

        <div className="article-tip">

          <strong>
            Progress
          </strong>

          <p>
            Amount saved ÷ Target amount × 100
            = Percentage completed
          </p>

        </div>

      </section>


      {/* ==================================================
          6. REVIEW THE PLAN
      ================================================== */}

      <section>

        <h2>
          6. Review the goal regularly
        </h2>

        <p>
          Your income and expenses can change, so
          review the plan regularly.
        </p>

        <p>
          If your circumstances change, adjust the
          monthly amount or deadline rather than
          abandoning the goal completely.
        </p>

      </section>


      {/* ==================================================
          QUICK SUMMARY
      ================================================== */}

      <section>

        <h2>
          A simple financial goal plan
        </h2>

        <ol>
          <li>Choose a specific target.</li>
          <li>Set a realistic deadline.</li>
          <li>Calculate the required monthly amount.</li>
          <li>Check that it fits your budget.</li>
          <li>Track your progress.</li>
          <li>Review and adjust the plan when necessary.</li>
        </ol>

      </section>

    </ArticleLayout>
  );
}

export default SettingFinancialGoals;