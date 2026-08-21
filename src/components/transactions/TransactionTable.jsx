import { useTranslation } from "react-i18next";
import { Pencil, Trash2 } from "lucide-react";
import { formatCurrency } from "../../utils/currency";
import { useFinance } from "../../context/FinanceContext";

function TransactionTable({
  filteredTransactions,
  accounts,
  transactions,
  setTransactions,
  setAccounts,
  setEditingTransaction,
  setType,
  setCategory,
  setAmount,
  setAccountId,
}) {
  const { t, i18n } = useTranslation();
const { profile } = useFinance();

  return (
    <div className="card">

      <h2>{t("transactions")}</h2>

      <div className="transactions-table">

        <table>

          <thead>

            <tr>
              <th>{t("date")}</th>
              <th>{t("category")}</th>
              <th>{t("type")}</th>
              <th>{t("account")}</th>
              <th>{t("amount")}</th>
              <th></th>
            </tr>

          </thead>

          <tbody>

            {filteredTransactions.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  {t("noTransactions")}
                </td>

              </tr>

            ) : (

              filteredTransactions.map(
                (transaction) => (

                  <tr key={transaction.id}>

                    <td>
                      {new Date(
  transaction.date
).toLocaleDateString(
  i18n.language
)}
                    </td>

                   <td>

  {
  t(
    transaction.category.toLowerCase(),
    transaction.category
  )
}

  {transaction.recurring && (

    <span className="recurring-badge">
      ↻ {t(transaction.recurrence)}
    </span>

  )}

</td>

                    
                      <td>
  {
  transaction.type === "Income"
    ? t("income")
    : t("expense")
}
</td>
                    

                   <td>

  {(() => {
    const account = accounts.find(
      (a) =>
        a.id === transaction.accountId
    );

    if (!account)
      return t("unknown");

    const accountTranslations = {
      "Main Account": "mainAccount",
      Cash: "cash",
      Savings: "savings",
    };

    return t(
      accountTranslations[
        account.name
      ] || account.name
    );
  })()}

</td>

                  <td
  className={
    transaction.type === "Income"
      ? "income"
      : "expense"
  }
>
  {formatCurrency(
    transaction.amount,
    profile.currency,
    i18n.language
  )}
</td>

                    <td>

                      <div className="transaction-actions">

                        <button
                          className="edit-btn"
                          onClick={() => {

                            setEditingTransaction(
                              transaction
                            );

                            setType(
                              transaction.type
                            );

                            setCategory(
                              transaction.category
                            );

                            setAmount(
                              transaction.amount
                            );

                            setAccountId(
                              transaction.accountId
                            );

                            setTimeout(() => {

                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });

                            }, 100);
                          }}
                        >

                          <Pencil
                            size={18}
                            strokeWidth={2.2}
                          />

                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => {

                            setAccounts(
                              accounts.map(
                                (account) => {

                                  if (
                                    account.id !==
                                    transaction.accountId
                                  )
                                    return account;

                                  return {
                                    ...account,

                                    balance:
                                      transaction.type ===
                                      "Income"
                                        ? account.balance -
                                          transaction.amount
                                        : account.balance +
                                          transaction.amount,
                                  };
                                }
                              )
                            );

                            setTransactions(
                              transactions.filter(
                                (t) =>
                                  t.id !==
                                  transaction.id
                              )
                            );
                          }}
                        >

                          <Trash2
                            size={20}
                            strokeWidth={2.2}
                          />

                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TransactionTable;