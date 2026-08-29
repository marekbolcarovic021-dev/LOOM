import { useTranslation } from "react-i18next";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function TransactionCharts({
  summaryData,
  pieData,
  totalIncome,
  totalExpenses,
  COLORS,
}) {
  const { t } = useTranslation();

  // ==================================================
  // SAFE VALUES
  // ==================================================

  const safeIncome =
    Number(totalIncome || 0);

  const safeExpenses =
    Number(totalExpenses || 0);

  // Prevent Recharts from receiving [0, 0]
  // when there are no transactions.
  const maxAmount = Math.max(
    safeIncome,
    safeExpenses
  );

  const chartMax =
    maxAmount > 0
      ? maxAmount * 1.2
      : 10;

  // ==================================================
  // BAR CHART DATA
  // ==================================================

  const incomeLabel =
    t("income");

  return (
    <div className="charts-grid">

      {/* ==================================================
          BAR CHART
          ================================================== */}

      <div className="card chart-card">

        <h2>
          {t("incomeVsExpenses")}
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={summaryData}
          >

            <XAxis
              dataKey="name"
            />

            <YAxis
              domain={[
                0,
                chartMax,
              ]}
            />

            <Tooltip />

            <Bar dataKey="amount">

              {summaryData.map(
                (entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      entry.name ===
                      incomeLabel
                        ? "#22c55e"
                        : "#ef4444"
                    }
                  />

                )
              )}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* ==================================================
          PIE CHART
          ================================================== */}

      <div className="card chart-card">

        <h2>
          {t("expensesByCategory")}
        </h2>

        {pieData.length > 0 ? (

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label={false}
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

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        ) : (

          <p
            style={{
              textAlign:
                "center",
              marginTop:
                "40px",
            }}
          >
            {t("noExpenses")}
          </p>

        )}

      </div>

    </div>
  );
}

export default TransactionCharts;