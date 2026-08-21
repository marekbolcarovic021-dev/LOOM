import { createContext } from "react";

export const UserContext = createContext({
  country: "Slovakia",
  currency: "EUR",
  monthlyIncome: 2500,
  monthlyExpenses: 1500,
  riskTolerance: "moderate",
});
