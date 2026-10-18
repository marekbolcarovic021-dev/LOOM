
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { useTranslation } from "react-i18next";
import { useFinance } from "../context/FinanceContext";
import { formatCurrency } from "../Utils/currency";

function AnalyticsCharts() {
  const { t, i18n } = useTranslation();

  const { transactions, profile } = useFinance();

  // EXPENSES — pôvodná logika

  const expenses = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );

  const grouped = {};

  expenses.forEach((transaction) => {
    if (!grouped[transaction.category]) {
      grouped[transaction.category] = 0;
    }

    grouped[transaction.category] += Number(
      transaction.amount
    );
  });

  const pieData = Object.keys(grouped).map((category) => ({
    name: t(category.toLowerCase(), category),
    value: grouped[category],
  }));

  const COLORS = [
    "#8b7aff",
    "#60a5fa",
    "#34d399",
    "#fbbf24",
    "#fb7185",
    "#22d3ee",
    "#c084fc",
  ];

  // BAR DATA — pôvodná logika

  const monthlyData = [
    {
      name: t("income"),
      value: transactions
        .filter(
          (transaction) => transaction.type === "Income"
        )
        .reduce(
          (sum, transaction) =>
            sum + Number(transaction.amount),
          0
        ),
    },
    {
      name: t("expenses"),
      value: transactions
        .filter(
          (transaction) => transaction.type === "Expense"
        )
        .reduce(
          (sum, transaction) =>
            sum + Number(transaction.amount),
          0
        ),
    },
  ];

  const currency = profile?.currency || "EUR";

  const tooltipStyle = {
    backgroundColor: "#111b2e",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: "12px",
    color: "#f1f5f9",
    padding: "10px 14px",
  };

  const formatTooltipValue = (value) =>
    formatCurrency(value, currency, i18n.language);

  return (
    <div className="analytics-grid">
      {/* EXPENSES BY CATEGORY */}

      <section className="analytics-card">
        <div className="analytics-card-heading">
          <div>
            <h2>{t("expensesByCategory")}</h2>
            <p className="analytics-card-subtitle">
              {t("expenses")}
            </p>
          </div>

          <span className="analytics-card-icon analytics-card-icon-purple">
            <span aria-hidden="true">◔</span>
          </span>
        </div>

        {pieData.length === 0 ? (
          <div className="analytics-empty">
            <p>{t("noExpenses")}</p>
          </div>
        ) : (
          <div className="analytics-chart-container">
  <PieChart
    responsive
    style={{
      width: "100%",
      height: 340,
      minWidth: 0,
    }}
  >
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={formatTooltipValue}
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: "#f1f5f9" }}
                  labelStyle={{
                    color: "#a8b6cc",
                    marginBottom: 4,
                  }}
                />
              </PieChart>
            
          </div>
        )}
        <div className="analytics-legend">
  {pieData.map((entry, index) => (
    <div className="analytics-legend-item" key={entry.name}>
      <span
        className="analytics-legend-dot"
        style={{ backgroundColor: COLORS[index % COLORS.length] }}
      />
      <span>{entry.name}</span>
      <span className="analytics-legend-value">
        {formatCurrency(entry.value, currency, i18n.language)}
      </span>
    </div>
  ))}
</div>
      </section>

      {/* INCOME VS EXPENSES */}

      <section className="analytics-card">
        <div className="analytics-card-heading">
          <div>
            <h2>{t("incomeVsExpenses")}</h2>
            <p className="analytics-card-subtitle">
              {t("income")} · {t("expenses")}
            </p>
          </div>

          <span className="analytics-card-icon analytics-card-icon-green">
            <span aria-hidden="true">↗</span>
          </span>
        </div>

       <div className="analytics-chart-container">
  <BarChart
    data={monthlyData}
    responsive
    style={{
      width: "100%",
      height: 340,
      minWidth: 0,
    }}
  >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#2d3b5e"
              />

              <XAxis
                dataKey="name"
                stroke="#9ca3af"
              />

              <YAxis
                stroke="#9ca3af"
              />

              <Tooltip
                formatter={formatTooltipValue}
                contentStyle={tooltipStyle}
                cursor={{
                  fill: "rgba(148, 163, 184, 0.07)",
                }}
              />

              <Bar
                dataKey="value"
                fill="#4f8cff"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
            
    
        </div>

<div className="analytics-legend">
  <div className="analytics-legend-item">
    <span
      className="analytics-legend-dot"
      style={{ backgroundColor: "#4f8cff" }}
    />
    <span>{t("income")}</span>
    <span className="analytics-legend-value">
      {formatCurrency(monthlyData[0].value, currency, i18n.language)}
    </span>
  </div>

  <div className="analytics-legend-item">
    <span
      className="analytics-legend-dot"
      style={{ backgroundColor: "#fb7185" }}
    />
    <span>{t("expenses")}</span>
    <span className="analytics-legend-value">
      {formatCurrency(monthlyData[1].value, currency, i18n.language)}
    </span>
  </div>
</div>

      </section>
    </div>
  );
}

export default AnalyticsCharts;
