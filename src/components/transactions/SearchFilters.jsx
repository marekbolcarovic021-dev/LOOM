import { useTranslation } from "react-i18next";

function SearchFilters({
  search,
  setSearch,
  filterType,
  setFilterType,
}) {
  const { t } = useTranslation();

  return (
    <div className="card search-card">

      <div className="search-wrapper">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="search-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.65 5.65a7.5 7.5 0 0010.6 10.6z"
          />
        </svg>

        <input
          className="search-input"
          type="text"
          placeholder={t("searchTransactions")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="filter-buttons">

        <button
          className={
            filterType === "All"
              ? "filter-btn active-filter"
              : "filter-btn"
          }
          onClick={() => setFilterType("All")}
        >
          {t("all")}
        </button>

        <button
          className={
            filterType === "Income"
              ? "filter-btn active-filter"
              : "filter-btn"
          }
          onClick={() => setFilterType("Income")}
        >
          {t("income")}
        </button>

  <button
  className={
    filterType === "Expense"
      ? "filter-btn active-filter"
      : "filter-btn"
  }
  onClick={() => setFilterType("Expense")}
>
  {t("expenses")}
</button>

      </div>

    </div>
  );
}

export default SearchFilters;