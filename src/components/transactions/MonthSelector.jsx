import { useTranslation } from "react-i18next";

function MonthSelector({
  currentDate,
  selectedMonth,
  setSelectedMonth,
}) {
  const { t } = useTranslation();

  const months = [
    t("january"),
    t("february"),
    t("march"),
    t("april"),
    t("may"),
    t("june"),
    t("july"),
    t("august"),
    t("september"),
    t("october"),
    t("november"),
    t("december"),
  ];

  return (
    <div className="card">

      <h2>{t("month")}</h2>

      <div className="month-navigation">

        <button
          className="month-btn"
          onClick={() => {
            const previous = new Date(currentDate);

            previous.setMonth(
              previous.getMonth() - 1
            );

            setSelectedMonth(
              previous
                .toISOString()
                .slice(0, 7)
            );
          }}
        >
          ◀
        </button>

        <span className="month-label">
          {months[currentDate.getMonth()]}{" "}
          {currentDate.getFullYear()}
        </span>

        <button
          className="month-btn"
          onClick={() => {
            const next = new Date(currentDate);

            next.setMonth(
              next.getMonth() + 1
            );

            setSelectedMonth(
              next
                .toISOString()
                .slice(0, 7)
            );
          }}
        >
          ▶
        </button>

      </div>

    </div>
  );
}

export default MonthSelector;