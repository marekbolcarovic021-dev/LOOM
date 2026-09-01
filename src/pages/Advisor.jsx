import {
  useState,
  useRef,
  useEffect,
} from "react";

import { useTranslation } from "react-i18next";

import { useFinance } from "../context/FinanceContext";

import { formatCurrency } from "../Utils/currency";

import BottomNav from "../components/BottomNav";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import AITransactionImporter from "../components/advisor/AITransactionImporter";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Bot,
  User,
  SendHorizontal,
  MessageSquare,
  Plus,
  Trash2,
  Coins,
} from "lucide-react";

import {
    loadChats,
    saveChats,
    deleteChat
} from "../Utils/chatStorage";

import { useNavigate } from "react-router-dom";


function Advisor() {
 const {
  goals,
  transactions,
  accounts,
  profile,
  checkToken,
  consumeToken,
  premium,
} = useFinance();

const isPremium = premium?.plan === "premium";

const navigate = useNavigate();

const { t, i18n } =
  useTranslation();

  const [
    selectedGoalId,
    setSelectedGoalId,
  ] = useState("");

  const [
  extraSavings,
  setExtraSavings,
] = useState(0);

const [
  incomeIncrease,
  setIncomeIncrease,
] = useState(0);

const [
  expenseReduction,
  setExpenseReduction,
] = useState(0);

  const selectedGoal = goals.find(
    (goal) =>
      goal.id === Number(selectedGoalId)
  );

 // ==========================
// FUTURE VISION FINANCIAL DATA
// ==========================
//
// Future Vision uses the user's recent financial behavior.
// We use a rolling 3-month period instead of treating all
// historical transactions as "monthly" income/expenses.
//
// This section is ONLY for Future Vision.
// The AI Coach below has its own financial analysis.
// ==========================

const futureVisionNow = new Date();

const futureVisionThreeMonthsAgo =
  new Date(futureVisionNow);

futureVisionThreeMonthsAgo.setMonth(
  futureVisionThreeMonthsAgo.getMonth() - 3
);


// ----------------------------------------------------------
// RECENT TRANSACTIONS
// ----------------------------------------------------------

const futureVisionRecentTransactions =
  transactions.filter((transaction) => {

    const transactionDate =
      new Date(transaction.date);

    return (
      !Number.isNaN(
        transactionDate.getTime()
      ) &&
      transactionDate >=
        futureVisionThreeMonthsAgo &&
      transactionDate <=
        futureVisionNow
    );
  });


// ----------------------------------------------------------
// THREE-MONTH INCOME / EXPENSES
// ----------------------------------------------------------

const futureVisionThreeMonthIncome =
  futureVisionRecentTransactions
    .filter(
      (transaction) =>
        transaction.type ===
        "Income"
    )
    .reduce(
      (sum, transaction) =>
        sum +
        Number(
          transaction.amount || 0
        ),
      0
    );

const futureVisionThreeMonthExpenses =
  futureVisionRecentTransactions
    .filter(
      (transaction) =>
        transaction.type ===
        "Expense"
    )
    .reduce(
      (sum, transaction) =>
        sum +
        Number(
          transaction.amount || 0
        ),
      0
    );


// ----------------------------------------------------------
// AVERAGE MONTHLY VALUES
// ----------------------------------------------------------

const monthlyIncome =
  futureVisionThreeMonthIncome / 3;

const monthlyExpenses =
  futureVisionThreeMonthExpenses / 3;

const monthlySavings =
  monthlyIncome -
  monthlyExpenses;


// ----------------------------------------------------------
// CATEGORY ANALYSIS
// ----------------------------------------------------------

const categoryExpenses = {};

futureVisionRecentTransactions
  .filter(
    (transaction) =>
      transaction.type ===
      "Expense"
  )
  .forEach((transaction) => {

    const category =
      transaction.category ||
      "Other";

    categoryExpenses[category] =
      (
        categoryExpenses[category] ||
        0
      ) +
      Number(
        transaction.amount || 0
      );
  });

const topExpenseCategory =
  Object.entries(
    categoryExpenses
  )
    .sort(
      (a, b) =>
        b[1] - a[1]
    )[0];


// ----------------------------------------------------------
// SPECIFIC EXPENSE CATEGORIES
// ----------------------------------------------------------

const foodExpenses =
  categoryExpenses["Food"] || 0;

const subscriptionsExpenses =
  futureVisionRecentTransactions
    .filter(
      (transaction) =>
        transaction.type ===
          "Expense" &&
        [
          "Netflix",
          "Spotify",
          "Subscriptions",
        ].includes(
          transaction.category
        )
    )
    .reduce(
      (sum, transaction) =>
        sum +
        Number(
          transaction.amount || 0
        ),
      0
    );


// ----------------------------------------------------------
// EXPENSE RATIO
// ----------------------------------------------------------

const expenseRatio =
  monthlyIncome > 0
    ? Math.round(
        (
          monthlyExpenses /
          monthlyIncome
        ) * 100
      )
    : 0;


// ==========================
// GOAL CALCULATIONS
// ==========================

let requiredMonthlySavings = 0;
let probability = 0;
let expectedYears = 0;
let daysSaved = 0;
let incomeGap = 0;
let incomeIncreaseNeeded = 0;

if (selectedGoal) {

  const targetAmount =
    Math.max(
      0,
      Number(
        selectedGoal.amount || 0
      )
    );

  const currentAmount =
    Math.max(
      0,
      Number(
        selectedGoal.currentSavings ||
          0
      )
    );

  const yearsRemaining =
    Math.max(
      0,
      Number(
        selectedGoal.deadline || 0
      )
    );

  const monthsRemaining =
    Math.max(
      Math.round(
        yearsRemaining * 12
      ),
      1
    );

  const remaining =
    Math.max(
      0,
      targetAmount -
        currentAmount
    );


  // --------------------------------------------------------
  // GOAL ALREADY ACHIEVED
  // --------------------------------------------------------

  if (
    currentAmount >=
    targetAmount
  ) {

    requiredMonthlySavings = 0;

    probability = 100;

    expectedYears = 0;

    daysSaved =
      Math.round(
        yearsRemaining *
          365
      );

    incomeGap = 0;

    incomeIncreaseNeeded = 0;

  } else {

    // ------------------------------------------------------
    // REQUIRED MONTHLY SAVINGS
    // ------------------------------------------------------

    requiredMonthlySavings =
      remaining /
      monthsRemaining;


    // ------------------------------------------------------
    // CURRENT PROBABILITY
    // ------------------------------------------------------

    if (
      monthlySavings >=
      requiredMonthlySavings
    ) {

      probability = 100;

    } else if (
      monthlySavings <= 0
    ) {

      probability = 0;

    } else {

      probability =
        Math.min(
          100,
          Math.round(
            (
              monthlySavings /
              requiredMonthlySavings
            ) * 100
          )
        );
    }


    // ------------------------------------------------------
    // EXPECTED COMPLETION
    // ------------------------------------------------------

    if (
      monthlySavings > 0
    ) {

      const monthsNeeded =
        remaining /
        monthlySavings;

      expectedYears =
        monthsNeeded / 12;

    } else {

      // Infinity means the goal is not currently
      // reachable using the present saving rate.
      expectedYears =
        Infinity;
    }


    // ------------------------------------------------------
    // TIME ADVANTAGE
    // ------------------------------------------------------

    if (
      Number.isFinite(
        expectedYears
      ) &&
      expectedYears <
        yearsRemaining
    ) {

      daysSaved =
        Math.max(
          0,
          Math.round(
            (
              yearsRemaining -
              expectedYears
            ) * 365
          )
        );

    } else {

      daysSaved = 0;

    }


    // ------------------------------------------------------
    // MONTHLY GAP
    // ------------------------------------------------------

    incomeGap =
      Math.max(
        0,
        Math.round(
          requiredMonthlySavings -
            monthlySavings
        )
      );


    // ------------------------------------------------------
    // INCOME INCREASE NEEDED
    // ------------------------------------------------------

    incomeIncreaseNeeded =
      monthlyIncome > 0
        ? Math.max(
            0,
            Math.round(
              (
                incomeGap /
                monthlyIncome
              ) * 100
            )
          )
        : 0;
  }
}


// ----------------------------------------------------------
// FUTURE VISION PROFILE
// ----------------------------------------------------------

const financialProfile = {

  monthlyIncome:
    Math.round(
      monthlyIncome
    ),

  monthlyExpenses:
    Math.round(
      monthlyExpenses
    ),

  monthlySavings:
    Math.round(
      monthlySavings
    ),

  expenseRatio,

  netWorth:
    accounts.reduce(
      (sum, account) =>
        sum +
        Number(
          account.balance || 0
        ),
      0
    ),

  totalAccounts:
    accounts.length,

  totalGoals:
    goals.length,

  biggestExpenseCategory:
    topExpenseCategory
      ? topExpenseCategory[0]
      : "None",

  biggestExpenseAmount:
    topExpenseCategory
      ? Math.round(
          Number(
            topExpenseCategory[1]
          ) / 3
        )
      : 0,

  selectedGoal:
    selectedGoal
      ? {
          name:
            selectedGoal.name,

          targetAmount:
            Math.max(
              0,
              Number(
                selectedGoal.amount ||
                  0
              )
            ),

          currentSavings:
            Math.max(
              0,
              Number(
                selectedGoal.currentSavings ||
                  0
              )
            ),

          deadline:
            Math.max(
              0,
              Number(
                selectedGoal.deadline ||
                  0
              )
            ),

          successProbability:
            probability,

          requiredMonthlySavings:
            Math.round(
              requiredMonthlySavings
            ),

          expectedCompletionYears:
            Number.isFinite(
              expectedYears
            )
              ? Math.round(
                  expectedYears
                )
              : null,
        }
      : null,
};


// ==========================
// WHAT IF SIMULATOR
// ==========================

// ----------------------------------------------------------
// SAFE SIMULATION VALUES
// ----------------------------------------------------------

const safeExtraSavings =
  Math.max(
    0,
    Number(
      extraSavings || 0
    )
  );

const safeIncomeIncrease =
  Math.max(
    0,
    Number(
      incomeIncrease || 0
    )
  );

const safeExpenseReduction =
  Math.min(
    Math.max(
      0,
      Number(
        expenseReduction || 0
      )
    ),
    Math.max(
      0,
      monthlyExpenses
    )
  );


// ----------------------------------------------------------
// SIMULATED MONTHLY SAVINGS
// ----------------------------------------------------------

const simulatedSavings =
  monthlySavings +
  safeExtraSavings +
  safeExpenseReduction +
  monthlyIncome *
    (
      safeIncomeIncrease /
      100
    );


// ----------------------------------------------------------
// SIMULATED GOAL
// ----------------------------------------------------------

let simulatedYears = 0;

if (selectedGoal) {

  const remaining =
    Math.max(
      0,
      Number(
        selectedGoal.amount || 0
      ) -
      Number(
        selectedGoal.currentSavings ||
          0
      )
    );


  if (remaining <= 0) {

    simulatedYears = 0;

  } else if (
    simulatedSavings > 0
  ) {

    simulatedYears =
      remaining /
      (
        simulatedSavings *
        12
      );

  } else {

    simulatedYears =
      Infinity;
  }
}


// ----------------------------------------------------------
// SIMULATED PROBABILITY
// ----------------------------------------------------------

let simulatedProbability = 0;

if (
  selectedGoal
) {

  const targetAmount =
    Math.max(
      0,
      Number(
        selectedGoal.amount || 0
      )
    );

  const currentAmount =
    Math.max(
      0,
      Number(
        selectedGoal.currentSavings ||
          0
      )
    );

  const remaining =
    Math.max(
      0,
      targetAmount -
        currentAmount
    );


  if (
    remaining <= 0
  ) {

    simulatedProbability = 100;

  } else if (
    requiredMonthlySavings <= 0
  ) {

    simulatedProbability = 0;

  } else if (
    simulatedSavings <= 0
  ) {

    simulatedProbability = 0;

  } else {

    simulatedProbability =
      Math.min(
        100,
        Math.round(
          (
            simulatedSavings /
            requiredMonthlySavings
          ) * 100
        )
      );
  }
}


// ==========================
// PROJECTION DATA
// ==========================

const projectionData = [];

if (selectedGoal) {

  const currentBalance =
    Math.max(
      0,
      Number(
        selectedGoal.currentSavings ||
          0
      )
    );

  const improvedSavings =
    simulatedSavings;


  // --------------------------------------------------------
  // Choose a useful chart horizon.
  //
  // At least 10 years, but extend it if the goal itself
  // has a longer deadline or the simulated path needs
  // longer to reach the goal.
  //
  // Maximum 30 years prevents an enormous chart.
  // --------------------------------------------------------

  const deadlineYears =
    Math.max(
      0,
      Number(
        selectedGoal.deadline ||
          0
      )
    );

  const requiredProjectionYears =
    Number.isFinite(
      simulatedYears
    )
      ? Math.ceil(
          simulatedYears
        )
      : 0;

  const projectionYears =
    Math.min(
      30,
      Math.max(
        10,
        Math.ceil(
          deadlineYears
        ),
        requiredProjectionYears
      )
    );


  let currentValue =
    currentBalance;

  let improvedValue =
    currentBalance;


  for (
    let year = 0;
    year <= projectionYears;
    year++
  ) {

    projectionData.push({

      year:
        new Date()
          .getFullYear() +
        year,

      current:
        Math.round(
          currentValue
        ),

      improved:
        Math.round(
          improvedValue
        ),
    });


    currentValue +=
      monthlySavings *
      12;

    improvedValue +=
      improvedSavings *
      12;
  }
}


// ==========================
// ESTIMATED GOAL DATE
// ==========================

let estimatedGoalDate =
  t("unknown");

if (
  selectedGoal
) {

  const targetAmount =
    Math.max(
      0,
      Number(
        selectedGoal.amount || 0
      )
    );

  const currentAmount =
    Math.max(
      0,
      Number(
        selectedGoal.currentSavings ||
          0
      )
    );

  const remaining =
    Math.max(
      0,
      targetAmount -
        currentAmount
    );


  // --------------------------------------------------------
  // Goal already achieved
  // --------------------------------------------------------

  if (
    remaining <= 0
  ) {

    estimatedGoalDate =
      new Date().toLocaleDateString(
        i18n.language,
        {
          month: "long",
          year: "numeric",
        }
      );

  }

  // --------------------------------------------------------
  // Goal can be reached
  // --------------------------------------------------------

  else if (
    simulatedSavings > 0
  ) {

    const monthsNeeded =
      Math.ceil(
        remaining /
        simulatedSavings
      );

    const goalDate =
      new Date();

    goalDate.setMonth(
      goalDate.getMonth() +
      monthsNeeded
    );

    estimatedGoalDate =
      goalDate.toLocaleDateString(
        i18n.language,
        {
          month: "long",
          year: "numeric",
        }
      );

  }

  // --------------------------------------------------------
  // Goal currently unreachable
  // --------------------------------------------------------

  else {

    estimatedGoalDate =
      t("unknown");
  }
}

   // ==========================================================
// AI FINANCIAL COACH
// ==========================================================

// ----------------------------------------------------------
// CHAT STORAGE / INITIALIZATION
// ----------------------------------------------------------

const createWelcomeMessage = () => ({
  id: `welcome-${Date.now()}-${Math.random()}`,
  sender: "ai",
  isWelcome: true,
});

const createConversation = () => ({
  id: `chat-${Date.now()}-${Math.random()}`,
  title: t("newChat"),
  createdAt: Date.now(),
  messages: [
    createWelcomeMessage(),
  ],
});

const [conversations, setConversations] =
  useState(() => {
    const storedChats = loadChats();

    if (
      Array.isArray(storedChats) &&
      storedChats.length > 0
    ) {
      return storedChats.map((chat) => ({
        ...chat,
        messages:
          Array.isArray(chat.messages) &&
          chat.messages.length > 0
            ? chat.messages
            : [createWelcomeMessage()],
      }));
    }

    return [createConversation()];
  });

const [activeConversation, setActiveConversation] =
  useState(() => {
    const storedChats = loadChats();

    if (
      Array.isArray(storedChats) &&
      storedChats.length > 0
    ) {
      return storedChats[0].id;
    }

    return null;
  });

const [input, setInput] =
  useState("");

const [thinking, setThinking] =
  useState(false);

const chatEndRef =
  useRef(null);

const chatInputRef =
  useRef(null);

const sendingRef =
  useRef(false);


// ----------------------------------------------------------
// ENSURE ACTIVE CHAT EXISTS
// ----------------------------------------------------------

useEffect(() => {
  if (!activeConversation) {
    if (conversations.length > 0) {
      setActiveConversation(
        conversations[0].id
      );
    }

    return;
  }

  const exists =
    conversations.some(
      (conversation) =>
        conversation.id ===
        activeConversation
    );

  if (!exists && conversations.length > 0) {
    setActiveConversation(
      conversations[0].id
    );
  }
}, [
  conversations,
  activeConversation,
]);


// ----------------------------------------------------------
// CURRENT CHAT
// ----------------------------------------------------------

const currentConversation =
  conversations.find(
    (conversation) =>
      conversation.id ===
      activeConversation
  );

const messages =
  currentConversation?.messages || [];


// ----------------------------------------------------------
// UPDATE CURRENT CHAT MESSAGES
// ----------------------------------------------------------

function updateMessages(updater) {
  setConversations(
    (previousConversations) =>
      previousConversations.map(
        (conversation) => {

          if (
            conversation.id !==
            activeConversation
          ) {
            return conversation;
          }

          const previousMessages =
            Array.isArray(
              conversation.messages
            )
              ? conversation.messages
              : [];

          const newMessages =
            typeof updater === "function"
              ? updater(
                  previousMessages
                )
              : updater;

          return {
            ...conversation,
            messages: newMessages,
          };
        }
      )
  );
}


// ----------------------------------------------------------
// CREATE NEW CHAT
// ----------------------------------------------------------

function createNewChat() {
  const newConversation =
    createConversation();

  setConversations(
    (previousConversations) => [
      newConversation,
      ...previousConversations,
    ]
  );

  setActiveConversation(
    newConversation.id
  );

  setInput("");

  // Focus the input after the new chat appears.
  setTimeout(() => {
    chatInputRef.current?.focus();
  }, 50);
}


// ----------------------------------------------------------
// DELETE CHAT
// ----------------------------------------------------------

function removeConversation(id) {

  const remainingChats =
    conversations.filter(
      (conversation) =>
        conversation.id !== id
    );

  // ----------------------------------------------
  // If this was the last chat, create a clean one.
  // ----------------------------------------------

  if (
    remainingChats.length === 0
  ) {

    const replacementChat =
      createConversation();

    setConversations([
      replacementChat,
    ]);

    setActiveConversation(
      replacementChat.id
    );

    setInput("");

    setTimeout(() => {
      chatInputRef.current?.focus();
    }, 50);

    return;
  }

  // ----------------------------------------------
  // Normal deletion
  // ----------------------------------------------

  setConversations(
    remainingChats
  );

  if (
    activeConversation === id
  ) {
    setActiveConversation(
      remainingChats[0].id
    );
  }
}


// ----------------------------------------------------------
// FORMAT CHAT DATE
// ----------------------------------------------------------

function formatChatDate(timestamp) {

  const date =
    new Date(timestamp);

  const today =
    new Date();

  if (
    date.toDateString() ===
    today.toDateString()
  ) {
    return t("today");
  }

  const yesterday =
    new Date();

  yesterday.setDate(
    today.getDate() - 1
  );

  if (
    date.toDateString() ===
    yesterday.toDateString()
  ) {
    return t("yesterday");
  }

  return date.toLocaleDateString(
    i18n.language,
    {
      day: "numeric",
      month: "short",
    }
  );
}


// ----------------------------------------------------------
// THREE-MONTH AI FINANCIAL ANALYSIS
// ----------------------------------------------------------
//
// IMPORTANT:
// This is intentionally separate from the existing
// Future Vision calculations above.
// We are changing ONLY what the AI coach receives.
//
// ----------------------------------------------------------

const now =
  new Date();

const threeMonthsAgo =
  new Date(now);

threeMonthsAgo.setMonth(
  threeMonthsAgo.getMonth() - 3
);

const aiRecentTransactions =
  transactions.filter(
    (transaction) => {

      const transactionDate =
        new Date(
          transaction.date
        );

      return (
        !Number.isNaN(
          transactionDate.getTime()
        ) &&
        transactionDate >=
          threeMonthsAgo &&
        transactionDate <= now
      );
    }
  );


// ----------------------------------------------------------
// SAFE TRANSACTION AMOUNTS
// ----------------------------------------------------------

const aiIncomeTransactions =
  aiRecentTransactions.filter(
    (transaction) =>
      transaction.type ===
      "Income"
  );

const aiExpenseTransactions =
  aiRecentTransactions.filter(
    (transaction) =>
      transaction.type ===
      "Expense"
  );


// ----------------------------------------------------------
// THREE-MONTH TOTALS
// ----------------------------------------------------------

const aiThreeMonthIncome =
  aiIncomeTransactions.reduce(
    (sum, transaction) =>
      sum +
      Number(
        transaction.amount || 0
      ),
    0
  );

const aiThreeMonthExpenses =
  aiExpenseTransactions.reduce(
    (sum, transaction) =>
      sum +
      Number(
        transaction.amount || 0
      ),
    0
  );

const aiThreeMonthSavings =
  aiThreeMonthIncome -
  aiThreeMonthExpenses;


// ----------------------------------------------------------
// MONTHLY AVERAGES
// ----------------------------------------------------------

const aiAverageMonthlyIncome =
  aiThreeMonthIncome / 3;

const aiAverageMonthlyExpenses =
  aiThreeMonthExpenses / 3;

const aiAverageMonthlySavings =
  aiThreeMonthSavings / 3;

const aiSavingsRate =
  aiAverageMonthlyIncome > 0
    ? Math.round(
        (
          aiAverageMonthlySavings /
          aiAverageMonthlyIncome
        ) * 100
      )
    : 0;


// ----------------------------------------------------------
// EXPENSE CATEGORY ANALYSIS
// ----------------------------------------------------------

const aiCategoryExpenses = {};

aiExpenseTransactions.forEach(
  (transaction) => {

    const category =
      transaction.category ||
      "Other";

    aiCategoryExpenses[
      category
    ] =
      (
        aiCategoryExpenses[
          category
        ] || 0
      ) +
      Number(
        transaction.amount || 0
      );
  }
);

const aiTopExpenseCategories =
  Object.entries(
    aiCategoryExpenses
  )
    .sort(
      (a, b) =>
        b[1] - a[1]
    )
    .slice(0, 10)
    .map(
      ([category, amount]) => ({
        category,
        threeMonthAmount:
          Math.round(amount),
        averageMonthlyAmount:
          Math.round(
            amount / 3
          ),
      })
    );


// ----------------------------------------------------------
// ACCOUNT / NET WORTH DATA
// ----------------------------------------------------------

const aiNetWorth =
  accounts.reduce(
    (sum, account) =>
      sum +
      Number(
        account.balance || 0
      ),
    0
  );


// ----------------------------------------------------------
// ACCOUNT BREAKDOWN
// ----------------------------------------------------------

const aiAccounts =
  accounts.map(
    (account) => ({
      name:
        account.name ||
        "Unknown",

      type:
        account.type ||
        "Unknown",

      balance:
        Number(
          account.balance || 0
        ),
    })
  );


// ----------------------------------------------------------
// GOAL SUMMARY
// ----------------------------------------------------------

const aiGoals =
  goals.map(
    (goal) => ({
      name:
        goal.name,

      targetAmount:
        Number(
          goal.amount || 0
        ),

      currentSavings:
        Number(
          goal.currentSavings ||
            0
        ),

      deadline:
        Number(
          goal.deadline || 0
        ),
    })
  );


// ----------------------------------------------------------
// RECENT TRANSACTIONS FOR CONTEXT
// ----------------------------------------------------------
//
// Only send a reasonable number of transactions to
// the coach. The full three-month totals/categories are
// already supplied above.
//
// ----------------------------------------------------------

const aiRecentTransactionDetails =
  [...aiRecentTransactions]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, 100)
    .map(
      (transaction) => {

        const account =
          accounts.find(
            (item) =>
              item.id ===
              transaction.accountId
          );

        return {
          date:
            transaction.date,

          type:
            transaction.type,

          category:
            transaction.category ||
            "Other",

          amount:
            Number(
              transaction.amount ||
                0
            ),

          account:
            account?.name ||
            "Unknown",
        };
      }
    );


// ----------------------------------------------------------
// AI COACH FINANCIAL PROFILE
// ----------------------------------------------------------

const aiFinancialProfile = {

  currency:
    profile.currency,

  language:
    i18n.language,

  analysisPeriod:
    "last 3 months",

  analysisStart:
    threeMonthsAgo.toISOString(),

  analysisEnd:
    now.toISOString(),

  threeMonthTotals: {

    income:
      Math.round(
        aiThreeMonthIncome
      ),

    expenses:
      Math.round(
        aiThreeMonthExpenses
      ),

    savings:
      Math.round(
        aiThreeMonthSavings
      ),
  },

  monthlyAverages: {

    income:
      Math.round(
        aiAverageMonthlyIncome
      ),

    expenses:
      Math.round(
        aiAverageMonthlyExpenses
      ),

    savings:
      Math.round(
        aiAverageMonthlySavings
      ),
  },

  savingsRate:
    aiSavingsRate,

  netWorth:
    Math.round(
      aiNetWorth
    ),

  totalAccounts:
    accounts.length,

  totalGoals:
    goals.length,

  topExpenseCategories:
    aiTopExpenseCategories,

  accounts:
    aiAccounts,

  goals:
    aiGoals,

  recentTransactions:
    aiRecentTransactionDetails,
};


// ----------------------------------------------------------
// QUICK PROMPTS
// ----------------------------------------------------------

const quickPrompts = [
  t("promptSaveMoney"),
  t("promptAnalyzeSpending"),
  t("promptAchieveGoals"),
  t("promptBiggestExpense"),
  t("promptFinancialSummary"),
];


// ----------------------------------------------------------
// SEND MESSAGE
// ----------------------------------------------------------

async function sendMessage(
  customMessage = null
) {

  // ----------------------------------------------
  // Prevent multiple simultaneous requests
  // ----------------------------------------------

  if (sendingRef.current) {
    return;
  }

  const messageText = (
    customMessage ??
    input
  ).trim();

  if (!messageText) {
    return;
  }

  sendingRef.current = true;
  setThinking(true);

  try {

    // ==================================================
    // 1. CHECK TOKEN
    // ==================================================
    //
    // Premium = unlimited.
    // Free = one token per successful answer.
    //
    // ==================================================

    if (!isPremium) {

      const tokenResult =
        await checkToken();

      if (
        !tokenResult ||
        !tokenResult.allowed
      ) {

        updateMessages(
          (previousMessages) => [
            ...previousMessages,
            {
              id:
                `msg-${Date.now()}-${Math.random()}`,
              sender: "ai",
              text:
                t(
                  "noTokensAvailable"
                ),
            },
          ]
        );

        return;
      }
    }


    // ==================================================
    // 2. CREATE USER MESSAGE
    // ==================================================

    const userMessage = {
      id:
        `msg-${Date.now()}-${Math.random()}`,

      sender:
        "user",

      text:
        messageText,

      createdAt:
        Date.now(),
    };


    // ==================================================
    // 3. CAPTURE CONVERSATION HISTORY
    // ==================================================
    //
    // Use the conversation BEFORE adding the new
    // message so the history does not contain a
    // duplicate copy of the current question.
    //
    // ==================================================

    const conversationHistory =
      (
        currentConversation
          ?.messages || []
      )
        .filter(
          (message) =>
            !message.isWelcome &&
            message.text
        )
        .slice(-20)
        .map(
          (message) => ({
            role:
              message.sender ===
              "user"
                ? "user"
                : "assistant",

            content:
              message.text,
          })
        );


    // ==================================================
    // 4. ADD USER MESSAGE TO UI
    // ==================================================

    updateMessages(
      (previousMessages) => [
        ...previousMessages,
        userMessage,
      ]
    );


    // ==================================================
    // 5. UPDATE CHAT TITLE
    // ==================================================

    const currentTitle =
      currentConversation?.title;

    const isNewChat =
      !currentTitle ||
      currentTitle ===
        t("newChat");

    if (isNewChat) {

      const cleanTitle =
        messageText
          .replace(/\s+/g, " ")
          .trim();

      const title =
        cleanTitle.length > 40
          ? `${cleanTitle.substring(
              0,
              40
            )}...`
          : cleanTitle;

      setConversations(
        (previousConversations) =>
          previousConversations.map(
            (conversation) =>
              conversation.id ===
              activeConversation
                ? {
                    ...conversation,
                    title,
                  }
                : conversation
          )
      );
    }


    // Clear input immediately
    setInput("");


    // ==================================================
    // 6. SEND TO AI SERVER
    // ==================================================

    const response =
      await fetch(
        "/api/chat",
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({

              // Current question
              message:
                messageText,

              // Current language
              language:
                i18n.language,

              // Proper 3-month financial analysis
              profile:
                aiFinancialProfile,

              // Full recent transaction context
              transactions:
                aiRecentTransactionDetails,

              // Current accounts
              accounts:
                aiAccounts,

              // Current goals
              goals:
                aiGoals,

              // Previous conversation
              conversationHistory:
                conversationHistory,

            }),
        }
      );


    // ==================================================
    // 7. HANDLE SERVER ERRORS
    // ==================================================

    if (!response.ok) {

      let serverMessage =
        "";

      try {
        const errorData =
          await response.json();

        serverMessage =
          errorData?.error ||
          errorData?.message ||
          "";
      } catch {
        // Ignore JSON parsing failure.
      }

      throw new Error(
        serverMessage ||
          `AI server returned ${response.status}`
      );
    }


    // ==================================================
    // 8. READ RESPONSE
    // ==================================================

    const data =
      await response.json();

    const reply =
      typeof data?.reply ===
      "string"
        ? data.reply.trim()
        : "";


    if (!reply) {

      throw new Error(
        "AI returned no response."
      );
    }


    // ==================================================
    // 9. CONSUME TOKEN
    // ==================================================
    //
    // Premium users do NOT consume tokens.
    //
    // Free users consume one token only after
    // receiving a valid answer.
    //
    // ==================================================

    if (!isPremium) {

      const consumed =
        await consumeToken();

      if (
        !consumed ||
        !consumed.success
      ) {

        throw new Error(
          "Token could not be consumed."
        );
      }
    }


    // ==================================================
    // 10. SHOW AI RESPONSE
    // ==================================================

    updateMessages(
      (previousMessages) => [
        ...previousMessages,
        {
          id:
            `msg-${Date.now()}-${Math.random()}`,

          sender:
            "ai",

          text:
            reply,

          createdAt:
            Date.now(),
        },
      ]
    );

  } catch (error) {

    console.error(
      "AI COACH ERROR:",
      error
    );


    // --------------------------------------------------
    // Error message
    // --------------------------------------------------

    const errorText =
      error?.message ===
      "AI returned no response."
        ? t("noAIResponse")
        : t("unableToContactAI");


    updateMessages(
      (previousMessages) => [
        ...previousMessages,
        {
          id:
            `error-${Date.now()}-${Math.random()}`,

          sender:
            "ai",

          text:
            errorText,

          createdAt:
            Date.now(),
        },
      ]
    );

  } finally {

    sendingRef.current =
      false;

    setThinking(false);

    setTimeout(() => {
      chatInputRef.current?.focus();
    }, 50);
  }
}


// ----------------------------------------------------------
// AUTO-SCROLL
// ----------------------------------------------------------

useEffect(() => {

  chatEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });

}, [messages, thinking]);


// ----------------------------------------------------------
// SAVE CHATS
// ----------------------------------------------------------

useEffect(() => {

  if (
    Array.isArray(
      conversations
    )
  ) {
    saveChats(
      conversations
    );
  }

}, [conversations]);

 return (
  <div className="page-container">

  <div
  className="advisor-token-badge"
  onClick={() => navigate("/premium")}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      navigate("/premium");
    }
  }}
>

  <Coins size={19} />

  <div className="advisor-token-info">

    <span>
      {t("availableTokens")}
    </span>

    <strong>
      {premium?.tokens ?? 0}
    </strong>

  </div>

</div>


  <h1 className="page-title">
    {t("aiAdvisor")}
  </h1>


  <div className="advisor-card">

    <h2>{t("futureVision")}</h2>

    <select
      value={selectedGoalId}
      onChange={(e) =>
        setSelectedGoalId(e.target.value)
      }
    >

      <option value="">
        {t("selectGoal")}
      </option>

      {goals.map((goal) => (

        <option
          key={goal.id}
          value={goal.id}
        >
          {goal.name}
        </option>

      ))}

    </select>


    {selectedGoal && (

      <>

        <div className="vision-grid">

          <div className="vision-box">

            <h3>
              {t("currentPace")}
            </h3>

            <p>
              {formatCurrency(
                monthlySavings,
                profile.currency,
                i18n.language
              )}{" "}
              / {t("month")}
            </p>

          </div>


          <div className="vision-box">

            <h3>
              {t("requiredPace")}
            </h3>

            <p>
              {formatCurrency(
                Math.round(requiredMonthlySavings),
                profile.currency,
                i18n.language
              )}{" "}
              / {t("month")}
            </p>

          </div>


          <div className="vision-box">

            <h3>
              {t("successProbability")}
            </h3>

            <p>
              {probability}%
            </p>

            <span
              className={
                probability >= 90
                  ? "status-good"
                  : probability >= 70
                  ? "status-medium"
                  : "status-danger"
              }
            >
              {probability >= 90
                ? t("excellent")
                : probability >= 70
                ? t("achievable")
                : t("highRisk")}
            </span>

          </div>


          <div className="vision-box">

            <h3>
              {t("expectedCompletion")}
            </h3>

            <p>
              {monthlySavings > 0
                ? `${Math.round(expectedYears)} ${t("years")}`
                : t("never")}
            </p>

          </div>


          <div className="vision-box">

            <h3>
              {t("timeAdvantage")}
            </h3>

            <p>
              {daysSaved > 0
                ? `${daysSaved} ${t("days")}`
                : `0 ${t("days")}`}
            </p>

          </div>


          <div className="vision-box">

            <h3>
              {t("monthlyGap")}
            </h3>

            <p>
              {formatCurrency(
                incomeGap,
                profile.currency,
                i18n.language
              )}
            </p>

            <span>
              {t("additionalSavingsNeeded")}
            </span>

          </div>

        </div>

    

 

  

            <div className="advisor-recommendations">
              <h2>{t("aiRecommendations")}</h2>

              {probability >=
                100 && (
                <p className="advisor-success">
                  🎉 {t("goalAheadOfSchedule")}
                </p>
              )}

              {probability <
                100 && (
                <>
                  <p>
                    {t("recommendationSave")}
                    <strong>
                      {" "}
                      {formatCurrency(
  Math.round(requiredMonthlySavings),
  profile.currency,
  i18n.language
)}
                    </strong>{" "}
                    {t("everyMonth")}
                  </p>

                  <p>
                    {t("currentlySaving")}
                    <strong>
                      {" "}
                      {formatCurrency(
  Math.round(monthlySavings),
  profile.currency,
  i18n.language
)}
                    </strong>{" "}
                    {t("monthly")}
                  </p>

                  <p>
                   {t("needAdditional")}
                    <strong>
                      {" "}
                     {formatCurrency(
  incomeGap,
  profile.currency,
  i18n.language
)}
                    </strong>{" "}
                    {t("perMonth")}
                  </p>
                </>
              )}

              {expenseRatio >
                80 && (
                <p className="warning-text">
                  ⚠️ {t("youSpend")}{" "}
                  <strong>
                    {
                      expenseRatio
                    }
                    %
                  </strong>{" "}
                  {t("ofYourIncome")}
                 {t("considerReducingExpenses")}
                </p>
              )}

              {topExpenseCategory && (
                <p>
                  📊 {t("largestExpenseCategory")}{" "}
                  <strong>
                  {t(
  topExpenseCategory[0].toLowerCase(),
  topExpenseCategory[0]
)}
                  </strong>{" "}
                  {t("withSpendingOf")}
                  <strong>
                    {" "}
                    {formatCurrency(
  Math.round(topExpenseCategory[1]),
  profile.currency,
  i18n.language
)}
                  </strong>
                  .
                </p>
              )}

              {foodExpenses >
                300 && (
                <p>
                  🍔 {t("reduceFoodExpenses")}
                  <strong>
                    {" "}
                    {formatCurrency(
  Math.round(foodExpenses*0.1),
  profile.currency,
  i18n.language
)}
                  </strong>{" "}
                  {t("monthly")}
                </p>
              )}

              {subscriptionsExpenses >
                30 && (
                <p>
                  📺{t("reviewSubscriptions")}
                  <strong>
                    {" "}
                    {formatCurrency(
  Math.round(subscriptionsExpenses),
  profile.currency,
  i18n.language
)}
                  </strong>
                  .
                </p>
              )}

              {incomeIncreaseNeeded >
                0 && (
                <p>
                  💼 {t("increaseIncome")}
                  <strong>
                    {" "}
                    {
                      incomeIncreaseNeeded
                    }
                    %
                  </strong>{" "}
                  {t("achieveGoalOnSchedule")}
                </p>
              )}

              {expectedYears >
                selectedGoal.deadline && (
                <p className="warning-text">
                  ⏳ {t("missTarget")}
                  <strong>
                    {" "}
                    {Math.round(
                      expectedYears -
                        selectedGoal.deadline
                    )}{" "}
                    {t("years")}
                  </strong>
                  .
                </p>
              )}
            </div>

<div className="action-plan-card">

 <h2>{t("actionPlan")}</h2>

  <ul>

    {incomeGap > 0 && (
      <li>
        {t("saveAdditional")}
        {" "}
        {formatCurrency(
  incomeGap,
  profile.currency,
  i18n.language
)}
        {" "}
        {t("everyMonth")}
      </li>
    )}

    {topExpenseCategory && (
      <li>
        {t("reduceSpending")}
        {" "}
      <strong>
  {t(
    topExpenseCategory[0].toLowerCase(),
    topExpenseCategory[0]
  )}
</strong>
        {" "}
        {t("category")}
      </li>
    )}

    {subscriptionsExpenses > 0 && (
      <li>
        {t("reviewSubscriptionsCancel")}
      </li>
    )}

    {incomeIncreaseNeeded > 0 && (
      <li>
        {t("increaseIncome")}
        {" "}
        {incomeIncreaseNeeded}%.
      </li>
    )}

    <li>
      {t("trackExpensesWeekly")}
    </li>

    <li>
      {t("estimatedGoalAchievement")}
      {" "}
      <strong>
        {estimatedGoalDate}
      </strong>
    </li>

  </ul>

</div>

            <div className="scenario-buttons">

  <button
    onClick={() => {
      setExtraSavings(300);
      setIncomeIncrease(0);
      setExpenseReduction(0);
    }}
  >
    {t("save300More")}
  </button>

  <button
    onClick={() => {
      setExtraSavings(0);
      setIncomeIncrease(20);
      setExpenseReduction(0);
    }}
  >
    {t("increaseSalary")}
  </button>

  <button
    onClick={() => {
      setExtraSavings(0);
      setIncomeIncrease(0);
      setExpenseReduction(200);
    }}
  >
    {t("cutExpenses")}
  </button>

  <button
    onClick={() => {
      setExtraSavings(500);
      setIncomeIncrease(15);
      setExpenseReduction(100);
    }}
  >
    {t("aggressivePlan")}
  </button>

</div>

            <div className="simulator-card">
              <h2>
                {t("whatIfSimulator")}
              </h2>

              <input
                type="number"
                placeholder= {`${t("extraSavings")} (${profile.currency})`}
                value={
                  extraSavings
                }
                onChange={(e) =>
                  setExtraSavings(
                    e.target.value
                  )
                }
              />

              <input
                type="number"
                placeholder={t("incomeIncrease")}
                value={incomeIncrease}

onChange={(e) =>
  setIncomeIncrease(
    e.target.value
  )
}
              />

              <input
                type="number"
                placeholder={`${t("expenseReduction")} (${profile.currency})`}
                value={
                  expenseReduction
                }
                onChange={(e) =>
                  setExpenseReduction(
                    e.target.value
                  )
                }
              />

              <div className="simulation-results">
                <h3>
                  {t("simulationResult")}
                </h3>

                <p>
                  {t("newMonthlySavings")}
                  <strong>
                    {" "}
                    {formatCurrency(
  Math.round(simulatedSavings),
  profile.currency,
  i18n.language
)}
                  </strong>
                </p>

                <p>
                  {t("newCompletion")}
                  <strong>
                    {" "}
                    {simulatedSavings >
                    0
                      ? `${Math.round(simulatedYears)} ${t("years")}`
                      : t("never")}
                  </strong>
                </p>

                <p>
  {t("newSuccessProbability")}
  <strong
    className={
      simulatedProbability >= 90
        ? "status-good"
        : simulatedProbability >= 70
        ? "status-medium"
        : "status-danger"
    }
  >
    {" "}
    {simulatedProbability}%
  </strong>
</p>
              </div>
            
            {selectedGoal && (
  <div className="projection-card">
    <h2>{t("savingsProjection")}</h2>

   <ResponsiveContainer
  width="100%"
  height={400}
>
  <LineChart
    data={projectionData}
  >
    <CartesianGrid
      stroke="#39435d"
    />

    <XAxis
      dataKey="year"
      stroke="#ccc"
    />

    <YAxis
      stroke="#ccc"
      tickFormatter={(value)=>
formatCurrency(
value,
profile.currency,
i18n.language
)
}
    />

    <Tooltip
      contentStyle={{
        background: "#101827",
        border:
          "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        color: "#fff",
      }}
      formatter={(value)=>
formatCurrency(
Number(value),
profile.currency,
i18n.language
)
}
    />

    <ReferenceLine
      y={selectedGoal.amount}
      stroke="#ffd166"
      strokeDasharray="6 6"
      label={t("goal")}
    />

    <Line
      type="monotone"
      dataKey="current"
      stroke="#ff6b6b"
      strokeWidth={4}
      name={t("currentPath")}
    />

    <Line
      type="monotone"
      dataKey="improved"
      stroke="#5b6cff"
      strokeWidth={4}
      name={t("improvedPath")}
    />
  </LineChart>
</ResponsiveContainer>

<div className="goal-date-card">
  <h3>{t("estimatedGoalAchievement")}</h3>

  <p>
    {new Date(
      new Date().getFullYear() +
      simulatedYears,
      0
    ).toLocaleDateString(
i18n.language,
      {
        month: "long",
        year: "numeric",
      }
    )}
  </p>
</div>

  </div>
)}
            
            </div>
          </>
        )}
      </div>

<div className="receipt-section">

  <div className="receipt-section-header">
    <div className="receipt-section-heading">
      <h2>{t("receiptScanner")}</h2>

      <p>
        {t("receiptScannerDescription")}
      </p>
    </div>
  </div>

 <div className="receipt-scanner-box">

  <div className="receipt-scanner-token">

    <Coins
      size={15}
      strokeWidth={2.2}
    />

    <span>1</span>

  </div>

  <AITransactionImporter />

</div>

</div>


    <div className="ai-chat-card">

  {/* =====================================================
      AI COACH HEADER
      ===================================================== */}

  <div className="ai-chat-header">

    <div className="ai-chat-brand">

      <div className="ai-chat-brand-icon">

        <Bot
          size={21}
          strokeWidth={2.2}
        />

      </div>

      <div className="ai-chat-brand-text">

        <h2>
          {t("aiFinancialCoach")}
        </h2>

        <span className="ai-chat-subtitle">
          {t("advisorWelcomeHint")}
        </span>

      </div>

    </div>

    <div className="ai-token-cost">

      <Coins
        size={16}
        strokeWidth={2.2}
      />

      <span>
        {isPremium
          ? "∞"
          : "1"}
      </span>

    </div>

  </div>


  {/* =====================================================
      QUICK PROMPTS
      ===================================================== */}

  <div className="quick-prompts">

    {quickPrompts.map(
      (prompt) => (

        <button
          key={prompt}
          type="button"
          className="prompt-btn"
          disabled={thinking}
          onClick={() =>
            sendMessage(prompt)
          }
        >
          {prompt}
        </button>

      )
    )}

  </div>


  {/* =====================================================
      CHAT AREA
      ===================================================== */}

  <div className="chat-layout">


    {/* ===================================================
        CHAT HISTORY
        =================================================== */}

    <aside className="chat-sidebar">

      <button
        type="button"
        className="new-chat-sidebar-btn"
        disabled={thinking}
        onClick={
          createNewChat
        }
      >

        <Plus
          size={20}
          strokeWidth={2.5}
        />

        <span>
          {t("newChat")}
        </span>

      </button>


      <div className="conversation-list">

        {conversations.map(
          (conversation) => (

            <div
              key={
                conversation.id
              }
              className={`conversation-item ${
                activeConversation ===
                conversation.id
                  ? "active"
                  : ""
              }`}
            >

              <div
                className="conversation-title"
                onClick={() => {

                  if (
                    thinking
                  ) {
                    return;
                  }

                  setActiveConversation(
                    conversation.id
                  );

                  setInput("");

                  setTimeout(() => {
                    chatInputRef.current?.focus();
                  }, 50);

                }}
              >

                <div className="conversation-icon">

                  <MessageSquare
                    size={16}
                    strokeWidth={2}
                  />

                </div>


                <div className="conversation-info">

                  <div className="conversation-name">

                    {conversation.title}

                  </div>

                  <div className="conversation-date">

                    {formatChatDate(
                      conversation.createdAt
                    )}

                  </div>

                </div>

              </div>


              <button
                type="button"
                className="delete-chat-btn"
                disabled={thinking}
                aria-label={t(
                  "delete"
                )}
                onClick={(e) => {

                  e.stopPropagation();

                  if (
                    thinking
                  ) {
                    return;
                  }

                  removeConversation(
                    conversation.id
                  );

                }}
              >

                <Trash2
                  size={15}
                  strokeWidth={2}
                />

              </button>

            </div>

          )
        )}

      </div>

    </aside>


    {/* ===================================================
        MAIN CHAT
        =================================================== */}

    <div className="chat-main">


      {/* =================================================
          CHAT MESSAGES
          ================================================= */}

      <div className="chat-window">

        {messages.length === 0 && (

          <div className="chat-empty-state">

            <div className="chat-empty-icon">

              <Bot
                size={28}
                strokeWidth={2}
              />

            </div>

            <h3>
              {t("advisorWelcome")}
            </h3>

            <p>
              {t(
                "advisorWelcomeHint"
              )}
            </p>

          </div>

        )}


        {messages.map(
          (message) => (

            <div
              key={
                message.id
              }
              className={`chat-row ${
                message.sender
              }`}
            >

              {/* AVATAR */}

              <div
                className={`chat-avatar ${
                  message.sender
                }`}
              >

                {message.sender ===
                "ai" ? (

                  <Bot
                    size={18}
                    strokeWidth={2}
                  />

                ) : (

                  <User
                    size={18}
                    strokeWidth={2}
                  />

                )}

              </div>


              {/* MESSAGE */}

              <div
                className={`chat-bubble ${
                  message.sender
                }`}
              >

                {message.sender ===
                "ai" ? (

                  <ReactMarkdown
                    remarkPlugins={[
                      remarkGfm,
                    ]}
                  >

                    {message.isWelcome
                      ? `${t(
                          "advisorWelcome"
                        )}

${t(
  "advisorWelcomeHint"
)}`
                      : message.text}

                  </ReactMarkdown>

                ) : (

                  message.text

                )}

              </div>

            </div>

          )
        )}


        {/* =================================================
            THINKING
            ================================================= */}

        {thinking && (

          <div className="chat-row ai">

            <div className="chat-avatar ai">

              <Bot
                size={18}
                strokeWidth={2}
              />

            </div>


            <div className="chat-bubble ai typing-bubble">

              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>

            </div>

          </div>

        )}


        <div
          ref={chatEndRef}
        />

      </div>


      {/* =================================================
          INPUT
          ================================================= */}

      <div className="chat-input-wrapper">

        <div className="chat-input-container">

          <input
            ref={chatInputRef}
            type="text"
            placeholder={t(
              "askAnything"
            )}
            value={input}
            disabled={thinking}
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (
                e.key ===
                "Enter"
              ) {

                e.preventDefault();

                if (
                  !thinking
                ) {
                  sendMessage();
                }

              }

            }}
          />


          <button
            type="button"
            className="coach-send-btn"
            disabled={
              thinking ||
              !input.trim()
            }
            onClick={
              sendMessage
            }
            aria-label={t(
              "send"
            )}
          >

            <SendHorizontal
              size={21}
              strokeWidth={2.2}
            />

          </button>

        </div>

      </div>

    </div>

  </div>

</div>


<BottomNav />

    </div>
  );
}

export default Advisor;
