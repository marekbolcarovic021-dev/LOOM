import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

export const DEFAULT_PROFILE = {
  name: "User",
  country: "Slovakia",
  currency: "EUR",
  language: "en",
  avatar: "",
  shownInsights: [],
};

export const DEFAULT_SETTINGS = {
  theme: "dark",
  notifications: true,
};

export const DEFAULT_PREMIUM = {
  plan: "free",
  tokens: 3,
  expiresAt: null,
  source: null,
};

export const DEFAULT_STATS = {
  aiQuestions: 0,
  receiptScans: 0,
};

export const DEFAULT_ACCOUNTS = [
  {
    id: "cash",
    name: "Cash",
    type: "cash",
    balance: 0,
    currency: "EUR",
  },
];

function mergeDefaults(data = {}) {
  return {
    profile: {
      ...DEFAULT_PROFILE,
      ...(data.profile || {}),
    },

    settings: {
      ...DEFAULT_SETTINGS,
      ...(data.settings || {}),
    },

    premium: {
      ...DEFAULT_PREMIUM,
      ...(data.premium || {}),
    },

    stats: {
      ...DEFAULT_STATS,
      ...(data.stats || {}),
    },

    transactions: data.transactions || [],
    budgets: data.budgets || [],
    goals: data.goals || [],
    investments: data.investments || [],
    transfers: data.transfers || [],
    accounts:
      data.accounts?.length
        ? data.accounts
        : DEFAULT_ACCOUNTS,
  };
}

export async function loadFinance(uid) {
  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return mergeDefaults();
  }

  return mergeDefaults(snap.data());
}

export async function saveFinance(uid, finance) {
  const ref = doc(db, "users", uid);

  await setDoc(
    ref,
    {
      ...finance,
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    }
  );
}

export async function createUserIfMissing(uid) {
  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);

  if (snap.exists()) {
    return;
  }

  await setDoc(ref, {
    profile: DEFAULT_PROFILE,
    settings: DEFAULT_SETTINGS,
    premium: DEFAULT_PREMIUM,
    stats: DEFAULT_STATS,

    transactions: [],
    budgets: [],
    goals: [],
    investments: [],
    transfers: [],
    accounts: DEFAULT_ACCOUNTS,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}