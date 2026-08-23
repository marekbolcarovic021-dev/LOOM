import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const {
      message,
      language = "English",
      profile = {},
      transactions = [],
      accounts = [],
      goals = [],
    } = req.body || {};

    const prompt = `
You are an expert personal financial advisor.

Always answer in this language:
${language}

==========================
FINANCIAL PROFILE
==========================

${JSON.stringify(profile, null, 2)}

==========================
ACCOUNTS
==========================

${JSON.stringify(accounts, null, 2)}

==========================
GOALS
==========================

${JSON.stringify(goals, null, 2)}

==========================
RECENT TRANSACTIONS
==========================

${JSON.stringify(transactions.slice(-100), null, 2)}

==========================
USER QUESTION
==========================

${message}

Instructions:

- Analyze the user's REAL financial data.
- Use the transaction history to identify spending patterns.
- Mention the biggest spending categories.
- Suggest realistic savings opportunities.
- Consider account balances.
- Consider financial goals.
- Give practical, personalized advice.
- If there isn't enough information for a conclusion, clearly say so.
- Keep the answer under 250 words.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an experienced personal finance advisor. Base your answers on the financial data provided by the user.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return res.status(200).json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI CHAT ERROR:", error);

    return res.status(500).json({
      error: error.message || "AI request failed.",
    });
  }
}