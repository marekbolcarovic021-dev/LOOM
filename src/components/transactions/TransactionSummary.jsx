import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../Utils/currency";
import { useFinance } from "../../context/FinanceContext";

function TransactionSummary({
  totalIncome,
  totalExpenses,
  balance,
}) {
  const { t, i18n } = useTranslation();
  const { profile } = useFinance();

  return (
    <div className="summary-container">

      {/* TOTAL INCOME */}

      <div className="card">

        <h2>
          {t("totalIncome")}
        </h2>

        <div className="income amount">

          {formatCurrency(
            Number(totalIncome || 0),
            profile.currency,
            i18n.language
          )}

        </div>

      </div>

      {/* TOTAL EXPENSES */}

      <div className="card">

        <h2>
          {t("totalExpenses")}
        </h2>

        <div className="expense amount">

          {formatCurrency(
            Number(totalExpenses || 0),
            profile.currency,
            i18n.language
          )}

        </div>

      </div>

      {/* BALANCE */}

      <div className="card">

        <h2>
          {t("balance")}
        </h2>

        <div
          className={
            Number(balance || 0) >= 0
              ? "income amount"
              : "expense amount"
          }
        >

          {formatCurrency(
            Number(balance || 0),
            profile.currency,
            i18n.language
          )}

        </div>

      </div>

    </div>
  );
}

export default TransactionSummary;