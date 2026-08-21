import OpenAI from "openai";

const SYSTEM_PROMPT = `
You are a financial receipt parser.

Your job is to extract structured financial transactions from receipts.

Rules:

- Return ONLY valid JSON.
- Never include markdown.
- Never explain anything.
- Detect merchant.
- Detect receipt date.
- Detect receipt currency.
- Detect transaction type.
- Detect transaction category.
- Infer categories if necessary.
- Use ISO date (YYYY-MM-DD).
- Amount must be a number.

If the receipt contains only one total,
return one transaction.

If the receipt clearly contains multiple
purchases that should be separated,
return multiple transactions.

Confidence is between 0 and 1.

Return JSON in this format:

{
  "merchant":"",
  "date":"",
  "currency":"",
  "confidence":0.98,
  "transactions":[
    {
      "date":"",
      "category":"",
      "type":"Expense",
      "amount":0
    }
  ]
}
`;

export async function analyzeReceipt(imageBuffer) {

    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const base64 = imageBuffer.toString("base64");

    const response = await client.responses.create({

        model: "gpt-4.1-mini",

        input: [
            {
                role: "system",
                content: [
                    {
                        type: "input_text",
                        text: SYSTEM_PROMPT,
                    },
                ],
            },
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: "Extract all financial transactions from this receipt.",
                    },
                    {
                        type: "input_image",
                        image_url: `data:image/jpeg;base64,${base64}`,
                    },
                ],
            },
        ],

    });

    let text = response.output_text || "";

    if (!text && response.output) {
        text = response.output
            .map((item) =>
                (item.content || [])
                    .map((c) => c.text || "")
                    .join("")
            )
            .join("");
    }

    let json;

    try {

        json = JSON.parse(text);

    } catch (err) {

        console.error("AI returned:");
        console.error(text);

        throw new Error("AI returned invalid JSON.");

    }

    json.transactions = (json.transactions || []).map((t) => ({

        date:
            t.date ||
            json.date ||
            new Date().toISOString().slice(0, 10),

        category: t.category || "Other",

        type: t.type || "Expense",

        amount: Number(t.amount) || 0,

    }));

    json.currency = json.currency || "EUR";

    json.confidence = json.confidence || 0.9;

    return json;
}