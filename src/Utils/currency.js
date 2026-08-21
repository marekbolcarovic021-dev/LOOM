console.log("NEW currency.js loaded");
const currencySymbols = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  CZK: "Kč",
  PLN: "zł",
  CHF: "CHF",
  JPY: "¥",
};

export function formatCurrency(
  amount,
  currency = "EUR",
  language = "en"
) {
  const localeMap = {
    en: "en-US",
    sk: "sk-SK",
    de: "de-DE",
    cs: "cs-CZ",
    fr: "fr-FR",
    es: "es-ES",
    it: "it-IT",
    pt: "pt-PT",
    nl: "nl-NL",
    pl: "pl-PL",
  };

  // Convert values like "EUR (€)" -> "EUR"

    console.log("currency =", currency);

const currencyCode =
  String(currency)
    .replace(/\s*\(.*?\)/, "")
    .trim();

console.log("currencyCode =", currencyCode);

  return new Intl.NumberFormat(
    localeMap[language] || "en-US",
    {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(amount);
}
