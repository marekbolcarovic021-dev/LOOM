import { useTranslation } from "react-i18next";

function TransactionForm({
  editingTransaction,
  accounts,
  accountId,
  setAccountId,
  type,
  setType,
  category,
  setCategory,
  amount,
  setAmount,
  recurring,
  setRecurring,
  recurrence,
  setRecurrence,
  addTransaction,
  cancelEdit,
}) {
  const { t } = useTranslation();

  return (
    <div className="goal-form">

      <div className="transaction-selects">

        <select
          value={accountId}
          onChange={(e) =>
            setAccountId(Number(e.target.value))
          }
        >
         {accounts.map((account) => {
  const accountTranslations = {
    "Main Account": "mainAccount",
    Cash: "cash",
    Savings: "savings",
  };

  return (
    <option
      key={account.id}
      value={account.id}
    >
      {t(
        accountTranslations[
          account.name
        ] || account.name
      )}
    </option>
  );
})}
        </select>

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <option value="">
            {t("selectType")}
          </option>

          <option value="Income">
            {t("income")}
          </option>

          <option value="Expense">
            {t("expense")}
          </option>
        </select>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">
            {t("selectCategory")}
          </option>

          <option value="Food">
            {t("food")}
          </option>

          <option value="Transport">
            {t("transport")}
          </option>

          <option value="Housing">
            {t("housing")}
          </option>

          <option value="Shopping">
            {t("shopping")}
          </option>

          <option value="Health">
            {t("health")}
          </option>

          <option value="Entertainment">
            {t("entertainment")}
          </option>

          <option value="Salary">
            {t("salary")}
          </option>

          <option value="Investment">
            {t("investment")}
          </option>

          <option value="Other">
            {t("other")}
          </option>
        </select>

      </div>

      <input
        type="text"
        placeholder={t("customCategory")}
        onChange={(e) => {
          if (e.target.value.trim()) {
            setCategory(e.target.value);
          }
        }}
      />

      <input
        type="number"
        placeholder={t("amount")}
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <div className="recurring-section">

        <label className="recurring-toggle">

          <span>
            {t("recurringTransaction")}
          </span>

          <div
            className={`toggle-switch ${
              recurring ? "active" : ""
            }`}
            onClick={() =>
              setRecurring(!recurring)
            }
          >
            <div className="toggle-circle"></div>
          </div>

        </label>

        {recurring && (
          <select
            value={recurrence}
            onChange={(e) =>
              setRecurrence(
                e.target.value
              )
            }
          >
            <option value="weekly">
              {t("weekly")}
            </option>

            <option value="monthly">
              {t("monthly")}
            </option>

            <option value="yearly">
              {t("yearly")}
            </option>
          </select>
        )}

      </div>

      <button
        onClick={addTransaction}
      >
        {editingTransaction
          ? t("saveChanges")
          : t("addTransaction")}
      </button>

      {editingTransaction && (
        <button
          className="cancel-edit-btn"
          onClick={cancelEdit}
        >
          {t("cancelEditing")}
        </button>
      )}

    </div>
  );
}

export default TransactionForm;