import BottomNav from "../components/BottomNav";
import { useFinance } from "../context/FinanceContext";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../utils/currency";

import {
  Landmark,
  Wallet,
  CreditCard,
  Pencil,
  Trash2,
  ArrowRight,
} from "lucide-react";

import { useState, useRef } from "react";
import { notify } from "../utils/notifications";

function Accounts() {

const { t, i18n } = useTranslation();

  const {
  accounts,
  setAccounts,
  transfers,
  setTransfers,
  profile,
} = useFinance();

  const [editingTransfer, setEditingTransfer] =
  useState(null);

  const totalBalance = accounts.reduce(
  (sum, account) =>
    sum + account.balance,
  0
);

  // ACCOUNT MODAL

  const [showModal, setShowModal] =
    useState(false);

  const [editingAccount, setEditingAccount] =
    useState(null);

  const [name, setName] =
    useState("");

  const [type, setType] =
    useState("Bank");

  const [balance, setBalance] =
    useState("");

  // TRANSFERS

  const [fromAccountId, setFromAccountId] =
    useState("");

  const [toAccountId, setToAccountId] =
    useState("");

  const [transferAmount, setTransferAmount] =
    useState("");

  // SAVE ACCOUNT

  function saveAccount() {
    if (!name.trim()) return;

    if (editingAccount) {
      setAccounts(
        accounts.map((account) =>
          account.id ===
          editingAccount.id
            ? {
                ...account,
                name,
                type,
                balance:
                  Number(balance) || 0,
              }
            : account
        )
      );
    } else {
      const newAccount = {
        id: Date.now(),
        name,
        type,
        balance:
          Number(balance) || 0,
      };

      setAccounts([
        ...accounts,
        newAccount,
      ]);
    }

    closeModal();
  }

  function closeModal() {
    setShowModal(false);
    setEditingAccount(null);
    setName("");
    setType("Bank");
    setBalance("");
  }

// TRANSFER MONEY

function transferFunds() {
  if (!fromAccountId || !toAccountId || !transferAmount) {
    return;
  }

  if (String(fromAccountId) === String(toAccountId)) {
    return;
  }

  const amount = Number(transferAmount);

  if (!Number.isFinite(amount) || amount <= 0) {
    return;
  }

  const fromId = String(fromAccountId);
  const toId = String(toAccountId);

  const fromAccount = accounts.find(
    (account) => String(account.id) === fromId
  );

  const toAccount = accounts.find(
    (account) => String(account.id) === toId
  );

  if (!fromAccount || !toAccount) {
    return;
  }

  /*
   * --------------------------------------------------
   * NEW TRANSFER
   * --------------------------------------------------
   */

  if (!editingTransfer) {
    if (Number(fromAccount.balance) < amount) {
      notify({
        title: t("notEnoughMoney"),
        body: t("notEnoughMoney"),
      });
      return;
    }

    setAccounts((prevAccounts) =>
      prevAccounts.map((account) => {
        if (String(account.id) === fromId) {
          return {
            ...account,
            balance: Number(account.balance) - amount,
          };
        }

        if (String(account.id) === toId) {
          return {
            ...account,
            balance: Number(account.balance) + amount,
          };
        }

        return account;
      })
    );

    const newTransfer = {
      id: Date.now(),
      fromId: fromAccount.id,
      toId: toAccount.id,
      from: fromAccount.name,
      to: toAccount.name,
      amount,
      date: new Date().toISOString(),
    };

    setTransfers((prevTransfers) => [
      ...prevTransfers,
      newTransfer,
    ]);

    notify({
      title: t("transferCompleted"),
      body: t("transferCompletedText", {
        amount: formatCurrency(
          amount,
          profile.currency,
          i18n.language
        ),
        from: fromAccount.name,
        to: toAccount.name,
      }),
    });

    setFromAccountId("");
    setToAccountId("");
    setTransferAmount("");

    return;
  }

  /*
   * --------------------------------------------------
   * EDIT EXISTING TRANSFER
   * --------------------------------------------------
   */

  const oldFromId = String(editingTransfer.fromId);
  const oldToId = String(editingTransfer.toId);
  const oldAmount = Number(editingTransfer.amount);

  // First reconstruct balances as if the old transfer never happened,
  // then apply the new transfer.
  setAccounts((prevAccounts) =>
    prevAccounts.map((account) => {
      const accountId = String(account.id);

      let newBalance = Number(account.balance);

      // Undo old transfer
      if (accountId === oldFromId) {
        newBalance += oldAmount;
      }

      if (accountId === oldToId) {
        newBalance -= oldAmount;
      }

      // Apply new transfer
      if (accountId === fromId) {
        newBalance -= amount;
      }

      if (accountId === toId) {
        newBalance += amount;
      }

      return {
        ...account,
        balance: newBalance,
      };
    })
  );

  setTransfers((prevTransfers) =>
    prevTransfers.map((transfer) =>
      transfer.id === editingTransfer.id
        ? {
            ...transfer,
            fromId: fromAccount.id,
            toId: toAccount.id,
            from: fromAccount.name,
            to: toAccount.name,
            amount,
          }
        : transfer
    )
  );

  setEditingTransfer(null);
  setFromAccountId("");
  setToAccountId("");
  setTransferAmount("");

  notify({
    title: t("transferCompleted"),
    body: t("transferCompletedText", {
      amount: formatCurrency(
        amount,
        profile.currency,
        i18n.language
      ),
      from: fromAccount.name,
      to: toAccount.name,
    }),
  });
}  

  // ICONS

  const getIcon = (type) => {
    switch (type) {
      case "Bank":
        return <Landmark size={28} />;

      case "Cash":
        return <Wallet size={28} />;

      case "Card":
        return (
          <CreditCard size={28} />
        );

      default:
        return <Wallet size={28} />;
    }
  };

  const accountTypes = {
  Bank: t("bank"),
  Cash: t("cash"),
  Card: t("card"),
  Savings: t("savings"),
  Investment: t("investment"),
  Crypto: t("crypto"),
};

const transferCardRef = useRef(null);
  return (
    <div className="page-container">
      <h1 className="page-title">
        {t("accounts")}
      </h1>

      <button
        className="add-account-btn"
        onClick={() =>
          setShowModal(true)
        }
      >
        + {t("addAccount")}
      </button>

      {/* ACCOUNTS */}

      <div className="net-worth-card">
  <h3>{t("totalNetWorth")}</h3>

<h1>
  {formatCurrency(
    totalBalance,
    profile.currency,
    i18n.language
  )}
</h1>
</div>

      <div className="accounts-grid">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="account-card"
          >
            <div className="account-icon">
              {getIcon(account.type)}
            </div>

            <h3>{account.name}</h3>

            <p className="account-type">
              {accountTypes[account.type] || account.type}
            </p>

            <h2>
              {formatCurrency(
  Number(account.balance),
  profile.currency,
  i18n.language
)}
            </h2>

            <div className="account-actions">
              <button
                className="edit-account-btn"
                onClick={() => {
                  setEditingAccount(
                    account
                  );

                  setName(
                    account.name
                  );

                  setType(
                    account.type
                  );

                  setBalance(
                    account.balance
                  );

                  setShowModal(true);
                }}
              >
                {t("edit")}
              </button>

              <button
                className="delete-account-btn"
                onClick={() =>
                  setAccounts(
                    accounts.filter(
                      (a) =>
                        a.id !==
                        account.id
                    )
                  )
                }
              >
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TRANSFER MONEY */}

      <div
  ref={transferCardRef}
  className="transfer-card"
>
        <h2>{t("transferMoney")}</h2>

      <select
  value={fromAccountId}
  onChange={(e) =>
    setFromAccountId(e.target.value)
  }
>
        
          <option value="">
            {t("fromAccount")}
          </option>

          {accounts.map((account) => (
            <option
              key={account.id}
              value={account.id}
            >
              {account.name}
            </option>
          ))}
        </select>

        <select
          value={toAccountId}
          onChange={(e) =>
            setToAccountId(
              e.target.value
            )
          }
        >
          <option value="">
            {t("toAccount")}
          </option>

          {accounts
  .filter(
    (a) =>
      String(a.id) !== String(fromAccountId)
  )
  .map((account) => (
              <option
                key={account.id}
                value={account.id}
              >
                {account.name}
              </option>
            ))}
        </select>

        <input
          type="number"
          placeholder={`${t("amount")} (${profile.currency})`}
          value={transferAmount}
          onChange={(e) =>
            setTransferAmount(
              e.target.value
            )
          }
        />

        <button
  className="transfer-btn"
  onClick={transferFunds}
>
  {t("transferFunds")}
</button>
      </div>

{/* TRANSFER HISTORY */}

<div className="transfer-history-card">
  <h2>{t("transferHistory")}</h2>

  {transfers.length === 0 ? (
    <p>{t("noTransfersYet")}</p>
  ) : (
    transfers
      .slice()
      .reverse()
      .map((transfer) => (
        <div
          key={transfer.id}
          className="transfer-item"
        >
          <div className="transfer-left">
            <div className="transfer-arrow">
              <ArrowRight size={26} />
            </div>

            <div className="transfer-details">
              <h3>
                {transfer.from} →{" "}
                {transfer.to}
              </h3>

              <p>
                {new Date(
                  transfer.date
                ).toLocaleDateString(i18n.language)}
              </p>
            </div>
          </div>

          <div className="transfer-right">
            <div className="transfer-amount">
  {formatCurrency(
    transfer.amount,
    profile.currency,
    i18n.language
  )}
</div>

            <div className="transfer-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditingTransfer(
                    transfer
                  );

                  setFromAccountId(
                    transfer.fromId
                  );

                  setToAccountId(
                    transfer.toId
                  );

                  setTransferAmount(
                    transfer.amount
                  );

                  transferCardRef.current?.scrollIntoView({
  behavior: "smooth",
  block: "start",
});
                }}
              >
                <Pencil size={18} />
              </button>

              <button
                className="delete-btn"
                onClick={() => {
                  setAccounts(
                    accounts.map(
                      (account) => {
                        if (
                          account.id ===
                          transfer.fromId
                        ) {
                          return {
                            ...account,
                            balance:
                              account.balance +
                              transfer.amount,
                          };
                        }

                        if (
                          account.id ===
                          transfer.toId
                        ) {
                          return {
                            ...account,
                            balance:
                              account.balance -
                              transfer.amount,
                          };
                        }

                        return account;
                      }
                    )
                  );

                  setTransfers(
                    transfers.filter(
                      (t) =>
                        t.id !==
                        transfer.id
                    )
                  );
                }}
              >
                <Trash2 size={18} />
              </button>


            </div>
          </div>
        </div>
      ))
  )}
</div>

      {/* MODAL */}

      {showModal && (
        <div className="modal-overlay">
          <div className="account-modal">
            <h2>
              {editingAccount
  ? t("editAccount")
  : t("addAccount")}
            </h2>

            <input
              type="text"
              placeholder={t("accountName")}
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target.value
                )
              }
            >
              <option>
                {t("bank")}
              </option>

              <option>
                {t("cash")}
              </option>

              <option>
                {t("card")}
              </option>

              <option>
                {t("savings")}
              </option>

              <option>
                {t("investment")}
              </option>

              <option>
                {t("crypto")}
              </option>
            </select>

            <input
              type="number"
              placeholder={t("balance")}
              value={balance}
              onChange={(e) =>
                setBalance(
                  e.target.value
                )
              }
            />

            <button
              onClick={saveAccount}
            >
              {editingAccount
  ? t("update")
  : t("save")}
            </button>

            <button
              className="cancel-btn"
              onClick={closeModal}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default Accounts;