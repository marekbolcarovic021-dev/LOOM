import BottomNav from "../components/BottomNav";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFinance } from "../context/FinanceContext";
import { formatCurrency } from "../Utils/currency";
import Modal from "../components/Modal";

import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  BarChart3,
  Plus,
  Pencil,
  Trash2,
  Target,
  CircleDollarSign,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

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

    if (
      numericInvestedAmount < 0 ||
      numericCurrentValue < 0
    ) {
      return;
    }

    const cleanName =
      assetName.trim();

    const newInvestment = {
      id: Date.now(),

      name:
        cleanName.charAt(0).toUpperCase() +
        cleanName.slice(1),

      type: assetType,

      investedAmount:
        numericInvestedAmount,

      currentValue:
        numericCurrentValue,
    };

    setInvestments(
      (previousInvestments) => [
        ...previousInvestments,
        newInvestment,
      ]
    );

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
        (item) =>
          item.id === id
      );

    if (!investment) {
      return;
    }

    setEditingInvestment(
      investment
    );

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

    if (
      numericInvestedAmount < 0 ||
      numericCurrentValue < 0
    ) {
      return;
    }

    setInvestments(
      (previousInvestments) =>
        previousInvestments.map(
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

    setEditingInvestment(null);
    setNewInvestedAmount("");
    setNewCurrentValue("");
  }

  // ==================================================
  // CLOSE MODAL
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
      (previousInvestments) =>
        previousInvestments.filter(
          (investment) =>
            investment.id !== id
        )
    );
  }

  // ==================================================
  // PORTFOLIO TOTALS
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

  const totalInvested =
    investments.reduce(
      (
        sum,
        investment
      ) =>
        sum +
        Number(
          investment.investedAmount ||
            0
        ),
      0
    );

  const totalProfit =
    totalPortfolioValue -
    totalInvested;

  const totalProfitPercent =
    totalInvested > 0
      ? (
          (totalProfit /
            totalInvested) *
          100
        ).toFixed(1)
      : "0.0";

  const portfolioIsPositive =
    totalProfit >= 0;

  // ==================================================
  // PORTFOLIO ALLOCATION
  // ==================================================

  const allocation = {};

  investments.forEach(
    (investment) => {
      const type =
        investment.type ||
        "Other";

      if (
        !allocation[type]
      ) {
        allocation[type] = 0;
      }

      allocation[type] +=
        Number(
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

  // ==================================================
  // ASSET TYPE ICON
  // ==================================================

  function getAssetIcon(type) {
    switch (type) {
      case "Stock":
        return (
          <TrendingUp
            size={22}
            strokeWidth={2}
          />
        );

      case "ETF":
        return (
          <BarChart3
            size={22}
            strokeWidth={2}
          />
        );

      case "Crypto":
        return (
          <CircleDollarSign
            size={22}
            strokeWidth={2}
          />
        );

      case "Real Estate":
        return (
          <Target
            size={22}
            strokeWidth={2}
          />
        );

      case "Cash":
        return (
          <Wallet
            size={22}
            strokeWidth={2}
          />
        );

      default:
        return (
          <PieChart
            size={22}
            strokeWidth={2}
          />
        );
    }
  }

  return (
    <div className="investments-page">

      {/* ==================================================
          PAGE HEADER
          ================================================== */}

      <div className="investments-page-header">

        <div className="investments-title-block">

          <div className="investments-title-icon">

            <TrendingUp
              size={30}
              strokeWidth={2}
            />

          </div>

          <div>

            <h1>
              {t("investments")}
            </h1>

            <p>
              {t(
                "portfolioAllocation"
              )}
            </p>

          </div>

        </div>

      </div>


      {/* ==================================================
          PORTFOLIO OVERVIEW
          ================================================== */}

      {investments.length > 0 && (

        <div className="investment-overview">

          {/* TOTAL VALUE */}

          <div className="investment-overview-card">

            <div className="investment-overview-icon value">

              <Wallet
                size={22}
                strokeWidth={2}
              />

            </div>

            <div>

              <span>
                {t(
                  "totalPortfolioValue"
                )}
              </span>

              <strong>

                {formatCurrency(
                  totalPortfolioValue,
                  profile.currency,
                  i18n.language
                )}

              </strong>

            </div>

          </div>


          {/* TOTAL INVESTED */}

          <div className="investment-overview-card">

            <div className="investment-overview-icon invested">

              <PiggyBank
                size={22}
                strokeWidth={2}
              />

            </div>

            <div>

              <span>
                {t("invested")}
              </span>

              <strong>

                {formatCurrency(
                  totalInvested,
                  profile.currency,
                  i18n.language
                )}

              </strong>

            </div>

          </div>


          {/* PROFIT */}

          <div className="investment-overview-card">

            <div
              className={`investment-overview-icon ${
                portfolioIsPositive
                  ? "profit"
                  : "loss"
              }`}
            >

              {portfolioIsPositive ? (

                <TrendingUp
                  size={22}
                  strokeWidth={2}
                />

              ) : (

                <TrendingDown
                  size={22}
                  strokeWidth={2}
                />

              )}

            </div>

            <div>

              <span>
                {t(
                  "profitLoss"
                )}
              </span>

              <strong
                className={
                  portfolioIsPositive
                    ? "overview-profit-positive"
                    : "overview-profit-negative"
                }
              >

                {formatCurrency(
                  totalProfit,
                  profile.currency,
                  i18n.language
                )}

              </strong>

            </div>

          </div>


          {/* RETURN */}

          <div className="investment-overview-card">

            <div
              className={`investment-overview-icon ${
                portfolioIsPositive
                  ? "return"
                  : "loss"
              }`}
            >

              {portfolioIsPositive ? (

                <ArrowUpRight
                  size={22}
                  strokeWidth={2}
                />

              ) : (

                <ArrowDownRight
                  size={22}
                  strokeWidth={2}
                />

              )}

            </div>

            <div>

              <span>
                {t(
                  "return"
                )}
              </span>

              <strong
                className={
                  portfolioIsPositive
                    ? "overview-profit-positive"
                    : "overview-profit-negative"
                }
              >
                {portfolioIsPositive
                  ? "+"
                  : ""}
                {
                  totalProfitPercent
                }%
              </strong>

            </div>

          </div>

        </div>

      )}


      {/* ==================================================
          ADD INVESTMENT
          ================================================== */}

      <div className="goal-form investments-create-card">

        <div className="investments-form-header">

          <div className="investments-form-icon">

            <Plus
              size={22}
              strokeWidth={2.4}
            />

          </div>

          <div>

            <h2>
              {t(
                "addInvestment"
              )}
            </h2>

            <p>
              {t(
                "createYourFirstInvestment"
              )}
            </p>

          </div>

        </div>


        <div className="investments-form-grid">

          {/* ASSET NAME */}

          <div className="investment-input-wrapper">

            <label>
              {t("assetName")}
            </label>

            <div className="investment-input-with-icon">

              <BarChart3
                size={18}
                strokeWidth={2}
              />

              <input
                type="text"
                placeholder={t(
                  "assetName"
                )}
                value={
                  assetName
                }
                onChange={(e) =>
                  setAssetName(
                    e.target.value
                  )
                }
              />

            </div>

          </div>


          {/* ASSET TYPE */}

          <div className="investment-input-wrapper">

            <label>
              {t(
                "selectAssetType"
              )}
            </label>

            <div className="investment-select-with-icon">

              <PieChart
                size={18}
                strokeWidth={2}
              />

              <select
                value={
                  assetType
                }
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
                  {t(
                    "realEstate"
                  )}
                </option>

                <option value="Cash">
                  {t("cash")}
                </option>

              </select>

            </div>

          </div>


          {/* INVESTED AMOUNT */}

          <div className="investment-input-wrapper">

            <label>
              {t(
                "investedAmount"
              )}
            </label>

            <div className="investment-input-with-icon">

              <PiggyBank
                size={18}
                strokeWidth={2}
              />

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

            </div>

          </div>


          {/* CURRENT VALUE */}

          <div className="investment-input-wrapper">

            <label>
              {t(
                "currentValue"
              )}
            </label>

            <div className="investment-input-with-icon">

              <Wallet
                size={18}
                strokeWidth={2}
              />

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

            </div>

          </div>

        </div>


        <button
          className="investments-add-btn"
          onClick={
            addInvestment
          }
        >

          <Plus
            size={19}
            strokeWidth={2.5}
          />

          {t(
            "addInvestment"
          )}

        </button>

      </div>


      {/* ==================================================
          EMPTY STATE
          ================================================== */}

      {investments.length ===
        0 && (

        <div className="investments-empty-state">

          <div className="investments-empty-visual">

            <div className="investments-empty-ring">

              <TrendingUp
                size={58}
                strokeWidth={1.5}
              />

            </div>

            <div className="investment-floating-icon chart">

              <BarChart3
                size={21}
                strokeWidth={2}
              />

            </div>

            <div className="investment-floating-icon wallet">

              <Wallet
                size={19}
                strokeWidth={2}
              />

            </div>

          </div>


          <div className="investments-empty-content">

            <h2>
              {t(
                "noInvestmentsYet"
              )}
            </h2>

            <p>
              {t(
                "createYourFirstInvestment"
              )}
            </p>

            <div className="investments-empty-hint">

              <Plus
                size={16}
                strokeWidth={2.5}
              />

              <span>
                {t(
                  "addInvestment"
                )}
              </span>

            </div>

          </div>

        </div>

      )}


      {/* ==================================================
          PORTFOLIO ALLOCATION
          ================================================== */}

      {investments.length > 0 && (

        <div className="investment-allocation-card">

          <div className="investment-section-header">

            <div>

              <h2>
                {t(
                  "portfolioAllocation"
                )}
              </h2>

              <p>
                {t(
                  "totalPortfolioValue"
                )}
              </p>

            </div>

            <div className="investment-section-icon">

              <PieChart
                size={21}
                strokeWidth={2}
              />

            </div>

          </div>


          <div className="investment-allocation-list">

            {Object.entries(
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
                      )
                    : 0;

                return (

                  <div
                    className="investment-allocation-item"
                    key={type}
                  >

                    <div className="allocation-info">

                      <div className="allocation-name">

                        <div className="allocation-type-icon">

                          {getAssetIcon(
                            type
                          )}

                        </div>

                        <span>
                          {
                            assetTypeTranslations[
                              type
                            ] || type
                          }
                        </span>

                      </div>

                      <div className="allocation-value">

                        <strong>
                          {
                            percentage.toFixed(
                              1
                            )
                          }%
                        </strong>

                        <span>

                          {formatCurrency(
                            value,
                            profile.currency,
                            i18n.language
                          )}

                        </span>

                      </div>

                    </div>


                    <div className="allocation-bar">

                      <div
                        className="allocation-fill"
                        style={{
                          width:
                            `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>

                );
              }
            )}

          </div>

        </div>

      )}


      {/* ==================================================
          INVESTMENTS
          ================================================== */}

      {investments.length > 0 && (

        <div className="investments-list">

          {investments.map(
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

              const profit =
                numericCurrent -
                numericInvested;

              const profitPercent =
                numericInvested > 0
                  ? (
                      (profit /
                        numericInvested) *
                      100
                    ).toFixed(1)
                  : "0.0";

              const isPositive =
                profit >= 0;

              return (

                <div
                  className={`investment-card ${
                    isPositive
                      ? "investment-positive"
                      : "investment-negative"
                  }`}
                  key={
                    investment.id
                  }
                >

                  {/* CARD HEADER */}

                  <div className="investment-card-header">

                    <div className="investment-card-title">

                      <div className="investment-card-icon">

                        {getAssetIcon(
                          investment.type
                        )}

                      </div>

                      <div>

                        <h2>
                          {
                            investment.name
                          }
                        </h2>

                        <span>
                          {
                            assetTypeTranslations[
                              investment.type
                            ] ||
                            investment.type
                          }
                        </span>

                      </div>

                    </div>


                    <div
                      className={`investment-performance-badge ${
                        isPositive
                          ? "positive"
                          : "negative"
                      }`}
                    >

                      {isPositive ? (

                        <TrendingUp
                          size={15}
                          strokeWidth={2.3}
                        />

                      ) : (

                        <TrendingDown
                          size={15}
                          strokeWidth={2.3}
                        />

                      )}

                      {isPositive
                        ? "+"
                        : ""}
                      {
                        profitPercent
                      }%

                    </div>

                  </div>


                  {/* CURRENT VALUE */}

                  <div className="investment-main-value">

                    <span>
                      {t(
                        "currentValue"
                      )}
                    </span>

                    <strong>

                      {formatCurrency(
                        numericCurrent,
                        profile.currency,
                        i18n.language
                      )}

                    </strong>

                  </div>


                  {/* DETAILS */}

                  <div className="investment-details-grid">

                    <div className="investment-detail">

                      <div className="investment-detail-icon">

                        <PiggyBank
                          size={17}
                          strokeWidth={2}
                        />

                      </div>

                      <div>

                        <span>
                          {t(
                            "invested"
                          )}
                        </span>

                        <strong>

                          {formatCurrency(
                            numericInvested,
                            profile.currency,
                            i18n.language
                          )}

                        </strong>

                      </div>

                    </div>


                    <div className="investment-detail">

                      <div
                        className={`investment-detail-icon ${
                          isPositive
                            ? "positive"
                            : "negative"
                        }`}
                      >

                        {isPositive ? (

                          <ArrowUpRight
                            size={17}
                            strokeWidth={2}
                          />

                        ) : (

                          <ArrowDownRight
                            size={17}
                            strokeWidth={2}
                          />

                        )}

                      </div>

                      <div>

                        <span>
                          {t(
                            "profitLoss"
                          )}
                        </span>

                        <strong
                          className={
                            isPositive
                              ? "profit-positive"
                              : "profit-negative"
                          }
                        >

                          {formatCurrency(
                            profit,
                            profile.currency,
                            i18n.language
                          )}

                        </strong>

                      </div>

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="investment-actions">

                    <button
                      className="investment-update-btn"
                      onClick={() =>
                        updateInvestment(
                          investment.id
                        )
                      }
                    >

                      <Pencil
                        size={17}
                        strokeWidth={2.2}
                      />

                      {t(
                        "updateValue"
                      )}

                    </button>


                    <button
                      className="investment-delete-btn"
                      onClick={() =>
                        deleteInvestment(
                          investment.id
                        )
                      }
                    >

                      <Trash2
                        size={17}
                        strokeWidth={2.2}
                      />

                      {t(
                        "delete"
                      )}

                    </button>

                  </div>

                </div>

              );
            }
          )}

        </div>

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

          <div className="investment-modal-header">

            <div className="investment-modal-icon">

              {getAssetIcon(
                editingInvestment.type
              )}

            </div>

            <div>

              <h3>
                {
                  editingInvestment.name
                }
              </h3>

              <span>
                {
                  assetTypeTranslations[
                    editingInvestment.type
                  ] ||
                  editingInvestment.type
                }
              </span>

            </div>

          </div>


          <label className="investment-modal-label">

            {t(
              "investedAmount"
            )}

          </label>

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


          <label className="investment-modal-label">

            {t(
              "currentValue"
            )}

          </label>

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