import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/currency";
import { useFinance } from "../../context/FinanceContext";


function TransactionSummary({
  totalIncome,
  totalExpenses,
  balance,
}) {
  const { t } = useTranslation();
  const { profile } = useFinance();

  return (
    <div className="summary-container">

      <div className="card">
        <h2>{t("totalIncome")}</h2>

        <div className="income amount">
          {formatCurrency(
    totalIncome,
    profile.currency,
    profile.language
)}
        </div>
      </div>

      <div className="card">
        <h2>{t("totalExpenses")}</h2>

        <div className="expense amount">
         {formatCurrency(
    totalExpenses,
    profile.currency,
    profile.language
)}
        </div>
      </div>

      <div className="card">
        <h2>{t("balance")}</h2>

        <div
          className={
            balance >= 0
              ? "income amount"
              : "expense amount"
          }
        >
          {formatCurrency(
    balance,
    profile.currency,
    profile.language
)}
        </div>
      </div>

    </div>
  );
}

export default TransactionSummary;