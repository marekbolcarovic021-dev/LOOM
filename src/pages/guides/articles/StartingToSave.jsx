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
          "A simple approach to building savings without making your monthly budget unnecessarily complicated.",
      })}
    >

      {/* ==================================================
          1. START WITH A REALISTIC AMOUNT
      ================================================== */}

      <section>

        <h2>
          1. Start with a realistic amount
        </h2>

        <p>
          You do not need to save a large amount
          immediately. Start with an amount that
          you can realistically set aside every month.
        </p>

        <p>
          A smaller amount saved consistently is
          usually more useful than setting an unrealistic
          target that you cannot maintain.
        </p>

      </section>


      {/* ==================================================
          2. PAY YOURSELF FIRST
      ================================================== */}

      <section>

        <h2>
          2. Save before you spend the rest
        </h2>

        <p>
          Consider treating saving as one of your
          regular monthly expenses.
        </p>

        <p>
          When possible, move your planned savings
          shortly after receiving your income instead
          of waiting to see what is left at the end
          of the month.
        </p>

      </section>


      {/* ==================================================
          3. BUILD AN EMERGENCY FUND
      ================================================== */}

      <section>

        <h2>
          3. Build an emergency fund
        </h2>

        <p>
          An emergency fund is money kept aside for
          unexpected expenses or a temporary loss
          of income.
        </p>

        <p>
          Examples include an unexpected repair,
          medical expense, or period without regular
          income.
        </p>

        <div className="article-tip">

          <strong>
            Keep it accessible
          </strong>

          <p>
            Emergency savings should generally be
            kept somewhere you can access when you
            actually need them, rather than relying
            on money that may fluctuate in value.
          </p>

        </div>

      </section>


      {/* ==================================================
          4. SAVE FOR SPECIFIC GOALS
      ================================================== */}

      <section>

        <h2>
          4. Give your savings a purpose
        </h2>

        <p>
          Saving becomes easier to plan when you know
          what the money is for.
        </p>

        <ul>
          <li>Emergency expenses</li>
          <li>Travel</li>
          <li>A car or other large purchase</li>
          <li>Home improvements</li>
          <li>Future expenses</li>
        </ul>

        <p>
          A specific goal also makes it easier to
          calculate how much you need to save each
          month.
        </p>

      </section>


      {/* ==================================================
          5. AUTOMATE YOUR SAVING
      ================================================== */}

      <section>

        <h2>
          5. Make saving automatic
        </h2>

        <p>
          If your bank allows it, set up an automatic
          transfer to your savings account after your
          income arrives.
        </p>

        <p>
          This reduces the need to remember to save
          every month and can make saving part of your
          normal routine.
        </p>

      </section>


      {/* ==================================================
          6. INCREASE SAVING OVER TIME
      ================================================== */}

      <section>

        <h2>
          6. Increase your savings gradually
        </h2>

        <p>
          When your income increases or one of your
          regular expenses disappears, consider
          directing part of the extra money toward
          savings.
        </p>

        <p>
          You can also review your spending regularly
          and redirect unnecessary expenses toward
          your savings goals.
        </p>

      </section>


      {/* ==================================================
          QUICK SUMMARY
      ================================================== */}

      <section>

        <h2>
          A simple saving plan
        </h2>

        <ol>
          <li>Choose a realistic monthly amount.</li>
          <li>Set the money aside regularly.</li>
          <li>Build an emergency reserve.</li>
          <li>Create separate goals for planned expenses.</li>
          <li>Automate saving when possible.</li>
          <li>Increase the amount as your situation allows.</li>
        </ol>

      </section>

    </ArticleLayout>
  );
}

export default StartingToSave;