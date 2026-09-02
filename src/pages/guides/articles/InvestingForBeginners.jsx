import { useTranslation } from "react-i18next";

import ArticleLayout from "../../../components/public/articles/ArticleLayout";

function InvestingForBeginners() {
  const { t } = useTranslation();

  return (
    <ArticleLayout
      category={t("investing", {
        defaultValue: "Investing",
      })}
      title={t("investingForBeginnersTitle", {
        defaultValue: "Investing for Beginners",
      })}
      description={t("investingForBeginnersIntro", {
        defaultValue:
          "The basic ideas you should understand before putting money into investments.",
      })}
    >

      {/* ==================================================
          1. WHAT INVESTING MEANS
      ================================================== */}

      <section>

        <h2>
          1. What does investing mean?
        </h2>

        <p>
          Investing means putting money into an asset
          with the expectation that it may increase in
          value or generate income over time.
        </p>

        <p>
          Examples include shares, bonds, funds and
          other investment assets.
        </p>

        <p>
          Unlike money kept as cash, investments can
          increase or decrease in value. There is no
          guaranteed return.
        </p>

      </section>


      {/* ==================================================
          2. INVESTING VS SAVING
      ================================================== */}

      <section>

        <h2>
          2. Saving and investing are not the same
        </h2>

        <p>
          Saving is generally used for money you may
          need in the near future or for unexpected
          expenses.
        </p>

        <p>
          Investing is usually more suitable for money
          you can leave invested for a longer period and
          accept that its value may fluctuate.
        </p>

        <div className="article-tip">

          <strong>
            Think about when you need the money
          </strong>

          <p>
            The shorter your time horizon, the less
            suitable significant investment risk may be
            for money you know you will need soon.
          </p>

        </div>

      </section>


      {/* ==================================================
          3. RISK
      ================================================== */}

      <section>

        <h2>
          3. Understand risk
        </h2>

        <p>
          Every investment carries some level of risk.
          The value of an investment can fall, and you
          may lose some or all of the money you invested.
        </p>

        <p>
          Investments with greater potential returns
          can also involve greater risk.
        </p>

        <p>
          Your ability and willingness to accept losses
          are important when deciding how much investment
          risk is appropriate for a particular goal.
        </p>

      </section>


      {/* ==================================================
          4. TIME HORIZON
      ================================================== */}

      <section>

        <h2>
          4. Consider your time horizon
        </h2>

        <p>
          Your time horizon is how long you expect to
          keep the money invested before you need it.
        </p>

        <p>
          Someone investing for a goal many years away
          may have more time to deal with market
          fluctuations than someone who needs the money
          soon.
        </p>

        <p>
          This is one reason the same investment approach
          may not be appropriate for every financial goal.
        </p>

      </section>


      {/* ==================================================
          5. DIVERSIFICATION
      ================================================== */}

      <section>

        <h2>
          5. Understand diversification
        </h2>

        <p>
          Diversification means spreading your money
          across different investments instead of
          relying heavily on one investment.
        </p>

        <p>
          If one investment performs poorly, other
          investments may perform differently and help
          reduce the impact on the overall portfolio.
        </p>

        <p>
          Diversification does not eliminate investment
          risk or guarantee that you will not lose money.
        </p>

      </section>


      {/* ==================================================
          6. FEES
      ================================================== */}

      <section>

        <h2>
          6. Pay attention to fees
        </h2>

        <p>
          Investment products and services can have
          fees and other costs.
        </p>

        <p>
          Even relatively small ongoing costs can reduce
          the amount of money that remains invested and
          can have a meaningful effect over a long period.
        </p>

        <p>
          Before investing, understand what you are
          paying for and how the costs are charged.
        </p>

      </section>


      {/* ==================================================
          7. AVOID QUICK PROFITS
      ================================================== */}

      <section>

        <h2>
          7. Be careful with promises of easy money
        </h2>

        <p>
          Be cautious when someone promises unusually
          high returns with little or no risk.
        </p>

        <p>
          Claims that an investment is guaranteed,
          risk-free or requires you to act immediately
          can be warning signs.
        </p>

        <div className="article-tip">

          <strong>
            Do your own research
          </strong>

          <p>
            Do not invest simply because someone online
            says that an investment will go up.
            Understand what you are buying and the risks
            involved first.
          </p>

        </div>

      </section>


      {/* ==================================================
          QUICK SUMMARY
      ================================================== */}

      <section>

        <h2>
          Before you invest
        </h2>

        <ol>
          <li>Understand what you are investing in.</li>
          <li>Know when you will need the money.</li>
          <li>Understand the risks.</li>
          <li>Consider diversification.</li>
          <li>Check the fees and other costs.</li>
          <li>Do not rely on promises of guaranteed profits.</li>
          <li>Research the investment before making a decision.</li>
        </ol>

      </section>

    </ArticleLayout>
  );
}

export default InvestingForBeginners;