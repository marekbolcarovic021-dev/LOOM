import { useMemo, useState } from "react";
import "./MoneyCheck.css";
import AdsterraBanner from "../components/AdsterraBanner";

const initialAnswers = {
  income: "",
  expenses: "",
  savings: "",
  incomeType: "",
  debt: "",
  debtBalance: "",
  debtPayment: "",
  debtPressure: "",
  leftover: "",
  emergency: "",
  savingHabit: "",
  goal: "",
  confidence: "",
  situation: "",
  expenseAccuracy: "",
};

const questions = [
  {
    id: "income",
    title: "Your monthly income",
    description: "How much money do you receive each month after tax?",
    type: "number",
    placeholder: "e.g. 2,000",
    prefix: "€",
    required: true,
  },
  {
    id: "expenses",
    title: "Your monthly expenses",
    description:
      "How much do you spend each month in total, including bills, food, transport, shopping and other expenses?",
    type: "number",
    placeholder: "e.g. 1,500",
    prefix: "€",
    required: true,
  },
  {
    id: "savings",
    title: "Your current savings",
    description:
      "How much money do you have readily available in savings? Exclude money you cannot easily access.",
    type: "number",
    placeholder: "e.g. 5,000",
    prefix: "€",
    required: true,
  },
  {
    id: "incomeType",
    title: "How reliable is your income?",
    description:
      "Think about how predictable your income is from month to month.",
    type: "choice",
    required: true,
    options: [
      {
        label: "Very stable",
        description: "My income is predictable.",
        value: "stable",
      },
      {
        label: "Mostly stable",
        description: "It changes slightly from time to time.",
        value: "mostly",
      },
      {
        label: "Variable",
        description: "My income changes significantly.",
        value: "variable",
      },
      {
        label: "Uncertain",
        description: "I am not sure what I will earn next month.",
        value: "uncertain",
      },
    ],
  },
  {
    id: "debt",
    title: "Do you have any debt?",
    description:
      "Include loans, credit cards, overdrafts or other money you owe. A mortgage counts too.",
    type: "choice",
    required: true,
    options: [
      {
        label: "No debt",
        description: "I do not owe money.",
        value: "no",
      },
      {
        label: "Yes, manageable",
        description: "I can comfortably make my repayments.",
        value: "manageable",
      },
      {
        label: "Yes, it puts pressure on my budget",
        description: "Repayments make it harder to save or cover expenses.",
        value: "pressure",
      },
      {
        label: "Yes, I struggle to repay",
        description: "I sometimes miss payments or struggle with essentials.",
        value: "struggle",
      },
    ],
  },
  {
    id: "debtBalance",
    title: "How much debt do you have?",
    description:
      "Enter the approximate total outstanding balance across your loans and other debts.",
    type: "number",
    placeholder: "e.g. 10,000",
    prefix: "€",
    required: true,
    condition: (a) => a.debt && a.debt !== "no",
  },
  {
    id: "debtPayment",
    title: "Your monthly debt repayments",
    description:
      "How much do you pay towards all your debts each month, including any mortgage?",
    type: "number",
    placeholder: "e.g. 300",
    prefix: "€",
    required: true,
    condition: (a) => a.debt && a.debt !== "no",
  },
  {
    id: "debtPressure",
    title: "Are your debt payments up to date?",
    description:
      "This helps LOOM understand whether your debt needs immediate attention.",
    type: "choice",
    required: true,
    condition: (a) => a.debt && a.debt !== "no",
    options: [
      {
        label: "Yes, all payments are up to date",
        value: "current",
      },
      {
        label: "I have occasionally paid late",
        value: "late",
      },
      {
        label: "I have overdue payments",
        value: "overdue",
      },
    ],
  },
  {
    id: "leftover",
    title: "What happens at the end of the month?",
    description:
      "Think about a typical month after paying your expenses.",
    type: "choice",
    required: true,
    options: [
      {
        label: "I usually have money left",
        value: "surplus",
      },
      {
        label: "I usually break even",
        value: "break-even",
      },
      {
        label: "I sometimes spend more than I earn",
        value: "sometimes-negative",
      },
      {
        label: "I regularly spend more than I earn",
        value: "negative",
      },
    ],
  },
  {
    id: "emergency",
    title: "Could you handle an unexpected €500 expense?",
    description:
      "Imagine your car needs a repair or an essential appliance breaks.",
    type: "choice",
    required: true,
    options: [
      {
        label: "Yes, comfortably",
        value: "comfortable",
      },
      {
        label: "Yes, but it would use a lot of my savings",
        value: "difficult",
      },
      {
        label: "I would struggle to pay it",
        value: "struggle",
      },
      {
        label: "I would need to borrow money",
        value: "borrow",
      },
    ],
  },
  {
    id: "savingHabit",
    title: "How regularly do you save money?",
    description:
      "Think about what you actually do, rather than what you intend to do.",
    type: "choice",
    required: true,
    options: [
      {
        label: "Every month",
        value: "regular",
      },
      {
        label: "In most months",
        value: "often",
      },
      {
        label: "Occasionally",
        value: "sometimes",
      },
      {
        label: "I cannot currently save",
        value: "never",
      },
    ],
  },
  {
    id: "goal",
    title: "What is your main financial goal?",
    description: "Choose the goal that matters most to you right now.",
    type: "choice",
    required: true,
    options: [
      {
        label: "Build an emergency fund",
        value: "emergency-fund",
      },
      {
        label: "Pay off debt",
        value: "pay-debt",
      },
      {
        label: "Save for a home or major purchase",
        value: "purchase",
      },
      {
        label: "Start investing",
        value: "invest",
      },
      {
        label: "Prepare for retirement",
        value: "retirement",
      },
      {
        label: "Improve my monthly budget",
        value: "budget",
      },
    ],
  },
  {
    id: "confidence",
    title: "How confident are you managing your money?",
    description:
      "Consider how well you understand your finances and make financial decisions.",
    type: "choice",
    required: true,
    options: [
      {
        label: "Very confident",
        value: "very",
      },
      {
        label: "Fairly confident",
        value: "fairly",
      },
      {
        label: "Not very confident",
        value: "low",
      },
      {
        label: "I feel overwhelmed",
        value: "overwhelmed",
      },
    ],
  },
  {
    id: "situation",
    title: "How would you describe your financial situation?",
    description:
      "Choose the answer that best describes your life today.",
    type: "choice",
    required: true,
    options: [
      {
        label: "Comfortable",
        description: "I can cover my needs and plan ahead.",
        value: "comfortable",
      },
      {
        label: "Generally okay",
        description: "I manage, but I have some concerns.",
        value: "okay",
      },
      {
        label: "Financially stretched",
        description: "There is little room for unexpected costs.",
        value: "stretched",
      },
      {
        label: "Struggling with essentials",
        description: "Paying for basic needs is difficult.",
        value: "struggling",
      },
    ],
  },
  {
    id: "expenseAccuracy",
    title: "How well do you know your expenses?",
    description:
      "This helps LOOM judge how reliable your financial estimates are.",
    type: "choice",
    required: true,
    options: [
      {
        label: "Very accurately",
        value: "accurate",
      },
      {
        label: "I have a reasonable estimate",
        value: "estimate",
      },
      {
        label: "I am mostly guessing",
        value: "guess",
      },
    ],
  },
];

const currency = (value) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

const percentage = (value) =>
  `${Math.round(value)}%`;

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function getVisibleQuestions(answers) {
  return questions.filter(
    (question) =>
      !question.condition || question.condition(answers)
  );
}

function getFinancialResults(answers) {
  const income = Number(answers.income);
  const expenses = Number(answers.expenses);
  const savings = Number(answers.savings);

  const surplus = income - expenses;
  const savingsRate =
    income > 0 ? (surplus / income) * 100 : 0;

  const emergencyMonths =
    expenses > 0 ? savings / expenses : 0;

  const debtPayment = Number(answers.debtPayment || 0);
  const debtBalance = Number(answers.debtBalance || 0);

  const debtRatio =
    income > 0 ? (debtPayment / income) * 100 : 0;

  // Each category is scored independently.
  // The result is an educational indicator, not a credit rating.

  const cashFlowScore =
    surplus >= income * 0.2
      ? 20
      : surplus >= income * 0.1
        ? 16
        : surplus > 0
          ? 12
          : surplus === 0
            ? 7
            : surplus >= -income * 0.1
              ? 3
              : 0;

  const emergencyScore =
    emergencyMonths >= 6
      ? 20
      : emergencyMonths >= 3
        ? 16
        : emergencyMonths >= 1
          ? 11
          : emergencyMonths >= 0.5
            ? 6
            : 0;

  const debtScore =
    answers.debt === "no"
      ? 15
      : answers.debt === "manageable"
        ? debtRatio <= 15
          ? 14
          : debtRatio <= 30
            ? 10
            : 6
        : answers.debt === "pressure"
          ? 5
          : 0;

  const paymentScore =
    answers.debt === "no"
      ? 10
      : answers.debtPressure === "current"
        ? 10
        : answers.debtPressure === "late"
          ? 5
          : 0;

  const resilienceScore = {
    comfortable: 10,
    difficult: 7,
    struggle: 3,
    borrow: 0,
  }[answers.emergency] ?? 0;

  const savingScore = {
    regular: 10,
    often: 8,
    sometimes: 5,
    never: 0,
  }[answers.savingHabit] ?? 0;

  const stabilityScore = {
    stable: 5,
    mostly: 4,
    variable: 2,
    uncertain: 0,
  }[answers.incomeType] ?? 0;

  const situationScore = {
  comfortable: 10,
  okay: 7,
  stretched: 3,
  struggling: 0,
}[answers.situation] ?? 0;

const rawScore =
  cashFlowScore +
  emergencyScore +
  debtScore +
  paymentScore +
  resilienceScore +
  savingScore +
  stabilityScore +
  situationScore;

  // Score components total 100 points.
  // The optional confidence and goal answers inform recommendations,
  // not the financial health score.

  const score = clamp(rawScore);

  const debtRatioValid =
    answers.debt !== "no" &&
    income > 0 &&
    answers.debtPayment !== "";

  const missingAnswers = questions.filter((q) => {
    if (q.condition && !q.condition(answers)) {
      return false;
    }

    return answers[q.id] === "";
  });

  const hasNegativeCashFlow = surplus < 0;
  const overdueDebt = answers.debtPressure === "overdue";
  const strugglingWithEssentials =
    answers.situation === "struggling";

  const strengths = [];
  const concerns = [];
  const recommendations = [];

  if (surplus > 0) {
    strengths.push(
      `You have an estimated ${currency(surplus)} left each month after your stated expenses.`
    );
  } else if (surplus === 0) {
    concerns.push(
      "Your income and expenses are approximately equal, leaving little room for unexpected costs."
    );
  } else {
    concerns.push(
      `Your stated expenses exceed your income by ${currency(Math.abs(surplus))} per month.`
    );
  }

  if (emergencyMonths >= 3) {
    strengths.push(
      `Your accessible savings cover approximately ${emergencyMonths.toFixed(1)} months of your stated expenses.`
    );
  } else {
    concerns.push(
      `Your accessible savings cover approximately ${emergencyMonths.toFixed(1)} months of your stated expenses.`
    );
  }

  if (answers.debt === "no") {
    strengths.push("You reported having no outstanding debt.");
  } else if (overdueDebt) {
    concerns.push(
      "You reported overdue debt payments, which may need immediate attention."
    );
  } else if (answers.debt === "struggle") {
    concerns.push(
      "You reported difficulty keeping up with debt repayments."
    );
  }

  if (answers.savingHabit === "regular") {
    strengths.push("You report saving money every month.");
  }

  // Recommendations are prioritized around financial safety first.

  if (strugglingWithEssentials || hasNegativeCashFlow) {
    recommendations.push({
      title: "Stabilize your monthly budget",
      text:
        "Start with essential costs such as housing, utilities, food and transport. Review non-essential spending and look for realistic changes. If essential costs already exceed your income, consider contacting a local debt adviser or support service.",
    });
  }

  if (overdueDebt || answers.debt === "struggle") {
    recommendations.push({
      title: "Address overdue payments first",
      text:
        "Prioritize essential living costs and contact your lenders early to discuss affordable repayment arrangements. Avoid taking on new high-cost borrowing to cover existing repayments. Seek independent debt advice if you cannot meet essential costs.",
    });
  }

  if (emergencyMonths < 3 && surplus > 0) {
    recommendations.push({
      title: "Build an emergency fund",
      text:
        "Start with a small, accessible cash reserve, then work towards one month of essential expenses. Over time, consider building towards three to six months, especially if your income is variable.",
    });
  }

  if (answers.debt !== "no" && debtRatio > 30) {
    recommendations.push({
      title: "Review the cost of your debt",
      text:
        "Your reported monthly repayments are a substantial share of your income. Review interest rates, fees and repayment terms before considering any changes. Do not refinance without comparing the total cost and risks.",
    });
  }

  if (
    answers.savingHabit !== "regular" &&
    surplus > 0
  ) {
    recommendations.push({
      title: "Automate a manageable saving amount",
      text:
        "Choose an amount you can sustain after essential expenses and debt repayments. An automatic transfer after payday can help you save consistently without relying on willpower each month.",
    });
  }

  if (
    answers.expenseAccuracy === "guess" ||
    answers.expenseAccuracy === "estimate"
  ) {
    recommendations.push({
      title: "Track your spending for one month",
      text:
        "Review your bank transactions and record cash spending for a full month. Separating essential costs, flexible spending and irregular annual bills will make your budget and future decisions more reliable.",
    });
  }

  const goalRecommendations = {
    "emergency-fund": {
      title: "Make your emergency fund the priority",
      text:
        "Set a first savings target that feels achievable, then build it gradually. Keep emergency money accessible rather than relying on investments that may fall in value.",
    },
    "pay-debt": {
      title: "Create a debt repayment plan",
      text:
        "List your balances, interest rates and minimum payments. After covering essentials and minimum repayments, consider directing extra money towards the highest-interest debt first.",
    },
    purchase: {
      title: "Give your major purchase a clear target",
      text:
        "Estimate the full cost, choose a realistic target date and divide the amount still needed by the number of months available. Check that this saving plan leaves room for emergencies.",
    },
    invest: {
      title: "Prepare before investing",
      text:
        "First check that essential bills are covered, expensive debt is under control and you have a suitable emergency reserve. Then learn about diversified investments, fees and the risk of losses.",
    },
    retirement: {
      title: "Review your retirement plan",
      text:
        "Estimate your future needs, review any workplace or state pension arrangements available to you, and consider whether regular long-term contributions fit your budget and risk tolerance.",
    },
    budget: {
      title: "Build a practical monthly budget",
      text:
        "Start with take-home income and essential expenses. Include irregular bills, debt repayments and a realistic amount for flexible spending before deciding how much you can save.",
    },
  };

  const goalAdvice = goalRecommendations[answers.goal];

  if (goalAdvice) {
    recommendations.push(goalAdvice);
  }

  if (
    answers.confidence === "low" ||
    answers.confidence === "overwhelmed"
  ) {
    recommendations.push({
      title: "Keep your financial routine simple",
      text:
        "Start by checking your account balances and upcoming bills once a week. A simple overview of income, expenses, debts and savings is enough to begin making informed decisions.",
    });
  }

  // Keep the three most relevant recommendations.
  // Safety-related actions come before optional financial goals.

  const uniqueRecommendations = [];
  const seenTitles = new Set();

  for (const recommendation of recommendations) {
    if (!seenTitles.has(recommendation.title)) {
      uniqueRecommendations.push(recommendation);
      seenTitles.add(recommendation.title);
    }
  }

  while (uniqueRecommendations.length < 3) {
    const fallback = {
      title: "Review your finances monthly",
      text:
        "Check your income, expenses, savings and upcoming commitments once a month. Update your plan when your circumstances change.",
    };

    if (!seenTitles.has(fallback.title)) {
      uniqueRecommendations.push(fallback);
      seenTitles.add(fallback.title);
    } else {
      break;
    }
  }

  const scoreLabel =
    score >= 80
      ? "Strong"
      : score >= 65
        ? "Good foundation"
        : score >= 45
          ? "Needs attention"
          : "Needs improvement";

  return {
    income,
    expenses,
    savings,
    surplus,
    savingsRate,
    emergencyMonths,
    debtPayment,
    debtBalance,
    debtRatio,
    debtRatioValid,
    score,
    scoreLabel,
    strengths,
    concerns,
    recommendations: uniqueRecommendations.slice(0, 3),
    missingAnswers,
    hasNegativeCashFlow,
    overdueDebt,
    strugglingWithEssentials,
  };
}

function MoneyInput({
  question,
  value,
  onChange,
  error,
}) {
  return (
    <div className="mc-number-wrap">
      <label
        className="mc-number-label"
        htmlFor={`mc-${question.id}`}
      >
        {question.title}
      </label>

      <p className="mc-question-description">
        {question.description}
      </p>

      <div className="mc-input-shell">
        <span className="mc-input-prefix">
          {question.prefix}
        </span>

        <input
          id={`mc-${question.id}`}
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          placeholder={question.placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onWheel={(event) => event.currentTarget.blur()}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `mc-error-${question.id}` : undefined
          }
        />
      </div>

      {error && (
        <p
          className="mc-field-error"
          id={`mc-error-${question.id}`}
          role="alert"
        >
          {error}
        </p>
      )}

      <p className="mc-input-hint">
        Enter your best estimate in euros. Decimals are allowed.
      </p>
    </div>
  );
}

function ChoiceQuestion({
  question,
  value,
  onChange,
}) {
  return (
    
    <div className="mc-choice-wrap">
      <p className="mc-question-description">
        {question.description}
      </p>
<AdsterraBanner />
      <div className="mc-options">
        {question.options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`mc-option ${
              value === option.value ? "selected" : ""
            }`}
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
          >
            <span className="mc-option-content">
              <span className="mc-option-label">
                {option.label}
              </span>

              {option.description && (
                <span className="mc-option-description">
                  {option.description}
                </span>
              )}
            </span>

            <span
              className="mc-option-indicator"
              aria-hidden="true"
            >
              {value === option.value ? "✓" : ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultMetric({
  label,
  value,
  description,
}) {
  return (
    <div className="mc-metric">
      <span className="mc-metric-label">{label}</span>
      <strong className="mc-metric-value">{value}</strong>
      <span className="mc-metric-description">
        {description}
      </span>
    </div>
  );
}

function MoneyCheckResults({
  answers,
  onRestart,
}) {
  const results = useMemo(
    () => getFinancialResults(answers),
    [answers]
  );

  const hasIncompleteData =
    results.missingAnswers.length > 0;

  const [showDetails, setShowDetails] = useState(false);

  const [shareMessage, setShareMessage] = useState("");

  async function handleShare() {
  const shareData = {
    title: "LOOM Money Check",
    text: "Check your financial health and get personalized tips with LOOM Money Check.",
    url: `${window.location.origin}/tools/money-check`,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      setShareMessage("Ready to share.");
      return;
    }

    await navigator.clipboard.writeText(shareData.url);
    setShareMessage("Link copied to clipboard.");
  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }

    setShareMessage(
      "Sharing isn't available here. Copy the page address from your browser."
    );
  }
}

  return (
    <section className="mc-results">
      <div className="mc-results-heading">
        <span className="mc-eyebrow">
          YOUR FINANCIAL SNAPSHOT
        </span>

        <h1>Your money, made clearer.</h1>

        <p>
          Here is an overview of your financial position and
          the steps that may help you improve it.
        </p>
      </div>

      <div className="mc-score-card">
        <div className="mc-score-copy">
          <span className="mc-score-caption">
            YOUR FINANCIAL HEALTH SCORE
          </span>

          <div className="mc-score-number">
            {results.score}
            <span>/100</span>
          </div>

          <span className="mc-score-label">
            {results.scoreLabel}
          </span>

          <p>
            This educational score summarizes your reported
            cash flow, emergency savings, debt repayment
            position, financial resilience and saving habits.
            It is not a credit score or a guarantee of
            financial security.
          </p>
        </div>

        <div
          className="mc-score-ring"
          style={{
            "--score-angle": `${results.score * 3.6}deg`,
          }}
          role="img"
          aria-label={`Financial health score: ${results.score} out of 100`}
        >
          <div className="mc-score-ring-inner">
            <span>{results.score}</span>
            <small>out of 100</small>
          </div>
        </div>
      </div>

      {hasIncompleteData && (
        <div className="mc-notice">
          <strong>Some information is missing.</strong>
          <p>
            Your score is based on the answers you provided.
            Missing information may make the result less
            complete.
          </p>
        </div>
      )}

<section className="mc-personal-insight">
  <span className="mc-panel-kicker">
    YOUR PERSONAL FINANCIAL INSIGHT
  </span>

  <h2>
    {results.hasNegativeCashFlow
      ? "Your first priority is to balance your budget."
      : results.emergencyMonths < 1
        ? "Your next step is building a financial safety net."
        : results.emergencyMonths < 3
          ? "You're building financial security. Keep going."
          : results.score >= 80
            ? "You have a solid financial foundation."
            : "There is room to strengthen your finances."}
  </h2>

  <p>
    {results.hasNegativeCashFlow
      ? `Your current expenses exceed your income by ${currency(
          Math.abs(results.surplus)
        )} per month. Focus first on essential costs, cash flow and any overdue payments before setting investment goals.`
      : results.emergencyMonths < 1
        ? `Your current savings cover less than one month of your stated expenses. Start with a manageable emergency reserve and build it gradually.`
        : results.emergencyMonths < 3
          ? `Your savings cover approximately ${results.emergencyMonths.toFixed(
              1
            )} months of expenses. Consider building towards three months of essential costs, especially if your income is uncertain.`
          : `Your accessible savings cover approximately ${results.emergencyMonths.toFixed(
              1
            )} months of expenses. Review whether this reserve suits your circumstances and financial goals.`}
  </p>

  {answers.goal && (
    <div className="mc-personal-goal">
      <span>Your chosen goal</span>
      <strong>
        {{
          "emergency-fund": "Build an emergency fund",
          "pay-debt": "Pay off debt",
          purchase: "Save for a major purchase",
          invest: "Start investing",
          retirement: "Prepare for retirement",
          budget: "Improve my monthly budget",
        }[answers.goal]}
      </strong>
    </div>
  )}
</section>

      <div className="mc-metrics-grid">
        <ResultMetric
          label="Monthly cash flow"
          value={currency(results.surplus)}
          description={
            results.surplus >= 0
              ? "Income remaining after stated expenses"
              : "Monthly shortfall based on your answers"
          }
        />

        <ResultMetric
          label="Savings rate"
          value={percentage(results.savingsRate)}
          description={
            results.savingsRate >= 0
              ? "Estimated income remaining after expenses"
              : "Your expenses exceed your income"
          }
        />

        <ResultMetric
          label="Emergency fund"
          value={`${results.emergencyMonths.toFixed(1)} months`}
          description="Savings divided by monthly expenses"
        />

        <ResultMetric
          label="Debt repayments"
          value={
            results.debtRatioValid
              ? percentage(results.debtRatio)
              : answers.debt === "no"
                ? "No debt reported"
                : "Not available"
          }
          description={
            results.debtRatioValid
              ? "Monthly repayments as a share of income"
              : "Based on your answers"
          }
        />
      </div>

      <div className="mc-result-columns">
        <section className="mc-result-panel">
          <span className="mc-panel-kicker">
            WHAT IS GOING WELL
          </span>

          <h2>Your strengths</h2>

          {results.strengths.length > 0 ? (
            <ul className="mc-result-list">
              {results.strengths.map((item) => (
                <li key={item}>
                  <span className="mc-list-icon success">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Your answers do not yet identify a clear
              financial strength. That is a starting point,
              not a judgment.
            </p>
          )}
        </section>

        <section className="mc-result-panel">
          <span className="mc-panel-kicker">
            AREAS TO REVIEW
          </span>

          <h2>Your priorities</h2>

          {results.concerns.length > 0 ? (
            <ul className="mc-result-list">
              {results.concerns.map((item) => (
                <li key={item}>
                  <span className="mc-list-icon warning">
                    !
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Your answers do not reveal an obvious immediate
              concern. Continue reviewing your finances as
              your circumstances change.
            </p>
          )}
        </section>
      </div>

      <section className="mc-recommendations">
        <div className="mc-section-heading">
          <span className="mc-panel-kicker">
            YOUR NEXT STEPS
          </span>

          <h2>Three ways to improve your finances</h2>

          <p>
            Start with the action that matters most for your
            current circumstances.
          </p>
        </div>

        <div className="mc-recommendation-list">
          {results.recommendations.map(
            (recommendation, index) => (
              <article
                className="mc-recommendation"
                key={recommendation.title}
              >
                <div className="mc-recommendation-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3>{recommendation.title}</h3>
                  <p>{recommendation.text}</p>
                </div>
              </article>
            )
          )}
        </div>
      </section>

      <section className="mc-details">
        <button
          type="button"
          className="mc-details-toggle"
          onClick={() => setShowDetails((current) => !current)}
          aria-expanded={showDetails}
        >
          <span>How we calculated your results</span>
          <span>{showDetails ? "−" : "+"}</span>
        </button>

        {showDetails && (
          <div className="mc-details-content">
           <p>
  Your score uses a 100-point framework: monthly cash flow
  (20 points), emergency savings (20), debt position
  (15), debt payment status (10), ability to handle an
  unexpected expense (10), saving habits (10), income
  stability (5), and your self-reported financial situation
  (10). The score summarizes these indicators and is intended
  for educational use, not as a credit rating or a validated
  professional assessment.
</p>

            <p>
              The displayed score is the sum of the components
              that are currently implemented. This version
              should be treated as a preliminary indicator,
              not a validated financial assessment.
            </p>

            <p>
              Savings coverage is calculated by dividing
              accessible savings by stated monthly expenses.
              Savings rate is estimated from the difference
              between stated income and expenses. Both figures
              depend on the accuracy of your answers.
            </p>

            <p>
              The score does not assess your age, family size,
              dependants, country-specific benefits, insurance
              coverage, investment risk or the interest rates
              on individual debts. It is not regulated
              financial advice.
            </p>
          </div>
        )}
      </section>

      <div className="mc-results-actions">
        <button
          type="button"
          className="mc-button mc-button-secondary"
          onClick={onRestart}
        >
          Start again
        </button>

        <button
  type="button"
  className="mc-button mc-button-secondary"
  onClick={handleShare}
>
  <svg
    className="mc-share-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.7 10.7 6.6-4.4" />
    <path d="m8.7 13.3 6.6 4.4" />
  </svg>

  Share LOOM Money Check
</button>

        <a
  href="/about"
  className="mc-button mc-button-primary"
>
  Explore LOOM
  <span aria-hidden="true">→</span>
</a>
      </div>

      {shareMessage && (
  <p className="mc-share-message" role="status">
    {shareMessage}
  </p>
)}

      <p className="mc-disclaimer">
        This assessment provides general educational
        information, not personalized regulated financial
        advice. Results depend on the information you enter.
        Consider seeking qualified advice for complex debt,
        tax, investment or financial difficulties.
      </p>
    </section>
  );
}

export default function MoneyCheck() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [finished, setFinished] = useState(false);

  const visibleQuestions = useMemo(
    () => getVisibleQuestions(answers),
    [answers]
  );

  const currentQuestion = visibleQuestions[step];

  const progress = finished
    ? 100
    : ((step + 1) / visibleQuestions.length) * 100;

  function updateAnswer(id, value) {
    setAnswers((previous) => ({
      ...previous,
      [id]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [id]: "",
    }));
  }

  function validateCurrentQuestion() {
    if (!currentQuestion) return true;

    const value = answers[currentQuestion.id];

    if (
      currentQuestion.required &&
      (value === "" || value === null || value === undefined)
    ) {
      setErrors({
        [currentQuestion.id]: "Please provide an answer to continue.",
      });

      return false;
    }

    if (currentQuestion.type === "number") {
      const number = Number(value);

      if (!Number.isFinite(number) || number < 0) {
        setErrors({
          [currentQuestion.id]:
            "Enter a valid amount of €0 or more.",
        });

        return false;
      }
    }

    if (
      currentQuestion.type === "number" &&
      value !== "" &&
      Number(value) > 1000000000
    ) {
      setErrors({
        [currentQuestion.id]:
          "Please check this amount and enter a realistic figure.",
      });

      return false;
    }

    return true;
  }

  function handleContinue() {
    if (!validateCurrentQuestion()) return;

    if (step < visibleQuestions.length - 1) {
      setStep((previous) => previous + 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setFinished(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    if (step > 0) {
      setStep((previous) => previous - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleRestart() {
    setAnswers(initialAnswers);
    setStep(0);
    setErrors({});
    setFinished(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleKeyDown(event) {
    if (
      event.key === "Enter" &&
      currentQuestion?.type === "number"
    ) {
      event.preventDefault();
      handleContinue();
    }
  }

  return (
    <main className="mc-page">
      <div className="mc-background-glow" aria-hidden="true" />

      <header className="mc-header">
        <a href="/" className="mc-logo" aria-label="LOOM home">
  <img
    src="/loom-splash-symbol.png"
    alt=""
    className="mc-logo-image"
  />
  <span>LOOM</span>
</a>

        <span className="mc-header-label">
          PERSONAL FINANCE CHECK
        </span>
      </header>

      <div className="mc-container">
        {!finished ? (
          <>
            <section className="mc-intro">
              <span className="mc-eyebrow">
                YOUR MONEY. YOUR NEXT STEP.
              </span>

              <h1>
                Understand your financial health.
              </h1>

              <p>
                Answer a few simple questions to understand
                where you stand and what you can improve.
                No account required.
              </p>

              <div className="mc-intro-points">
                <span>
                  <span aria-hidden="true">✓</span> Free assessment
                </span>
                <span>
                  <span aria-hidden="true">✓</span> About 2 minutes
                </span>
                <span>
                  <span aria-hidden="true">✓</span> Personalized results
                </span>
              </div>
            </section>

            <section className="mc-question-card">
              <div className="mc-progress-top">
                <span>
                  QUESTION {step + 1} OF {visibleQuestions.length}
                </span>

                <span>{Math.round(progress)}% complete</span>
              </div>

              <div
                className="mc-progress-track"
                role="progressbar"
                aria-label="Questionnaire progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <div
                  className="mc-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {currentQuestion && (
                <div
                  className="mc-question-content"
                  onKeyDown={handleKeyDown}
                >
                  <span className="mc-step-number">
                    {String(step + 1).padStart(2, "0")}
                  </span>

                  <h2>{currentQuestion.title}</h2>

                  {currentQuestion.type === "number" ? (
                    <MoneyInput
                      question={currentQuestion}
                      value={answers[currentQuestion.id]}
                      onChange={(value) =>
                        updateAnswer(currentQuestion.id, value)
                      }
                      error={errors[currentQuestion.id]}
                    />
                  ) : (
                    <ChoiceQuestion
                      question={currentQuestion}
                      value={answers[currentQuestion.id]}
                      onChange={(value) =>
                        updateAnswer(currentQuestion.id, value)
                      }
                    />
                  )}

                  {errors[currentQuestion.id] &&
                    currentQuestion.type !== "number" && (
                      <p className="mc-field-error" role="alert">
                        {errors[currentQuestion.id]}
                      </p>
                    )}
                </div>
              )}

              <div className="mc-question-footer">
                <button
                  type="button"
                  className="mc-button mc-button-secondary"
                  onClick={handleBack}
                  disabled={step === 0}
                >
                  <span aria-hidden="true">←</span>
                  Back
                </button>

                <button
                  type="button"
                  className="mc-button mc-button-primary"
                  onClick={handleContinue}
                >
                  {step === visibleQuestions.length - 1
                    ? "See my results"
                    : "Continue"}
                  <span aria-hidden="true"> →</span>
                </button>
              </div>

              <p className="mc-privacy-note">
                Your answers are used in this page to calculate
                your results. This implementation does not
                send them to a server or save them to an account.
              </p>
            </section>
          </>
        ) : (
          <MoneyCheckResults
            answers={answers}
            onRestart={handleRestart}
          />
        )}
      </div>

      <footer className="mc-footer">
        <a href="/privacy">Privacy</a>
        <span>·</span>
        <a href="/terms">Terms</a>
        <span>·</span>
        <span>LOOM Money Check</span>
      </footer>
    </main>
  );
}