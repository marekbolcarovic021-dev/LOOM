import { useTranslation } from "react-i18next";
import {
  Pencil,
  Trash2,
} from "lucide-react";
import { formatCurrency } from "../../Utils/currency";
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
  const { t, i18n } =
    useTranslation();

  const { profile } =
    useFinance();

  return (
    <div className="card">

      <h2>
        {t("transactions")}
      </h2>

      <div className="transactions-table">

        <table>

          <thead>

            <tr>

              <th>
                {t("date")}
              </th>

              <th>
                {t("category")}
              </th>

              <th>
                {t("type")}
              </th>

              <th>
                {t("account")}
              </th>

              <th>
                {t("amount")}
              </th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {filteredTransactions.length ===
            0 ? (

              <tr>

                <td
                  colSpan="6"
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "30px",
                  }}
                >
                  {t(
                    "noTransactions"
                  )}
                </td>

              </tr>

            ) : (

              filteredTransactions.map(
                (transaction) => (

                  <tr
                    key={
                      transaction.id
                    }
                  >

                    {/* DATE */}

                    <td>
                      {new Date(
                        transaction.date
                      ).toLocaleDateString(
                        i18n.language
                      )}
                    </td>

                    {/* CATEGORY */}

                    <td>

                      {t(
                        transaction.category.toLowerCase(),
                        transaction.category
                      )}

                      {transaction.recurring && (

                        <span className="recurring-badge">

                          ↻{" "}
                          {t(
                            transaction.recurrence
                          )}

                        </span>

                      )}

                    </td>

                    {/* TYPE */}

                    <td>

                      {transaction.type ===
                      "Income"
                        ? t("income")
                        : t("expense")}

                    </td>

                    {/* ACCOUNT */}

                    <td>

                      {(() => {

                        const account =
                          accounts.find(
                            (a) =>
                              String(
                                a.id
                              ) ===
                              String(
                                transaction.accountId
                              )
                          );

                        if (!account) {
                          return t(
                            "unknown"
                          );
                        }

                        const accountTranslations = {
                          "Main Account":
                            "mainAccount",
                          Cash:
                            "cash",
                          Savings:
                            "savings",
                        };

                        return t(
                          accountTranslations[
                            account.name
                          ] ||
                            account.name
                        );

                      })()}

                    </td>

                    {/* AMOUNT */}

                    <td
                      className={
                        transaction.type ===
                        "Income"
                          ? "income"
                          : "expense"
                      }
                    >

                      {formatCurrency(
                        Number(
                          transaction.amount ||
                            0
                        ),
                        profile.currency,
                        i18n.language
                      )}

                    </td>

                    {/* ACTIONS */}

                    <td>

                      <div className="transaction-actions">

                        {/* EDIT */}

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

                            // Keep the exact
                            // account ID
                            // associated with
                            // the transaction.
                            setAccountId(
                              String(
                                transaction.accountId
                              )
                            );

                            setTimeout(
                              () => {

                                window.scrollTo(
                                  {
                                    top: 0,
                                    behavior:
                                      "smooth",
                                  }
                                );

                              },
                              100
                            );

                          }}
                        >

                          <Pencil
                            size={18}
                            strokeWidth={
                              2.2
                            }
                          />

                        </button>

                        {/* DELETE */}

                        <button
                          className="delete-btn"
                          onClick={() => {

                            // Find the account
                            // using a safe
                            // string comparison.
                            setAccounts(
                              (prevAccounts) =>
                                prevAccounts.map(
                                  (
                                    account
                                  ) => {

                                    if (
                                      String(
                                        account.id
                                      ) !==
                                      String(
                                        transaction.accountId
                                      )
                                    ) {
                                      return account;
                                    }

                                    const currentBalance =
                                      Number(
                                        account.balance ||
                                          0
                                      );

                                    return {
                                      ...account,

                                      balance:
                                        transaction.type ===
                                        "Income"
                                          ? currentBalance -
                                            Number(
                                              transaction.amount ||
                                                0
                                            )
                                          : currentBalance +
                                            Number(
                                              transaction.amount ||
                                                0
                                            ),
                                    };

                                  }
                                )
                            );

                            setTransactions(
                              (prevTransactions) =>
                                prevTransactions.filter(
                                  (t) =>
                                    t.id !==
                                    transaction.id
                                )
                            );

                          }}
                        >

                          <Trash2
                            size={20}
                            strokeWidth={
                              2.2
                            }
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