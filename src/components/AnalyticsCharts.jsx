
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import { useTranslation } from "react-i18next";
import { useFinance } from "../context/FinanceContext";
import { formatCurrency } from "../Utils/currency";

function AnalyticsCharts() {
  const { t, i18n } = useTranslation();

  const { transactions, profile } = useFinance();

  // EXPENSES — pôvodné výpočty zostávajú zachované

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
    "#34d399",
    "#60a5fa",
    "#fbbf24",
    "#fb7185",
    "#22d3ee",
    "#c084fc",
  ];

  // INCOME VS EXPENSES — pôvodné výpočty zostávajú zachované

  const monthlyData = [
    {
      name: t("income"),
      value: transactions
        .filter((transaction) => transaction.type === "Income")
        .reduce(
          (sum, transaction) => sum + Number(transaction.amount),
          0
        ),
    },
    {
      name: t("expenses"),
      value: transactions
        .filter((transaction) => transaction.type === "Expense")
        .reduce(
          (sum, transaction) => sum + Number(transaction.amount),
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
            <ResponsiveContainer width="100%" height={290}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="46%"
                  outerRadius="68%"
                  innerRadius="43%"
                  paddingAngle={3}
                  stroke="none"
                  label={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={formatTooltipValue}
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: "#f1f5f9" }}
                  labelStyle={{ color: "#a8b6cc", marginBottom: 4 }}
                />

                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{
                    fontSize: "12px",
                    color: "#a8b6cc",
                    paddingTop: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
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
          <ResponsiveContainer width="100%" height={290}>
            <BarChart
              data={monthlyData}
              margin={{ top: 12, right: 8, left: 4, bottom: 4 }}
              barSize={48}
            >
              <CartesianGrid
                stroke="rgba(148, 163, 184, 0.13)"
                strokeDasharray="4 5"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a8b6cc", fontSize: 12 }}
                tickMargin={12}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8494ad", fontSize: 11 }}
                width={48}
                tickFormatter={(value) =>
                  new Intl.NumberFormat(i18n.language, {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(value)
                }
              />

              <Tooltip
                formatter={formatTooltipValue}
                contentStyle={tooltipStyle}
                cursor={{ fill: "rgba(148, 163, 184, 0.07)" }}
                itemStyle={{ color: "#f1f5f9" }}
                labelStyle={{ color: "#a8b6cc", marginBottom: 4 }}
              />

              <Bar
                dataKey="value"
                name={t("incomeVsExpenses")}
                radius={[7, 7, 2, 2]}
                maxBarSize={58}
              >
                {monthlyData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={
                      entry.name === t("income")
                        ? "#34d399"
                        : "#fb7185"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

export default AnalyticsCharts;
