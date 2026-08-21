const {
  onCall,
  onRequest,
  HttpsError,
} = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const Stripe = require("stripe");

admin.initializeApp();

const db = admin.firestore();

const stripeSecret = defineSecret("STRIPE_SECRET_KEY");

/* =========================================================
   CREATE CHECKOUT SESSION
========================================================= */

exports.createCheckoutSession = onCall(
  {
    secrets: [stripeSecret],
  },
  async (request) => {

    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "User must be logged in."
      );
    }

    const uid = request.auth.uid;
    const { type } = request.data;

    let priceId = "";

    switch (type) {

      case "premium":
        priceId = "price_1U6vl6GwXhNEXH1PqkyQkePP";
        break;

      case "tokens10":
        priceId = "price_1U6vl6GwXhNEXH1PeOjVm877";
        break;

      case "tokens20":
        priceId = "price_1U6vl7GwXhNEXH1PMWXZBWW0";
        break;

      case "tokens50":
        priceId = "price_1U6vl6GwXhNEXH1PhjDCx5r1";
        break;

      case "tokens100":
        priceId = "price_1U6vl7GwXhNEXH1PPa98QMvu";
        break;

      case "customTokens":
        break;

      default:
        throw new HttpsError(
          "invalid-argument",
          "Unknown product."
        );
    }

    try {

      const stripe = new Stripe(
        stripeSecret.value()
      );

      const userRef = admin
        .firestore()
        .collection("users")
        .doc(uid);

      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        throw new HttpsError(
          "not-found",
          "User profile not found."
        );
      }

      const user = userSnap.data();

      let customerId = user?.stripeCustomerId;

/*
 * GET OR CREATE STRIPE CUSTOMER
 */

if (customerId) {
  try {
    // Verify that the customer exists in the current
    // Stripe mode (LIVE or TEST).
    await stripe.customers.retrieve(customerId);
  } catch (error) {
    if (error?.code === "resource_missing") {
      console.log(
        "Stored Stripe customer does not exist in current Stripe mode. Creating a new customer."
      );

      customerId = null;
    } else {
      throw error;
    }
  }
}

if (!customerId) {
  const customer = await stripe.customers.create({
    email: request.auth.token.email || undefined,

    metadata: {
      uid,
    },
  });

  customerId = customer.id;

  await userRef.set(
    {
      stripeCustomerId: customerId,
    },
    { merge: true }
  );
}

      /*
       * CREATE CHECKOUT SESSION
       */

      const session = await stripe.checkout.sessions.create({

        customer: customerId,

        mode:
          type === "premium"
            ? "subscription"
            : "payment",

        /*
         * IMPORTANT:
         * This metadata belongs to the CHECKOUT SESSION.
         */
        metadata: {
          uid,
          product: type,

          tokens:
            type === "customTokens"
              ? String(request.data.tokens || 0)
              : "",
        },

        /*
         * IMPORTANT:
         * For Premium, also put the UID/product
         * onto the actual Stripe subscription.
         *
         * This allows customer.subscription.updated
         * and customer.subscription.deleted to find
         * the correct Firebase user.
         */
        ...(type === "premium"
          ? {
              subscription_data: {
                metadata: {
                  uid,
                  product: "premium",
                },
              },
            }
          : {}),

        line_items:
          type === "customTokens"
            ? [
                {
                  price_data: {
                    currency: "eur",

                    product_data: {
                      name: "LOOM Tokens",
                      description:
                        `${request.data.tokens} LOOM Tokens`,
                    },

                    unit_amount:
                      Math.round(
                        Number(request.data.amount) * 100
                      ),
                  },

                  quantity: 1,
                },
              ]
            : [
                {
                  price: priceId,
                  quantity: 1,
                },
              ],

        success_url:
          "https://loom-cwsr1r5ku-bmx7.vercel.app/premium?success=true",

        cancel_url:
          "https://loom-cwsr1r5ku-bmx7.vercel.app/premium?cancel=true",
      });

      console.log(
        "Stripe Checkout created:",
        {
          sessionId: session.id,
          uid,
          type,
          mode: session.mode,
        }
      );

      return {
        url: session.url,
      };

    } catch (error) {

      console.error(
        "Stripe Checkout error:",
        error
      );

      throw new HttpsError(
        "internal",
        error.message ||
          "Stripe Checkout failed."
      );
    }
  }
);

/* =========================================================
   CANCEL PREMIUM SUBSCRIPTION
========================================================= */

exports.cancelSubscription = onCall(
  {
    secrets: [stripeSecret],
  },
  async (request) => {

    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "User must be logged in."
      );
    }

    const uid = request.auth.uid;

    try {

      const stripe = new Stripe(
        stripeSecret.value()
      );

      const userRef = admin
        .firestore()
        .collection("users")
        .doc(uid);

      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        throw new HttpsError(
          "not-found",
          "User profile not found."
        );
      }

      const user = userSnap.data();

      const customerId =
        user?.stripeCustomerId;

      if (!customerId) {
        throw new HttpsError(
          "failed-precondition",
          "Stripe customer not found."
        );
      }

      const subscriptions =
        await stripe.subscriptions.list({
          customer: customerId,
          status: "active",
          limit: 10,
        });

      if (subscriptions.data.length === 0) {
        throw new HttpsError(
          "failed-precondition",
          "No active subscription found."
        );
      }

      const subscription =
        subscriptions.data[0];

      const updatedSubscription =
        await stripe.subscriptions.update(
          subscription.id,
          {
            cancel_at_period_end: true,
          }
        );

      await userRef.update({

        "premium.cancelAtPeriodEnd":
          true,

        "premium.stripeSubscriptionId":
          subscription.id,

        updatedAt:
          admin.firestore.FieldValue.serverTimestamp(),
      });

      return {

        success: true,

        cancelAtPeriodEnd:
          updatedSubscription.cancel_at_period_end,

        currentPeriodEnd:
          updatedSubscription.current_period_end,
      };

    } catch (error) {

      console.error(
        "Cancel subscription error:",
        error
      );

      if (error instanceof HttpsError) {
        throw error;
      }

      throw new HttpsError(
        "internal",
        error.message ||
          "Could not cancel subscription."
      );
    }
  }
);

exports.checkToken = onCall(
  {
    cors: ["http://localhost:5173",
      "https://loom-cwsr1r5ku-bmx7.vercel.app"
    ],
  },
  async (request) => {

  const uid = request.auth?.uid;

  if (!uid) {
    throw new HttpsError(
      "unauthenticated",
      "You must be logged in."
    );
  }

  const userRef =
    db.collection("users").doc(uid);

  const snap =
    await userRef.get();

  if (!snap.exists) {
    throw new HttpsError(
      "not-found",
      "User account not found."
    );
  }

  const data = snap.data() || {};

  const premium =
    data.premium || {};

  const plan =
    premium.plan || "free";

  const tokens =
    Number(premium.tokens || 0);

  // Premium users can use AI without tokens.
  if (plan === "premium") {

    return {
      success: true,
      allowed: true,
      premium: true,
      remainingTokens: tokens,
    };
  }

  // Free user has no tokens.
  if (tokens <= 0) {

    return {
      success: true,
      allowed: false,
      premium: false,
      remainingTokens: 0,
    };
  }

  return {
    success: true,
    allowed: true,
    premium: false,
    remainingTokens: tokens,
  };
});

/* =========================================================
   CONSUME ONE LOOM TOKEN
========================================================= */

exports.consumeToken = onCall(
  {
    cors: ["http://localhost:5173",
      "https://loom-cwsr1r5ku-bmx7.vercel.app"
    ],
  },
  async (request) => {

  console.log("=================================");
  console.log("CONSUME TOKEN FUNCTION CALLED");

  const uid = request.auth?.uid;

  console.log("UID:", uid);

  if (!uid) {
    console.error("NO AUTHENTICATED USER");

    throw new HttpsError(
      "unauthenticated",
      "You must be logged in."
    );
  }

  try {

    const userRef = db
      .collection("users")
      .doc(uid);

    const result = await db.runTransaction(
      async (transaction) => {

        const snap =
          await transaction.get(userRef);

        console.log(
          "USER DOCUMENT EXISTS:",
          snap.exists
        );

        if (!snap.exists) {

          throw new HttpsError(
            "not-found",
            "User account not found."
          );

        }

        const data =
          snap.data() || {};

        console.log(
          "USER DATA LOADED"
        );

        const premium =
          data.premium || {};

        const plan =
          premium.plan || "free";

        const tokens =
          Number(premium.tokens ?? 0);

        console.log(
          "PLAN:",
          plan
        );

        console.log(
          "TOKENS:",
          tokens
        );

        /*
         * PREMIUM USERS
         */

        if (plan === "premium") {

          console.log(
            "PREMIUM USER - TOKEN NOT CONSUMED"
          );

          return {
            success: true,
            consumed: false,
            premium: true,
            remainingTokens: tokens,
          };

        }

        /*
         * FREE USER WITHOUT TOKENS
         */

        if (tokens <= 0) {

          console.log(
            "NO TOKENS AVAILABLE"
          );

          return {
            success: false,
            consumed: false,
            premium: false,
            remainingTokens: 0,
          };

        }

        /*
         * CONSUME TOKEN
         */

        const remainingTokens =
          tokens - 1;

        console.log(
          "CONSUMING TOKEN"
        );

        console.log(
          "REMAINING TOKENS:",
          remainingTokens
        );

        transaction.update(
          userRef,
          {
            "premium.tokens":
              remainingTokens,
          }
        );

        return {
          success: true,
          consumed: true,
          premium: false,
          remainingTokens,
        };

      }
    );

    console.log(
      "CONSUME TOKEN SUCCESS:",
      result
    );

    console.log("=================================");

    return result;

  } catch (error) {

    console.error(
      "CONSUME TOKEN ERROR:",
      error
    );

    /*
     * Preserve Firebase HttpsErrors
     */

    if (error instanceof HttpsError) {
      throw error;
    }

    throw new HttpsError(
      "internal",
      error?.message ||
        "Failed to consume token."
    );

  }

});

/* =========================================================
   STRIPE WEBHOOK
   Handles successful payments and subscription changes
========================================================= */

const stripeWebhookSecret =
  defineSecret("STRIPE_WEBHOOK_SECRET");

exports.stripeWebhook = onRequest(
  {
    secrets: [
      stripeSecret,
      stripeWebhookSecret,
    ],
  },

  async (req, res) => {

    const stripe = new Stripe(
      stripeSecret.value()
    );

    let event;

    /*
     * VERIFY STRIPE SIGNATURE
     */

    try {

      const signature =
        req.headers["stripe-signature"];

      if (!signature) {
        console.error(
          "Missing Stripe signature."
        );

        return res
          .status(400)
          .send("Missing Stripe signature.");
      }

      event =
        stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          stripeWebhookSecret.value()
        );

    } catch (error) {

      console.error(
        "Stripe webhook signature error:",
        error
      );

      return res
        .status(400)
        .send(
          "Webhook signature verification failed."
        );
    }

    console.log(
      "================================================="
    );

    console.log(
      "STRIPE WEBHOOK EVENT:",
      event.type
    );

    console.log(
      "EVENT ID:",
      event.id
    );

    /*
     * EVENT IDEMPOTENCY
     *
     * Prevent processing the same Stripe event twice.
     */

    try {

      const eventRef = admin
        .firestore()
        .collection("stripeEvents")
        .doc(event.id);

      const alreadyProcessed =
        await eventRef.get();

      if (alreadyProcessed.exists) {

        console.log(
          "Event already processed:",
          event.id
        );

        return res
          .status(200)
          .send("Already processed");
      }

      /* =====================================================
         CHECKOUT SESSION COMPLETED
      ===================================================== */

      if (
        event.type ===
        "checkout.session.completed"
      ) {

        const session =
          event.data.object;

        const uid =
          session.metadata?.uid;

        const product =
          session.metadata?.product;

        console.log(
          "CHECKOUT SESSION:",
          session.id
        );

        console.log(
          "CHECKOUT MODE:",
          session.mode
        );

        console.log(
          "CHECKOUT UID:",
          uid
        );

        console.log(
          "CHECKOUT PRODUCT:",
          product
        );

        /*
         * UID MUST EXIST
         */

        if (!uid) {

          console.error(
            "Checkout session has no UID metadata."
          );

          return res
            .status(400)
            .send("Missing UID.");
        }

        const userRef =
          admin
            .firestore()
            .collection("users")
            .doc(uid);

        const userSnap =
          await userRef.get();

        if (!userSnap.exists) {

          console.error(
            "User not found:",
            uid
          );

          return res
            .status(404)
            .send("User not found.");
        }

        /* =================================================
           PREMIUM PURCHASE
        ================================================= */

        if (
          product === "premium" &&
          session.mode === "subscription"
        ) {

          console.log(
            "PROCESSING PREMIUM PURCHASE"
          );

          const subscriptionId =
            session.subscription;

          if (!subscriptionId) {

            console.error(
              "Premium checkout has no subscription ID."
            );

            return res
              .status(400)
              .send(
                "Missing subscription ID."
              );
          }

          const subscription =
            await stripe.subscriptions.retrieve(
              subscriptionId
            );

          console.log(
            "STRIPE SUBSCRIPTION:",
            subscription.id
          );

         const expiresAt = null;

          /*
           * PREMIUM DOES NOT ADD TOKENS.
           *
           * It simply changes the user's plan
           * to premium.
           */

          await userRef.update({

            "premium.plan":
              "premium",

            "premium.expiresAt":
              expiresAt,

            "premium.purchaseDate":
              admin.firestore.FieldValue
                .serverTimestamp(),

            "premium.source":
              "stripe",

            "premium.stripeSubscriptionId":
              subscription.id,

            "premium.cancelAtPeriodEnd":
              subscription.cancel_at_period_end,

            updatedAt:
              admin.firestore.FieldValue
                .serverTimestamp(),
          });

          console.log(
            "PREMIUM ACTIVATED FOR:",
            uid
          );
        }

        /* =================================================
           FIXED TOKEN PACKAGES
        ================================================= */

        if (
          product === "tokens10" ||
          product === "tokens20" ||
          product === "tokens50" ||
          product === "tokens100"
        ) {

          const tokenAmounts = {

            tokens10: 10,

            tokens20: 20,

            tokens50: 50,

            tokens100: 100,
          };

          const tokensToAdd =
            tokenAmounts[product];

          console.log(
            "TOKEN PURCHASE:",
            product,
            "ADDING:",
            tokensToAdd
          );

          await userRef.update({

            "premium.tokens":
              admin.firestore.FieldValue
                .increment(tokensToAdd),

            updatedAt:
              admin.firestore.FieldValue
                .serverTimestamp(),
          });

          console.log(
            `ADDED ${tokensToAdd} TOKENS TO ${uid}`
          );
        }

        /* =================================================
           CUSTOM TOKEN PURCHASE
        ================================================= */

        if (
          product === "customTokens"
        ) {

          const tokensToAdd =
            Number(
              session.metadata?.tokens || 0
            );

          console.log(
            "CUSTOM TOKEN PURCHASE:",
            tokensToAdd
          );

          if (tokensToAdd <= 0) {

            console.error(
              "Invalid custom token amount."
            );

            return res
              .status(400)
              .send(
                "Invalid token amount."
              );
          }

          await userRef.update({

            "premium.tokens":
              admin.firestore.FieldValue
                .increment(tokensToAdd),

            updatedAt:
              admin.firestore.FieldValue
                .serverTimestamp(),
          });

          console.log(
            `ADDED ${tokensToAdd} CUSTOM TOKENS TO ${uid}`
          );
        }
      }

      /* =====================================================
   SUBSCRIPTION UPDATED
===================================================== */

if (
  event.type ===
  "customer.subscription.updated"
) {
  const subscription = event.data.object;

  console.log(
    "SUBSCRIPTION UPDATED:",
    subscription.id
  );

  /*
   * Stripe can provide the current period end
   * through different representations depending
   * on the API object/version.
   */
  const currentPeriodEnd =
    subscription.current_period_end ??
    subscription.items?.data?.[0]?.current_period_end ??
    null;

  /*
   * The UID should normally be stored in subscription
   * metadata when the subscription is created.
   */
  const uid =
    subscription.metadata?.uid;

  console.log(
    "SUBSCRIPTION UID:",
    uid
  );

  if (!uid) {
    console.error(
      "No UID found in subscription metadata."
    );

    return res.status(400).send(
      "Missing subscription UID."
    );
  }

  const userRef = admin
    .firestore()
    .collection("users")
    .doc(uid);

  const updateData = {
    "premium.stripeSubscriptionId":
      subscription.id,

    "premium.cancelAtPeriodEnd":
      subscription.cancel_at_period_end ?? false,

    updatedAt:
      admin.firestore.FieldValue.serverTimestamp(),
  };

  /*
   * Only update expiresAt when Stripe actually
   * provides a valid period end.
   */
  if (
    typeof currentPeriodEnd === "number" &&
    Number.isFinite(currentPeriodEnd)
  ) {
    updateData["premium.expiresAt"] =
      admin.firestore.Timestamp.fromMillis(
        Math.floor(currentPeriodEnd * 1000)
      );
  } else {
    console.warn(
      "Stripe current_period_end unavailable. " +
      "Keeping existing premium.expiresAt."
    );
  }

  /*
   * IMPORTANT:
   *
   * Canceling a subscription does NOT immediately
   * remove Premium.
   *
   * Stripe's cancel_at_period_end = true means:
   * user keeps Premium until expiresAt.
   */
  if (subscription.cancel_at_period_end === true) {
    updateData["premium.plan"] = "premium";

    console.log(
      "Premium remains active until the end of the billing period."
    );
  }

  await userRef.update(updateData);

  console.log(
    "SUBSCRIPTION UPDATED SUCCESSFULLY:",
    uid
  );
}

      /* =====================================================
         SUBSCRIPTION DELETED
      ===================================================== */

      if (
        event.type ===
        "customer.subscription.deleted"
      ) {

        const subscription =
          event.data.object;

        const uid =
          subscription.metadata?.uid;

        console.log(
          "SUBSCRIPTION DELETED:",
          subscription.id
        );

        console.log(
          "SUBSCRIPTION UID:",
          uid
        );

        if (uid) {

          const userRef =
            admin
              .firestore()
              .collection("users")
              .doc(uid);

          await userRef.update({

            "premium.plan":
              "free",

            "premium.expiresAt":
              null,

            "premium.cancelAtPeriodEnd":
              false,

            "premium.stripeSubscriptionId":
              null,

            updatedAt:
              admin.firestore.FieldValue
                .serverTimestamp(),
          });

          console.log(
            "PREMIUM ENDED FOR:",
            uid
          );
        }
      }

      /*
       * ONLY MARK EVENT PROCESSED AFTER
       * SUCCESSFUL PROCESSING.
       */

      await eventRef.set({

        type:
          event.type,

        processedAt:
          admin.firestore.FieldValue
            .serverTimestamp(),
      });

      console.log(
        "EVENT PROCESSED:",
        event.id
      );

      console.log(
        "================================================="
      );

      return res
        .status(200)
        .send("OK");

    } catch (error) {

      console.error(
        "STRIPE WEBHOOK PROCESSING ERROR:",
        error
      );

      return res
        .status(500)
        .send(
          "Webhook processing failed."
        );
    }
  }
);

/* =========================================================
   DELETE ACCOUNT
   Deletes:
   - Stripe subscription
   - all Firestore user data
   - Firebase Authentication account
========================================================= */

exports.deleteAccount = onCall(
  {
    secrets: [stripeSecret],
  },
  async (request) => {

    /*
     * User must be authenticated.
     */
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "You must be logged in to delete your account."
      );
    }

    const uid = request.auth.uid;

    console.log(
      "ACCOUNT DELETION REQUEST:",
      uid
    );

    const db = admin.firestore();
    const userRef = db
      .collection("users")
      .doc(uid);

    try {

      /* =====================================================
         1. GET USER DATA
      ===================================================== */

      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        console.log(
          "Firestore user document does not exist:",
          uid
        );
      }

      const userData = userSnap.exists
        ? userSnap.data()
        : {};

      /* =====================================================
         2. CANCEL STRIPE SUBSCRIPTION
      ===================================================== */

      const subscriptionId =
        userData?.premium?.stripeSubscriptionId;

      if (subscriptionId) {

        console.log(
          "CANCELING STRIPE SUBSCRIPTION:",
          subscriptionId
        );

        const stripe =
          new Stripe(stripeSecret.value());

        try {

          await stripe.subscriptions.cancel(
            subscriptionId
          );

          console.log(
            "STRIPE SUBSCRIPTION CANCELED:",
            subscriptionId
          );

        } catch (stripeError) {

          /*
           * If Stripe says the subscription
           * is already canceled / missing,
           * we can continue deleting the account.
           */
          console.warn(
            "Stripe subscription cancellation warning:",
            stripeError.message
          );
        }
      }

      /* =====================================================
         3. DELETE ALL FIRESTORE USER DATA
      ===================================================== */

      console.log(
        "DELETING FIRESTORE DATA:",
        uid
      );

      /*
       * recursiveDelete removes the user document
       * AND all of its subcollections.
       */
      await db.recursiveDelete(userRef);

      console.log(
        "FIRESTORE DATA DELETED:",
        uid
      );

      /* =====================================================
         4. DELETE FIREBASE AUTH ACCOUNT
      ===================================================== */

      console.log(
        "DELETING FIREBASE AUTH USER:",
        uid
      );

      await admin.auth().deleteUser(uid);

      console.log(
        "FIREBASE AUTH USER DELETED:",
        uid
      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "ACCOUNT DELETION ERROR:",
        error
      );

      throw new HttpsError(
        "internal",
        "Account deletion failed."
      );
    }
  }
);