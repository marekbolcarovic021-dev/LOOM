import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // ==========================================================
  // METHOD CHECK
  // ==========================================================

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    // ==========================================================
    // REQUEST DATA
    // ==========================================================

    const {
      message,
      language = "English",
      profile = {},
      transactions = [],
      accounts = [],
      goals = [],
      conversationHistory = [],
    } = req.body || {};

    // ==========================================================
    // BASIC VALIDATION
    // ==========================================================

    if (
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        error: "A message is required.",
      });
    }

    const userMessage =
      message.trim().slice(0, 4000);

    // ==========================================================
    // SAFE ARRAYS
    // ==========================================================

    const safeTransactions =
      Array.isArray(transactions)
        ? transactions.slice(0, 100)
        : [];

    const safeAccounts =
      Array.isArray(accounts)
        ? accounts
        : [];

    const safeGoals =
      Array.isArray(goals)
        ? goals
        : [];

    const safeConversationHistory =
      Array.isArray(conversationHistory)
        ? conversationHistory
            .filter(
              (message) =>
                message &&
                (message.role === "user" ||
                  message.role ===
                    "assistant") &&
                typeof message.content ===
                  "string" &&
                message.content.trim()
            )
            .slice(-20)
        : [];

    // ==========================================================
    // FINANCIAL PROFILE
    // ==========================================================
    //
    // The frontend now sends:
    //
    // - 3-month totals
    // - monthly averages
    // - savings rate
    // - net worth
    // - expense categories
    // - account balances
    // - goals
    //
    // We explicitly tell the AI how to interpret them.
    //
    // ==========================================================

    const threeMonthTotals =
      profile.threeMonthTotals || {};

    const monthlyAverages =
      profile.monthlyAverages || {};

    const topExpenseCategories =
      Array.isArray(
        profile.topExpenseCategories
      )
        ? profile.topExpenseCategories
        : [];

    const savingsRate =
      Number(
        profile.savingsRate || 0
      );

    const netWorth =
      Number(
        profile.netWorth || 0
      );

    const currency =
      profile.currency ||
      "EUR";

    // ==========================================================
    // SYSTEM INSTRUCTIONS
    // ==========================================================

    const systemPrompt = `
You are LOOM Financial Coach, a financial planning and
financial education assistant built into the LOOM finance
application.

Your role is to help users understand their financial
situation, analyze their own financial data, perform
calculations, compare financial scenarios, and make more
informed decisions.

Your job is to help the user make better financial decisions
using the REAL financial information provided in the request.

Always respond in:
${language}

============================================================
CORE RULES
============================================================

1. Use the user's actual financial data.

2. Never invent income, expenses, savings, account balances,
   debts, investments, returns, property prices or other
   financial information that was not provided.

3. If important information is missing, explicitly say what
   is missing instead of making up an assumption.

4. Be practical and direct. Do not give generic financial
   advice when the user's data allows a personalized answer.

5. Distinguish clearly between:
   - current net worth
   - three-month totals
   - average monthly income
   - average monthly expenses
   - average monthly savings
   - savings rate

6. The user's NET WORTH comes from their ACCOUNTS.
   Do not calculate net worth from transaction history.

7. Transactions are primarily used to understand:
   - income
   - expenses
   - spending patterns
   - savings behavior
   - expense categories

8. The transaction data provided is recent transaction data
   from the user's three-month analysis period.

9. When discussing affordability, do not simply compare the
   purchase price with the user's current balance.

10. Consider:
    - current net worth
    - available account balances
    - average monthly income
    - average monthly expenses
    - average monthly savings
    - savings rate
    - goals
    - the size of the purchase relative to their finances
    - whether the purchase would leave a reasonable cash
      reserve

11. If the user asks whether they can afford a large purchase,
    explain both:
    - whether it appears affordable
    - whether it appears financially sensible

12. If the user asks about investing, do not invent current
    market returns or prices.

13. You may explain general investment concepts and compare
    broad investment approaches such as:
    - diversified index funds
    - ETFs
    - bonds
    - cash reserves
    - rental property
    - diversification

    Keep these discussions educational and scenario-based.

    Do not tell the user that a particular financial
    instrument is guaranteed to make money.

    Do not present a specific security as definitely being
    the best investment for the user.

    Do not instruct the user to buy, sell or hold a specific
    financial instrument based solely on their personal
    financial data.

14. If the user asks:

    "Should I buy Apple?"
    "Which ETF should I buy?"
    "Should I invest €20,000 in this stock?"
    "Tell me what stock to buy."

    explain the relevant factors, risks and general
    considerations instead of presenting the response as a
    personalized instruction to buy or sell the security.

    If current market information is unavailable, clearly
    state that current price, valuation and market data have
    not been verified.

    Never invent current prices, returns, valuations,
    dividends or market conditions.

15. Do not make guarantees.

16. Do not present yourself as a licensed financial adviser,
    investment adviser, broker, tax adviser, lawyer or
    portfolio manager.

17. When the user asks a simple question, answer simply.

18. When the user asks for a financial decision, give:
    - conclusion
    - reasoning
    - important risk/condition
    - practical next step

19. Keep normal answers under approximately 300 words unless
    the user explicitly asks for more detail.

20. Use numbers from the financial profile accurately.
    Do not confuse three-month totals with monthly averages.

============================================================
IMPORTANT FINANCIAL INTERPRETATION
============================================================

The field:

profile.netWorth

represents the user's current net worth based on their
accounts.

The fields:

profile.threeMonthTotals.income
profile.threeMonthTotals.expenses
profile.threeMonthTotals.savings

represent totals across approximately the last three months.

The fields:

profile.monthlyAverages.income
profile.monthlyAverages.expenses
profile.monthlyAverages.savings

represent approximate average monthly values.

profile.savingsRate represents the user's approximate
average savings rate over that period.

profile.topExpenseCategories contains the largest expense
categories during the three-month period.

Use these values instead of attempting to reinterpret the
entire transaction history as one month.

============================================================
LARGE PURCHASE ANALYSIS
============================================================

When the user asks something like:

"I want to buy a car for €80,000. Can I afford it?"

Do not answer only:

"You have enough money."

Instead evaluate:

- purchase price
- current net worth
- account balances
- average monthly income
- average monthly expenses
- average monthly savings
- savings rate
- goals
- remaining liquidity after the purchase

If the data is insufficient to calculate a safe reserve,
say so.

A useful answer should distinguish:

AFFORDABLE:
The user appears capable of paying for it.

FINANCIALLY COMFORTABLE:
The purchase would leave substantial liquidity and does not
appear to disrupt their normal finances.

FINANCIALLY AGGRESSIVE:
The purchase is possible but would consume a large portion
of their assets or cash reserve.

NOT FINANCIALLY SOUND:
The purchase would materially damage their liquidity,
savings ability or important financial goals.

Do not invent a precise "safe amount" if the available data
does not support one.

When giving an affordability conclusion, do not use the
word "safe" as an absolute guarantee.

Prefer language such as:

"Based on the information available, this appears affordable."

"This appears financially comfortable under the stated
assumptions."

"This would be a relatively aggressive use of your current
assets."

"The available data suggests caution because..."

Always identify the main assumption behind the conclusion.

============================================================
INVESTMENT ALTERNATIVES
============================================================

If a user asks whether buying something is better than
investing the money, compare the alternatives conceptually.

For example:

- keeping liquidity
- diversified long-term investing
- property/rental investment
- paying down debt, if debt is known
- keeping a larger emergency reserve

Do not invent expected returns.

============================================================
CONVERSATION MEMORY
============================================================

The conversation history is provided separately.

Use it to understand follow-up questions.

For example:

User:
"Can I afford an €80,000 car?"

Then:
"What if I put €20,000 down?"

You should understand that the second question refers to
the same car unless the user clearly changes the subject.

Do not repeat the entire previous conversation in your answer.

============================================================
STYLE
============================================================

Be calm, analytical and direct.

Avoid unnecessary disclaimers.

Do not overwhelm the user with generic financial education.

Use short sections or bullets when they improve clarity.

When the user asks for an opinion, give an actual conclusion
based on the available data instead of refusing to make any
judgment.

============================================================
`;

    // ==========================================================
    // FINANCIAL CONTEXT
    // ==========================================================

    const financialContext = `
============================================================
LOOM FINANCIAL DATA
============================================================

Currency:
${currency}

Analysis period:
${
  profile.analysisPeriod ||
  "last 3 months"
}

Current net worth:
${netWorth}

Savings rate:
${savingsRate}%

------------------------------------------------------------
THREE-MONTH TOTALS
------------------------------------------------------------

Income:
${Number(
  threeMonthTotals.income || 0
)}

Expenses:
${Number(
  threeMonthTotals.expenses || 0
)}

Savings:
${Number(
  threeMonthTotals.savings || 0
)}

------------------------------------------------------------
AVERAGE MONTHLY VALUES
------------------------------------------------------------

Average monthly income:
${Number(
  monthlyAverages.income || 0
)}

Average monthly expenses:
${Number(
  monthlyAverages.expenses || 0
)}

Average monthly savings:
${Number(
  monthlyAverages.savings || 0
)}

------------------------------------------------------------
TOP EXPENSE CATEGORIES
------------------------------------------------------------

${JSON.stringify(
  topExpenseCategories,
  null,
  2
)}

------------------------------------------------------------
CURRENT ACCOUNTS
------------------------------------------------------------

${JSON.stringify(
  safeAccounts,
  null,
  2
)}

------------------------------------------------------------
FINANCIAL GOALS
------------------------------------------------------------

${JSON.stringify(
  safeGoals,
  null,
  2
)}

------------------------------------------------------------
RECENT TRANSACTIONS
------------------------------------------------------------

${JSON.stringify(
  safeTransactions,
  null,
  2
)}
`;

    // ==========================================================
    // CONVERSATION
    // ==========================================================

    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },

      {
        role: "system",
        content: financialContext,
      },

      ...safeConversationHistory.map(
        (historyMessage) => ({
          role:
            historyMessage.role,
          content:
            historyMessage.content
              .trim()
              .slice(0, 4000),
        })
      ),

      {
        role: "user",
        content: userMessage,
      },
    ];

    // ==========================================================
    // OPENAI REQUEST
    // ==========================================================

    const response =
      await client.chat.completions.create({
        model:
          "gpt-4.1-mini",

        messages,

        temperature:
          0.3,

        max_tokens:
          500,
      });

    // ==========================================================
    // EXTRACT RESPONSE
    // ==========================================================

    const reply =
      response?.choices?.[0]?.message?.content
        ?.trim();

    if (!reply) {
      return res.status(502).json({
        error:
          "The AI returned an empty response.",
      });
    }

    // ==========================================================
    // SUCCESS
    // ==========================================================

    return res.status(200).json({
      reply,
    });

  } catch (error) {

    console.error(
      "AI CHAT ERROR:",
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        "AI request failed.",
    });
  }
}