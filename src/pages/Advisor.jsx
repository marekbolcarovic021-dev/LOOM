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
import AdSenseAnchor from "../components/AdSenseAnchor";
import AdSenseBanner from "../components/AdSenseBanner";

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
  // FINANCIAL DATA
  // ==========================

  const monthlyIncome = transactions
    .filter(
      (t) => t.type === "Income"
    )
    .reduce(
      (sum, t) => sum + t.amount,
      0
    );

  const monthlyExpenses =
    transactions
      .filter(
        (t) => t.type === "Expense"
      )
      .reduce(
        (sum, t) => sum + t.amount,
        0
      );

  const monthlySavings =
    monthlyIncome -
    monthlyExpenses;

  // ==========================
  // CATEGORY ANALYSIS
  // ==========================

  const categoryExpenses = {};

  transactions
    .filter(
      (t) => t.type === "Expense"
    )
    .forEach((t) => {
      categoryExpenses[t.category] =
        (categoryExpenses[
          t.category
        ] || 0) + t.amount;
    });

  const topExpenseCategory =
    Object.entries(categoryExpenses)
      .sort(
        (a, b) => b[1] - a[1]
      )[0];

  const foodExpenses =
    categoryExpenses["Food"] || 0;

  const subscriptionsExpenses =
    transactions
      .filter(
        (t) =>
          t.type === "Expense" &&
          [
            "Netflix",
            "Spotify",
            "Subscriptions",
          ].includes(t.category)
      )
      .reduce(
        (sum, t) => sum + t.amount,
        0
      );

  const expenseRatio =
    monthlyIncome > 0
      ? Math.round(
          (monthlyExpenses /
            monthlyIncome) *
            100
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
      Number(selectedGoal.amount);

    const currentAmount =
      Number(
        selectedGoal.currentSavings
      );

    const remaining =
      targetAmount - currentAmount;

    const yearsRemaining =
      Number(selectedGoal.deadline);

    const monthsRemaining =
      Math.max(
        yearsRemaining * 12,
        1
      );

    requiredMonthlySavings =
      remaining /
      monthsRemaining;

    probability = Math.min(
      100,
      Math.round(
        (monthlySavings /
          requiredMonthlySavings) *
          100
      )
    );

    expectedYears =
      remaining /
      Math.max(
        monthlySavings * 12,
        1
      );

    daysSaved =
      probability >= 100
        ? Math.max(
            0,
            Math.round(
              (yearsRemaining -
                expectedYears) *
                365
            )
          )
        : 0;

    incomeGap = Math.max(
      0,
      Math.round(
        requiredMonthlySavings -
          monthlySavings
      )
    );

    incomeIncreaseNeeded =
      monthlyIncome > 0
        ? Math.round(
            (incomeGap /
              monthlyIncome) *
              100
          )
        : 0;
  }

const financialProfile = {
  monthlyIncome: Math.round(
    monthlyIncome
  ),

  monthlyExpenses: Math.round(
    monthlyExpenses
  ),

  monthlySavings: Math.round(
    monthlySavings
  ),

  expenseRatio,

  netWorth: accounts.reduce(
    (sum, account) =>
      sum + account.balance,
    0
  ),

  totalAccounts: accounts.length,

  totalGoals: goals.length,

  biggestExpenseCategory:
    topExpenseCategory
      ? topExpenseCategory[0]
      : "None",

  biggestExpenseAmount:
    topExpenseCategory
      ? Math.round(
          topExpenseCategory[1]
        )
      : 0,

  selectedGoal: selectedGoal
    ? {
        name: selectedGoal.name,
        targetAmount:
          selectedGoal.amount,
        currentSavings:
          selectedGoal.currentSavings,
        deadline:
          selectedGoal.deadline,

        successProbability:
          probability,

        requiredMonthlySavings:
          Math.round(
            requiredMonthlySavings
          ),

        expectedCompletionYears:
          Math.round(
            expectedYears
          ),
      }
    : null,
};

  // ==========================
  // WHAT IF SIMULATOR
  // ==========================

  const simulatedSavings =
  monthlySavings +
  Number(extraSavings || 0) +
  Number(expenseReduction || 0) +
  monthlyIncome *
    (Number(
      incomeIncrease || 0
    ) / 100);

  const simulatedYears =
    selectedGoal
      ? (selectedGoal.amount -
          selectedGoal.currentSavings) /
        Math.max(
          simulatedSavings * 12,
          1
        )
      : 0;

  const simulatedProbability =
    requiredMonthlySavings > 0
      ? Math.min(
          100,
          Math.round(
            (simulatedSavings /
              requiredMonthlySavings) *
              100
          )
        )
      : 0;

const projectionData = [];

if (selectedGoal) {
  const currentBalance =
    Number(selectedGoal.currentSavings);

  const improvedSavings =
    monthlySavings +
    Number(extraSavings || 0) +
    Number(expenseReduction || 0) +
    monthlyIncome *
      (Number(incomeIncrease || 0) / 100);

  let currentValue = currentBalance;
  let improvedValue = currentBalance;

  for (let year = 0; year <= 10; year++) {
    projectionData.push({
      year:
        new Date().getFullYear() + year,

      current:
        Math.round(currentValue),

      improved:
        Math.round(improvedValue),
    });

    currentValue += monthlySavings * 12;

    improvedValue += improvedSavings * 12;
  }
}

const estimatedGoalDate =
  simulatedSavings > 0
    ? new Date(
        new Date().getFullYear() +
          simulatedYears,
        0
      ).toLocaleDateString(
        i18n.language,
        {
          month: "long",
          year: "numeric",
        }
      )
    : t("unknown");

    //AI Chat

    useEffect(() => {
  if (messages.length === 0) {
    updateMessages([
  {
    id: 1,
    sender: "ai",
    isWelcome: true,
  },
]);
  }
}, []);

const [input, setInput] = useState("");

function updateMessages(updater) {
  setConversations((prev) =>
    prev.map((conversation) => {
      if (conversation.id !== activeConversation)
        return conversation;

      const newMessages =
        typeof updater === "function"
          ? updater(conversation.messages)
          : updater;

      return {
        ...conversation,
        messages: newMessages,
      };
    })
  );
}

function createNewChat() {
  const newConversation = {
  id: Date.now(),
  title: t("newChat"),
  createdAt: Date.now(),
  messages: [
  {
    id: 1,
    sender: "ai",
    isWelcome: true,
  },
],
  };

  setConversations((prev) => [
    newConversation,
    ...prev,
  ]);

  setActiveConversation(newConversation.id);
}

const defaultConversation = {
  id: Date.now(),
  title: t("newChat"),
  createdAt: Date.now(),
messages: [
  {
    id: 1,
    sender: "ai",
    isWelcome: true,
  },
],
};
const initialChats = loadChats();

const [conversations, setConversations] = useState(
  initialChats.length
    ? initialChats
    : [defaultConversation]
);

const [activeConversation, setActiveConversation] =
  useState(
    initialChats.length
      ? initialChats[0].id
      : defaultConversation.id
  );

const messages =
  conversations.find(
    (c) => c.id === activeConversation
  )?.messages || [];

const quickPrompts = [
  t("promptSaveMoney"),
  t("promptAnalyzeSpending"),
  t("promptAchieveGoals"),
  t("promptBiggestExpense"),
  t("promptFinancialSummary"),
];

const currentConversation =
    conversations.find(
        c => c.id === activeConversation
    );

async function sendMessage(customMessage = null) {

  const messageText = (
    customMessage || input
  ).trim();

  if (!messageText) return;

  setThinking(true);

  try {

    /*
     * ==========================================
     * 1. CHECK LOOM TOKEN
     * ==========================================
     */

    const tokenResult =
      await checkToken();

    if (!tokenResult.allowed) {

      updateMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "ai",
          text: t("noTokensAvailable"),
        },
      ]);

      return;
    }


    /*
     * ==========================================
     * 2. ADD USER MESSAGE
     * ==========================================
     */

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: messageText,
    };

    updateMessages((prev) => [
      ...prev,
      userMessage,
    ]);


    /*
     * ==========================================
     * UPDATE CONVERSATION TITLE
     * ==========================================
     */

    if (
      currentConversation?.title ===
      t("newChat")
    ) {

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === activeConversation
            ? {
                ...conversation,

                title:
                  userMessage.text.length > 32
                    ? userMessage.text.substring(0, 32) + "..."
                    : userMessage.text,
              }
            : conversation
        )
      );

    }


    setInput("");


    /*
     * ==========================================
     * 3. SEND QUESTION TO AI SERVER
     * ==========================================
     */

    const response =
      await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            message:
              messageText,

            language:
              i18n.language,

            profile:
              financialProfile,

            transactions,

            accounts,

            goals,

          }),
        }
      );


    /*
     * ==========================================
     * AI SERVER ERROR
     * ==========================================
     */

    if (!response.ok) {

      throw new Error(
        `AI server returned ${response.status}`
      );

    }


    /*
     * ==========================================
     * 4. READ AI RESPONSE
     * ==========================================
     */

    const data =
      await response.json();


    if (!data.reply) {

      throw new Error(
        "AI returned no response."
      );

    }


    /*
     * ==========================================
     * 5. CONSUME TOKEN
     * ==========================================
     *
     * IMPORTANT:
     *
     * This happens ONLY after the AI
     * successfully returned an answer.
     *
     * Premium users are handled by
     * the Firebase function and do NOT
     * lose a token.
     */

    const consumed =
      await consumeToken();


    if (!consumed.success) {

      throw new Error(
        "Token could not be consumed."
      );

    }


    /*
     * ==========================================
     * 6. SHOW AI RESPONSE
     * ==========================================
     */

    updateMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,

        sender: "ai",

        text:
          data.reply,
      },
    ]);

  } catch (error) {

    console.error(
      "AI COACH ERROR:",
      error
    );

    updateMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,

        sender: "ai",

        text:
          t("unableToContactAI"),
      },
    ]);

  } finally {

    setThinking(false);

  }

}

const chatEndRef = useRef(null);
const [thinking, setThinking] =
useState(false);

useEffect(() => {
  chatEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

useEffect(() => {
    saveChats(conversations);
}, [conversations]);

const removeConversation = (id) => {

    const chats = deleteChat(id);

    if (chats.length === 0) {

        createNewChat();
        return;

    }

    setConversations(chats);

    if (activeConversation === id)
        setActiveConversation(chats[0].id);

};

function formatChatDate(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();

  const isToday =
    date.toDateString() === today.toDateString();

  if (isToday) return t("today");

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return t("yesterday");
  }

  return date.toLocaleDateString(i18n.language, {
    day: "numeric",
    month: "short",
  });
}

 return (
  <div className="page-container">

    <AdSenseAnchor enabled={!isPremium} />

    {!isPremium && (
    <>
        <div className="advisor-desktop-ad advisor-desktop-ad-left">
            <AdSenseBanner
                slot="1872346216"
            />
        </div>

        <div className="advisor-desktop-ad advisor-desktop-ad-right">
            <AdSenseBanner
                slot="2554872490"
            />
        </div>
    </>
)}

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
    <AITransactionImporter />

    <div className="ai-token-cost">
      <Coins size={15} strokeWidth={2.2} />
      <span>1</span>
    </div>
  </div>

</div>


     <div className="ai-chat-card">

  <div className="ai-chat-header">

  <div>
    <h2>{t("aiFinancialCoach")}</h2>

    <span className="ai-chat-subtitle">
      {t("advisorWelcomeHint")}
    </span>
  </div>

  <div className="ai-token-cost">
    <Coins size={15} strokeWidth={2.2} />
    <span>1</span>
  </div>

</div>

  <div className="quick-prompts">
    {quickPrompts.map((prompt) => (
      <button
        key={prompt}
        className="prompt-btn"
        onClick={() => sendMessage(prompt)}
      >
        {prompt}
      </button>
    ))}
  </div>

  <div className="chat-layout">

  <div className="chat-sidebar">

    <button
    className="new-chat-sidebar-btn"
    onClick={createNewChat}
>
    <Plus size={20} strokeWidth={2.5} />
<span>{t("newChat")}</span>
</button>

    {conversations.map((conversation) => (
  <div
    key={conversation.id}
    className={`conversation-item ${
      activeConversation === conversation.id ? "active" : ""
    }`}
  >
    <div
  className="conversation-title"
  onClick={() => setActiveConversation(conversation.id)}
>
  <div className="conversation-icon">
    <MessageSquare size={16} />
  </div>

  <div className="conversation-info">
    <div className="conversation-name">
      {conversation.title}
    </div>

    <div className="conversation-date">
      {formatChatDate(conversation.createdAt)}
    </div>
  </div>
</div>

    <button
    className="delete-chat-btn"
    onClick={(e) => {
        e.stopPropagation();
        removeConversation(conversation.id);
    }}
>
    <Trash2 size={15}/>
</button>
  </div>
))}

  </div>

  <div className="chat-window">

    {messages.map((message) => (
      <div
        key={message.id}
        className={`chat-row ${message.sender}`}
      >
        <div className={`chat-avatar ${message.sender}`}>
          {message.sender === "ai" ? <Bot size={18} /> : <User size={18} />}
        </div>

       <div className={`chat-bubble ${message.sender}`}>

    {message.sender === "ai" ? (

        <ReactMarkdown
    remarkPlugins={[remarkGfm]}
>
    {message.isWelcome
        ? `${t("advisorWelcome")}

${t("advisorWelcomeHint")}`
        : message.text}
</ReactMarkdown>

    ) : (

        message.text

    )}

</div>
      </div>
    ))}

    {thinking && (
      <div className="chat-row ai">

        <div className="chat-avatar ai">
          <Bot size={18} />
        </div>

        <div className="chat-bubble ai typing-bubble">
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
        </div>

      </div>
    )}

    <div ref={chatEndRef}></div>

  </div>

</div>   {/* chat-window */}


<div className="chat-input-container">

    <input
      type="text"
      placeholder={t("askAnything")}
      value={input}
      onChange={(e) =>
        setInput(e.target.value)
      }
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      }}
    />

    <button
      className="coach-send-btn"
      onClick={sendMessage}
    >
      <SendHorizontal size={22} />
    </button>

  </div>

</div> 

      {!isPremium && (
    <div className="advisor-mobile-ad">
        <AdSenseBanner
            slot="8928709158"
        />
    </div>
)}

<BottomNav />

    </div>
  );
}

export default Advisor;
