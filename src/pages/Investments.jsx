import BottomNav from "../components/BottomNav";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFinance } from "../context/FinanceContext";
import { formatCurrency } from "../Utils/currency";
import Modal from "../components/Modal";

function Investments() {
  const { t, i18n } = useTranslation();

  const {
    investments,
    setInvestments,
    profile,
  } = useFinance();

  // ==================================================
  // ADD INVESTMENT FORM
  // ==================================================

  const [assetName, setAssetName] =
    useState("");

  const [assetType, setAssetType] =
    useState("");

  const [
    investedAmount,
    setInvestedAmount,
  ] = useState("");

  const [
    currentValue,
    setCurrentValue,
  ] = useState("");

  // ==================================================
  // UPDATE MODAL
  // ==================================================

  const [
    editingInvestment,
    setEditingInvestment,
  ] = useState(null);

  const [
    newInvestedAmount,
    setNewInvestedAmount,
  ] = useState("");

  const [
    newCurrentValue,
    setNewCurrentValue,
  ] = useState("");

  // ==================================================
  // ADD INVESTMENT
  // ==================================================

  function addInvestment() {
    // Required text/select fields
    if (
      !assetName.trim() ||
      !assetType ||
      investedAmount === "" ||
      currentValue === ""
    ) {
      return;
    }

    const numericInvestedAmount =
      Number(investedAmount);

    const numericCurrentValue =
      Number(currentValue);

    // Validate numbers
    if (
      !Number.isFinite(
        numericInvestedAmount
      ) ||
      !Number.isFinite(
        numericCurrentValue
      )
    ) {
      return;
    }

    // Investment values cannot be negative
    if (
      numericInvestedAmount < 0 ||
      numericCurrentValue < 0
    ) {
      return;
    }

    const newInvestment = {
      id: Date.now(),

      name:
        assetName
          .trim()
          .charAt(0)
          .toUpperCase() +
        assetName.trim().slice(1),

      type: assetType,

      investedAmount:
        numericInvestedAmount,

      currentValue:
        numericCurrentValue,
    };

    setInvestments(
      (prevInvestments) => [
        ...prevInvestments,
        newInvestment,
      ]
    );

    // Reset form
    setAssetName("");
    setAssetType("");
    setInvestedAmount("");
    setCurrentValue("");
  }

  // ==================================================
  // OPEN UPDATE MODAL
  // ==================================================

  function updateInvestment(id) {
    const investment =
      investments.find(
        (inv) =>
          inv.id === id
      );

    if (!investment) {
      return;
    }

    setEditingInvestment(
      investment
    );

    // Load BOTH values into the modal
    setNewInvestedAmount(
      investment.investedAmount ?? ""
    );

    setNewCurrentValue(
      investment.currentValue ?? ""
    );
  }

  // ==================================================
  // SAVE UPDATED INVESTMENT
  // ==================================================

  function saveInvestment() {
    if (!editingInvestment) {
      return;
    }

    if (
      newInvestedAmount === "" ||
      newCurrentValue === ""
    ) {
      return;
    }

    const numericInvestedAmount =
      Number(
        newInvestedAmount
      );

    const numericCurrentValue =
      Number(
        newCurrentValue
      );

    // Validate numbers
    if (
      !Number.isFinite(
        numericInvestedAmount
      ) ||
      !Number.isFinite(
        numericCurrentValue
      )
    ) {
      return;
    }

    // Prevent negative values
    if (
      numericInvestedAmount < 0 ||
      numericCurrentValue < 0
    ) {
      return;
    }

    setInvestments(
      (prevInvestments) =>
        prevInvestments.map(
          (investment) =>
            investment.id ===
            editingInvestment.id
              ? {
                  ...investment,

                  investedAmount:
                    numericInvestedAmount,

                  currentValue:
                    numericCurrentValue,
                }
              : investment
        )
    );

    // Close modal
    setEditingInvestment(
      null
    );

    setNewInvestedAmount("");
    setNewCurrentValue("");
  }

  // ==================================================
  // CLOSE UPDATE MODAL
  // ==================================================

  function closeUpdateModal() {
    setEditingInvestment(null);

    setNewInvestedAmount("");
    setNewCurrentValue("");
  }

  // ==================================================
  // DELETE
  // ==================================================

  function deleteInvestment(id) {
    setInvestments(
      (prevInvestments) =>
        prevInvestments.filter(
          (investment) =>
            investment.id !== id
        )
    );
  }

  // ==================================================
  // TOTAL CURRENT PORTFOLIO VALUE
  // ==================================================

  const totalPortfolioValue =
    investments.reduce(
      (
        sum,
        investment
      ) =>
        sum +
        Number(
          investment.currentValue ||
            0
        ),
      0
    );

  // ==================================================
  // PORTFOLIO ALLOCATION
  // ==================================================
  //
  // Allocation is based on CURRENT VALUE.
  // This is correct because it represents the
  // current composition of the portfolio.
  //
  // ==================================================

  const allocation = {};

  investments.forEach(
    (investment) => {
      if (
        !allocation[
          investment.type
        ]
      ) {
        allocation[
          investment.type
        ] = 0;
      }

      allocation[
        investment.type
      ] += Number(
        investment.currentValue ||
          0
      );
    }
  );

  // ==================================================
  // ASSET TYPE TRANSLATIONS
  // ==================================================

  const assetTypeTranslations = {
    Stock: t("stock"),
    ETF: "ETF",
    Crypto: t("crypto"),
    "Real Estate":
      t("realEstate"),
    Cash: t("cash"),
  };

  return (
    <div className="goals-page">

      <h1>
        {t("investments")}
      </h1>

      {/* ==================================================
          ADD INVESTMENT FORM
          ================================================== */}

      <div className="goal-form">

        {/* ASSET NAME */}

        <input
          type="text"
          placeholder={t(
            "assetName"
          )}
          value={assetName}
          onChange={(e) =>
            setAssetName(
              e.target.value
            )
          }
        />

        {/* ASSET TYPE */}

        <select
          value={assetType}
          onChange={(e) =>
            setAssetType(
              e.target.value
            )
          }
        >

          <option value="">
            {t(
              "selectAssetType"
            )}
          </option>

          <option value="Stock">
            {t("stock")}
          </option>

          <option value="ETF">
            ETF
          </option>

          <option value="Crypto">
            {t("crypto")}
          </option>

          <option value="Real Estate">
            {t("realEstate")}
          </option>

          <option value="Cash">
            {t("cash")}
          </option>

        </select>

        {/* INVESTED AMOUNT */}

        <input
          type="number"
          min="0"
          step="any"
          placeholder={`${t(
            "investedAmount"
          )} (${profile.currency})`}
          value={
            investedAmount
          }
          onChange={(e) =>
            setInvestedAmount(
              e.target.value
            )
          }
        />

        {/* CURRENT VALUE */}

        <input
          type="number"
          min="0"
          step="any"
          placeholder={`${t(
            "currentValue"
          )} (${profile.currency})`}
          value={
            currentValue
          }
          onChange={(e) =>
            setCurrentValue(
              e.target.value
            )
          }
        />

        {/* ADD */}

        <button
          onClick={
            addInvestment
          }
        >
          {t(
            "addInvestment"
          )}
        </button>

      </div>

      {/* ==================================================
          TOTAL PORTFOLIO VALUE
          ================================================== */}

      <div className="card">

        <h2>
          {t(
            "totalPortfolioValue"
          )}
        </h2>

        <div className="portfolio-total">

          {formatCurrency(
            totalPortfolioValue,
            profile.currency,
            i18n.language
          )}

        </div>

      </div>

      {/* ==================================================
          PORTFOLIO ALLOCATION
          ================================================== */}

      <div className="card">

        <h2>
          {t(
            "portfolioAllocation"
          )}
        </h2>

        {Object.keys(
          allocation
        ).length === 0 ? (

          <p
            style={{
              textAlign:
                "center",
              padding:
                "25px",
            }}
          >
            {t(
              "noInvestmentsYet"
            )}
          </p>

        ) : (

          Object.entries(
            allocation
          ).map(
            ([type, value]) => {

              const percentage =
                totalPortfolioValue >
                0
                  ? (
                      (value /
                        totalPortfolioValue) *
                      100
                    ).toFixed(1)
                  : "0.0";

              return (

                <div
                  key={type}
                  className="allocation-row"
                >

                  <span>
                    {assetTypeTranslations[
                      type
                    ] || type}
                  </span>

                  <span>

                    {percentage}% (

                    {formatCurrency(
                      value,
                      profile.currency,
                      i18n.language
                    )}

                    )

                  </span>

                </div>

              );
            }
          )

        )}

      </div>

      {/* ==================================================
          INVESTMENT CARDS
          ================================================== */}

      {investments.length ===
      0 ? (

        <div className="card">

          <p
            style={{
              textAlign:
                "center",
              padding:
                "30px",
            }}
          >

            {t(
              "noInvestmentsYet"
            )}

            <br />

            {t(
              "createYourFirstInvestment"
            )}

          </p>

        </div>

      ) : (

        investments.map(
          (investment) => {

            const numericInvested =
              Number(
                investment.investedAmount ||
                  0
              );

            const numericCurrent =
              Number(
                investment.currentValue ||
                  0
              );

            // PROFIT / LOSS

            const profit =
              numericCurrent -
              numericInvested;

            const profitPercent =
              numericInvested >
              0
                ? (
                    (profit /
                      numericInvested) *
                    100
                  ).toFixed(1)
                : "0.0";

            return (

              <div
                className="goal-card"
                key={
                  investment.id
                }
              >

                {/* NAME */}

                <h2>
                  {
                    investment.name
                  }
                </h2>

                {/* TYPE */}

                <p>

                  <span className="label">
                    {t(
                      "type"
                    )}:
                  </span>

                  <span className="value">

                    {" "}

                    {
                      assetTypeTranslations[
                        investment.type
                      ] ||
                      investment.type
                    }

                  </span>

                </p>

                {/* INVESTED */}

                <p>

                  <span className="label">
                    {t(
                      "invested"
                    )}:
                  </span>

                  <span className="value">

                    {" "}

                    {formatCurrency(
                      numericInvested,
                      profile.currency,
                      i18n.language
                    )}

                  </span>

                </p>

                {/* CURRENT VALUE */}

                <p>

                  <span className="label">
                    {t(
                      "currentValue"
                    )}:
                  </span>

                  <span className="value">

                    {" "}

                    {formatCurrency(
                      numericCurrent,
                      profile.currency,
                      i18n.language
                    )}

                  </span>

                </p>

                {/* PROFIT / LOSS */}

                <p
                  className={
                    profit >= 0
                      ? "profit-positive"
                      : "profit-negative"
                  }
                >

                  {t(
                    "profitLoss"
                  )}:

                  {" "}

                  {formatCurrency(
                    profit,
                    profile.currency,
                    i18n.language
                  )}

                  {" "}

                  (
                  {profit >= 0
                    ? "+"
                    : ""}
                  {
                    profitPercent
                  }%)

                </p>

                {/* BUTTONS */}

                <div className="investment-buttons">

                  <button
                    className="update-btn"
                    onClick={() =>
                      updateInvestment(
                        investment.id
                      )
                    }
                  >
                    {t(
                      "updateValue"
                    )}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteInvestment(
                        investment.id
                      )
                    }
                  >
                    {t("delete")}
                  </button>

                </div>

              </div>

            );
          }
        )

      )}

      {/* ==================================================
          UPDATE MODAL
          ================================================== */}

      {editingInvestment && (

        <Modal
          title={t(
            "updateValue"
          )}
          saveText={t(
            "saveChanges"
          )}
          cancelText={t(
            "cancel"
          )}
          onClose={
            closeUpdateModal
          }
          onSave={
            saveInvestment
          }
        >

          {/* INVESTMENT NAME */}

          <h3
            style={{
              textAlign:
                "center",
              color: "#fff",
              marginBottom:
                "18px",
            }}
          >
            {
              editingInvestment.name
            }
          </h3>

          {/* INVESTED AMOUNT */}

          <input
            type="number"
            min="0"
            step="any"
            value={
              newInvestedAmount
            }
            onChange={(e) =>
              setNewInvestedAmount(
                e.target.value
              )
            }
            placeholder={`${t(
              "investedAmount"
            )} (${profile.currency})`}
          />

          {/* CURRENT VALUE */}

          <input
            type="number"
            min="0"
            step="any"
            value={
              newCurrentValue
            }
            onChange={(e) =>
              setNewCurrentValue(
                e.target.value
              )
            }
            placeholder={`${t(
              "currentValue"
            )} (${profile.currency})`}
            autoFocus
          />

        </Modal>

      )}

      <BottomNav />

    </div>
  );
}

export default Investments;