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

  // Update modal

  const [
    editingInvestment,
    setEditingInvestment,
  ] = useState(null);

  const [
    newCurrentValue,
    setNewCurrentValue,
  ] = useState("");

  // ADD INVESTMENT

  function addInvestment() {
    if (
      !assetName ||
      !assetType ||
      !investedAmount ||
      !currentValue
    )
      return;

    const newInvestment = {
      id: Date.now(),

      name:
        assetName.charAt(0).toUpperCase() +
        assetName.slice(1),

      type: assetType,

      investedAmount: Number(
        investedAmount
      ),

      currentValue: Number(
        currentValue
      ),
    };

    setInvestments([
      ...investments,
      newInvestment,
    ]);

    setAssetName("");
    setAssetType("");
    setInvestedAmount("");
    setCurrentValue("");
  }

  // OPEN UPDATE MODAL

  function updateInvestment(id) {
    const investment =
      investments.find(
        (inv) => inv.id === id
      );

    setEditingInvestment(
      investment
    );

    setNewCurrentValue(
      investment.currentValue
    );
  }

  // SAVE VALUE

  function saveInvestment() {
    setInvestments(
      investments.map((inv) =>
        inv.id === editingInvestment.id
          ? {
              ...inv,
              currentValue:
                Number(newCurrentValue),
            }
          : inv
      )
    );

    setEditingInvestment(null);
    setNewCurrentValue("");
  }

  // DELETE

  function deleteInvestment(id) {
    setInvestments(
      investments.filter(
        (inv) => inv.id !== id
      )
    );
  }

  // TOTAL VALUE

  const totalPortfolioValue =
    investments.reduce(
      (sum, investment) =>
        sum +
        Number(
          investment.currentValue || 0
        ),
      0
    );

  // PORTFOLIO ALLOCATION

  const allocation = {};

  investments.forEach(
    (investment) => {
      if (
        !allocation[investment.type]
      ) {
        allocation[investment.type] = 0;
      }

      allocation[
        investment.type
      ] += Number(
        investment.currentValue || 0
      );
    }
  );

  // Translation for asset types

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
    <h1>{t("investments")}</h1>

    {/* FORM */}

    <div className="goal-form">
      <input
        type="text"
        placeholder={t("assetName")}
        value={assetName}
        onChange={(e) =>
          setAssetName(e.target.value)
        }
      />

      <select
        value={assetType}
        onChange={(e) =>
          setAssetType(e.target.value)
        }
      >
        <option value="">
          {t("selectAssetType")}
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

      <input
        type="number"
        placeholder={`${t(
          "investedAmount"
        )} (${profile.currency})`}
        value={investedAmount}
        onChange={(e) =>
          setInvestedAmount(
            e.target.value
          )
        }
      />

      <input
        type="number"
        placeholder={`${t(
          "currentValue"
        )} (${profile.currency})`}
        value={currentValue}
        onChange={(e) =>
          setCurrentValue(
            e.target.value
          )
        }
      />

      <button
        onClick={addInvestment}
      >
        {t("addInvestment")}
      </button>
    </div>

    {/* TOTAL */}

    <div className="card">
      <h2>
        {t("totalPortfolioValue")}
      </h2>

      <div className="portfolio-total">
        {formatCurrency(
          totalPortfolioValue,
          profile.currency,
          i18n.language
        )}
      </div>
    </div>

    {/* ALLOCATION */}

    <div className="card">
      <h2>
        {t("portfolioAllocation")}
      </h2>

      {Object.keys(allocation)
        .length === 0 ? (
        <p
          style={{
            textAlign: "center",
            padding: "25px",
          }}
        >
          {t("noInvestmentsYet")}
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

      {/* INVESTMENT CARDS */}

{investments.length === 0 ? (

  <div className="card">

    <p
      style={{
        textAlign: "center",
        padding: "30px",
      }}
    >
      {t("noInvestmentsYet")}
      <br />
      {t("createYourFirstInvestment")}
    </p>

  </div>

) : (

  investments.map((investment) => {

    const profit =
      investment.currentValue -
      investment.investedAmount;

    const profitPercent =
      investment.investedAmount > 0
        ? (
            (profit /
              investment.investedAmount) *
            100
          ).toFixed(1)
        : "0.0";

    return (

      <div
        className="goal-card"
        key={investment.id}
      >

        <h2>{investment.name}</h2>

        <p>

          <span className="label">
            {t("type")}:
          </span>

          <span className="value">

            {" "}

            {assetTypeTranslations[
              investment.type
            ] || investment.type}

          </span>

        </p>

        <p>

          <span className="label">
            {t("invested")}:
          </span>

          <span className="value">

            {" "}

            {formatCurrency(
              investment.investedAmount,
              profile.currency,
              i18n.language
            )}

          </span>

        </p>

        <p>

          <span className="label">
            {t("currentValue")}:
          </span>

          <span className="value">

            {" "}

            {formatCurrency(
              investment.currentValue,
              profile.currency,
              i18n.language
            )}

          </span>

        </p>

        <p
          className={
            profit >= 0
              ? "profit-positive"
              : "profit-negative"
          }
        >

          {t("profitLoss")}:

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
          {profitPercent}%)

        </p>

        <div className="investment-buttons">

          <button
            className="update-btn"
            onClick={() =>
              updateInvestment(
                investment.id
              )
            }
          >
            {t("updateValue")}
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

  })

)}

{/* UPDATE MODAL */}

{editingInvestment && (

  <Modal
    title={t("updateValue")}
    saveText={t("saveChanges")}
    cancelText={t("cancel")}
    onClose={() => {
      setEditingInvestment(null);
      setNewCurrentValue("");
    }}
    onSave={saveInvestment}
  >

    <h3
      style={{
        textAlign: "center",
        color: "#fff",
        marginBottom: "18px",
      }}
    >
      {editingInvestment.name}
    </h3>

    <input
      type="number"
      value={newCurrentValue}
      onChange={(e) =>
        setNewCurrentValue(
          e.target.value
        )
      }
      placeholder={t(
        "currentValue"
      )}
      autoFocus
    />

  </Modal>

)}

<BottomNav />

</div>
);
}

export default Investments;
