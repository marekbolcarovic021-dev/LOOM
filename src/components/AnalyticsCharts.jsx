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
} from "recharts";

import { useTranslation } from "react-i18next";
import { useFinance } from "../context/FinanceContext";
import { formatCurrency } from "../utils/currency";

function AnalyticsCharts() {
  const { t, i18n } = useTranslation();

  const {
    transactions,
    profile,
  } = useFinance();

  // EXPENSES

  const expenses = transactions.filter(
    (t) => t.type === "Expense"
  );

  const grouped = {};

  expenses.forEach((t) => {
    if (!grouped[t.category]) {
      grouped[t.category] = 0;
    }

    grouped[t.category] += Number(
      t.amount
    );
  });

  const pieData = Object.keys(
    grouped
  ).map((category) => ({
    name: t(
      category.toLowerCase(),
      category
    ),
    value: grouped[category],
  }));

  const COLORS = [
    "#4f8cff",
    "#7c3aed",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#8b5cf6",
  ];

  // BAR DATA

  const monthlyData = [
    {
      name: t("income"),
      value: transactions
        .filter(
          (t) => t.type === "Income"
        )
        .reduce(
          (sum, t) =>
            sum + Number(t.amount),
          0
        ),
    },

    {
      name: t("expenses"),
      value: transactions
        .filter(
          (t) => t.type === "Expense"
        )
        .reduce(
          (sum, t) =>
            sum + Number(t.amount),
          0
        ),
    },
  ];

  return (
    <div className="analytics-grid">

      {/* PIE */}

      <div className="analytics-card">

        <h2>
          {t("expensesByCategory")}
        </h2>

        {pieData.length === 0 ? (

          <p>{t("noExpenses")}</p>

        ) : (

          <ResponsiveContainer
            width="100%"
            height={340}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >

                {pieData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip
                formatter={(value) =>
                  formatCurrency(
                    value,
                    profile.currency,
                    i18n.language
                  )
                }
              />

            </PieChart>

          </ResponsiveContainer>

        )}

      </div>

      {/* BAR */}

      <div className="analytics-card">

        <h2>
          {t("incomeVsExpenses")}
        </h2>

        <ResponsiveContainer
          width="100%"
          height={340}
        >

          <BarChart
            data={monthlyData}
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
              formatter={(value) =>
                formatCurrency(
                  value,
                  profile.currency,
                  i18n.language
                )
              }
            />

            <Bar
              dataKey="value"
              fill="#4f8cff"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AnalyticsCharts;