import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  Crown,
  Coins,
  Sparkles,
  Bot,
  Receipt,
  CheckCircle,
  Star,
  X,
  ShieldCheck,
} from "lucide-react";

import { useFinance } from "../context/FinanceContext";
import { showNotification } from "../utils/notificationService";

import "./Premium.css";

import { getFunctions, httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import app from "../firebase";


export default function Premium() {

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const {
    premium,
    profile,
  } = useFinance();

  const functions = getFunctions(app, "us-central1");

  const TOKEN_PACKS = [

    {
      id: 1,
      price: 0.59,
      tokens: 10,
    },

    {
      id: 2,
      price: 1,
      tokens: 20,
      popular: true,
    },

    {
      id: 3,
      price: 2.5,
      tokens: 50,
    },

    {
      id: 4,
      price: 5,
      tokens: 100,
    },

  ];

  const [
    selectedPack,
    setSelectedPack,
  ] = useState(TOKEN_PACKS[1]);

  const [
    customAmount,
    setCustomAmount,
  ] = useState("");

  const formatCurrency = amount =>
    new Intl.NumberFormat(
      i18n.language,
      {
        style: "currency",
        currency:
          profile?.currency || "EUR",
      }
    ).format(amount);

  const customValue =
    Math.max(
      Number(customAmount) || 0,
      0
    );

  const customTokens =
    Math.floor(
      customValue / 0.05
    );

    const isPremium =
  premium?.plan === "premium";

const isCancellationPending =
  isPremium &&
  premium?.cancelAtPeriodEnd === true;

const premiumExpiresAt =
  premium?.expiresAt?.toDate
    ? premium.expiresAt.toDate()
    : premium?.expiresAt
      ? new Date(premium.expiresAt)
      : null;

  /*
   * ============================
   * PAYMENT PLACEHOLDERS
   * ============================
   */

  async function handleSubscribe() {
  try {
    showNotification({
      title: "LOOM",
      body: t("redirectingToCheckout"),
      priority: "info",
    });

    const createCheckoutSession = httpsCallable(
      functions,
      "createCheckoutSession"
    );

    const result = await createCheckoutSession({
      type: "premium",
    });

    window.location.href = result.data.url;
  } catch (error) {
    console.error(error);

    showNotification({
      title: "LOOM",
      body: error.message,
      priority: "error",
    });
  }
}

 const handleBuyTokens = async (type) => {
  try {
    showNotification({
      title: "LOOM",
      body: t("redirectingToCheckout"),
      priority: "info",
    });

    const createCheckoutSession = httpsCallable(
      functions,
      "createCheckoutSession"
    );

    const result = await createCheckoutSession({
      type,
    });

    window.location.href = result.data.url;
  } catch (error) {
    console.error(error);

    showNotification({
      title: "LOOM",
      body: error.message,
      priority: "error",
    });
  }
};

 async function handleBuyCustom() {

  if (customTokens <= 0) {
    return;
  }

  try {

    showNotification({
      title: "LOOM",
      body: t("redirectingToCheckout"),
      priority: "info",
    });

    const createCheckoutSession =
      httpsCallable(
        functions,
        "createCheckoutSession"
      );

    const result =
      await createCheckoutSession({
        type: "customTokens",
        amount: customValue,
        tokens: customTokens,
      });

    if (result.data?.url) {

      window.location.href =
        result.data.url;

    } else {

      throw new Error(
        "Stripe checkout URL was not returned."
      );
    }

  } catch (error) {

    console.error(
      "Custom token checkout error:",
      error
    );

    showNotification({
      title: "LOOM",
      body:
        error.message ||
        "Payment failed.",
      priority: "error",
    });
  }
}

  async function handleUnsubscribe() {
  try {
    showNotification({
      title: "LOOM",
      body: t("cancellingSubscription"),
      priority: "info",
    });

    const cancelSubscription = httpsCallable(
      functions,
      "cancelSubscription"
    );

    const result = await cancelSubscription({});

    console.log(
      "Cancel subscription result:",
      result.data
    );

    showNotification({
      title: "LOOM",
      body: t("subscriptionCancelled"),
      priority: "success",
    });

  } catch (error) {

    console.error(
      "Cancel subscription error:",
      error
    );

    showNotification({
      title: "LOOM",
      body:
        error?.message ||
        "Could not cancel subscription.",
      priority: "error",
    });
  }
}
  return (

    <div className="premium-overlay">

      <div className="premium-window">

        <button
  className="premium-close"
  onClick={() => navigate(-1)}
  aria-label={t("close")}
>
  <X size={24} strokeWidth={2.5} />
</button>

        <div className="premium-header">

          <div className="premium-title">

            <Crown size={36} />

            <div>

              <h1>

                {t("loomPremium")}

              </h1>

              <p>

  {isCancellationPending
    ? t("premiumCancelledUntil")
    : isPremium
      ? t("premiumActive")
      : t("freePlan")}

</p>

{isCancellationPending &&
  premiumExpiresAt && (
    <p className="premium-expiry">
      {t("premiumActiveUntil")}{" "}
      {premiumExpiresAt.toLocaleDateString(
        i18n.language,
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )}
    </p>
  )}

            </div>

          </div>

          <div className="balance-card">

            <Coins size={28} />

            <div>

              <span>

                {t("availableTokens")}

              </span>

              <h2>

                {premium?.tokens ?? 0}

              </h2>

            </div>

          </div>

        </div>

        <div className="premium-grid">

          <div className="premium-card">

            <div className="premium-badge">

              <Sparkles size={18} />

              {t("premium")}

            </div>

            <div className="premium-price">

              {formatCurrency(6.99)}

            </div>

            <div className="premium-period">

              {t("perMonth")}

            </div>

            <div className="premium-features">

              <div className="feature">

                <CheckCircle size={20} />

                <span>

                  {t("unlimitedAiCoach")}

                </span>

              </div>

              <div className="feature">

                <CheckCircle size={20} />

                <span>

                  {t("unlimitedReceiptScanner")}

                </span>

              </div>

              <div className="feature">

                <Bot size={20} />

                <span>

                  {t("futurePremiumFeatures")}

                </span>

              </div>

              <div className="feature">

                <ShieldCheck size={20} />

                <span>

                  {t("prioritySupport")}

                </span>

              </div>

            </div>

            {isPremium ? (

  isCancellationPending ? (

    <div className="subscription-cancelled">

      <CheckCircle size={20} />

      <span>
        {t("subscriptionCancelled")}
      </span>

    </div>

  ) : (

    <button
      className="premium-button unsubscribe-button"
      onClick={handleUnsubscribe}
    >

      <X size={20} />

      {t("unsubscribe")}

    </button>

  )

) : (

  <button
    className="premium-button"
    onClick={handleSubscribe}
  >

    <Crown size={20} />

    {t("subscribe")}

  </button>

)}

          </div>

          <div className="token-card">

            <div className="token-header">

              <Coins size={30} />

              <div>

                <h2>

                  {t("loomTokens")}

                </h2>

                <p>

                  {t("oneTokenOneQuestion")}

                </p>

                <p>

                  {t("oneTokenOneScan")}

                </p>

              </div>

            </div>

            <div className="token-packs">

              {TOKEN_PACKS.map(pack => (

                <button

                  key={pack.id}

                  onClick={() =>
                    setSelectedPack(pack)
                  }

                  className={
                    selectedPack.id === pack.id
                      ? "token-pack selected"
                      : "token-pack"
                  }

                >

                  {pack.popular && (

                    <div className="popular-tag">

                      <Star size={14} />

                      {t("popular")}

                    </div>

                  )}

                  <h3>

                    {formatCurrency(
                      pack.price
                    )}

                  </h3>

                  <h1>

                    {pack.tokens}

                  </h1>

                  <span>

                    {t("tokens")}

                  </span>

                </button>

              ))}
            </div>

                        <div className="selected-pack">

              <div>

                <span>

                  {t("selectedPack")}

                </span>

                <h3>

                  {formatCurrency(
                    selectedPack.price
                  )}

                </h3>

              </div>

              <div className="selected-pack-right">

                <Coins size={24} />

                <div>

                  <h2>

                    {selectedPack.tokens}

                  </h2>

                  <span>

                    {t("tokens")}

                  </span>

                </div>

              </div>

            </div>

            <button
              className="premium-button"
              onClick={() =>
  handleBuyTokens(
    `tokens${selectedPack.tokens}`
  )
}
            >

              <Coins size={20} />

              {t("buyTokens")}

            </button>

            <div className="custom-divider">

              <span>

                {t("or")}

              </span>

            </div>

            <div className="custom-card">

              <h3>

                {t("customAmount")}

              </h3>

              <p>

                {t("customAmountDescription")}

              </p>

              <input
                type="number"
                min="0"
                step="0.01"
                value={customAmount}
                placeholder={formatCurrency(
                  1
                )}
                onChange={(e) =>
                  setCustomAmount(
                    e.target.value
                  )
                }
              />

              <div className="custom-result">

                <Coins size={28} />

                <div>

                  <h2>

                    {customTokens}

                  </h2>

                  <span>

                    {t("tokens")}

                  </span>

                </div>

              </div>

              <button
                className="premium-button"
                disabled={
                  customTokens <= 0
                }
                onClick={
                  handleBuyCustom
                }
              >

                <Coins size={20} />

                {t(
                  "buyCustomTokens"
                )}

              </button>

            </div>

          </div>

        </div>

        <div className="premium-footer">

          <ShieldCheck
            size={18}
          />

          <span>

            {t(
              "paymentsSecured"
            )}

          </span>

        </div>

      </div>


    </div>

  );
}