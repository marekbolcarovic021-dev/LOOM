import express from "express";
import cors from "cors";

import OpenAI from "openai";
import receiptRoutes from "./routes/receipt.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://loom-px361pqg-bmx7.vercel.app",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());

app.use("/receipt", receiptRoutes);

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
    try {
        const {
            message,
            language,
            profile,
            transactions = [],
            accounts = [],
            goals = [],
        } = req.body;

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

        res.json({
            reply: response.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message,
        });
    }
});

export default app;