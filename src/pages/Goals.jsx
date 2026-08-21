import BottomNav from "../components/BottomNav";
import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../Utils/currency";
import Modal from "../components/Modal";

function Goals() {
  const { t, i18n } = useTranslation();

  const {
    goals,
    setGoals,
    profile,
  } = useFinance();

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [deadline, setDeadline] = useState("");

  function addGoal() {
    if (
      !goalName ||
      !targetAmount ||
      !currentSavings ||
      !deadline
    )
      return;

    const newGoal = {
      id: Date.now(),

      name:
        goalName.charAt(0).toUpperCase() +
        goalName.slice(1),

      amount: Number(targetAmount),

      currentSavings: Number(currentSavings),

      deadline: Number(deadline),
    };

    setGoals([...goals, newGoal]);

    setGoalName("");
    setTargetAmount("");
    setCurrentSavings("");
    setDeadline("");
  }

  function updateSavings() {
  if (!editingGoal) return;

  setGoals(
    goals.map((g) =>
      g.id === editingGoal.id
        ? {
            ...g,
            currentSavings: Number(
              newSavings
            ),
          }
        : g
    )
  );

  setEditingGoal(null);
  setNewSavings("");
}

  function deleteGoal(goalId) {
    setGoals(
      goals.filter(
        (g) => g.id !== goalId
      )
    );
  }

  const [editingGoal, setEditingGoal] =
  useState(null);

const [newSavings, setNewSavings] =
  useState("");

  return (
    <div className="goals-page">

      <h1>{t("financialGoals")}</h1>

      <div className="goal-form">

        <input
          type="text"
          placeholder={t("goalName")}
          value={goalName}
          onChange={(e) =>
            setGoalName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder={t("targetAmount")}
          value={targetAmount}
          onChange={(e) =>
            setTargetAmount(e.target.value)
          }
        />

        <input
          type="number"
          placeholder={t("currentSavings")}
          value={currentSavings}
          onChange={(e) =>
            setCurrentSavings(e.target.value)
          }
        />

        <input
          type="number"
          placeholder={t("yearsToAchieve")}
          value={deadline}
          onChange={(e) =>
            setDeadline(e.target.value)
          }
        />

        <button onClick={addGoal}>
          {t("addGoal")}
        </button>

      </div>

      {goals.length === 0 && (

        <div className="card">

          <p
            style={{
              textAlign: "center",
              padding: "30px",
            }}
          >
            {t("noGoalsYet")}
            <br />
            {t("createYourFirstFinancialGoal")}
          </p>

        </div>

      )}

      {goals.map((goal) => {

        const progress = Math.min(
          Math.round(
            (goal.currentSavings /
              goal.amount) *
              100
          ),
          100
        );

        const monthlyNeeded =
          Math.max(
            Math.round(
              (goal.amount -
                goal.currentSavings) /
                (goal.deadline * 12)
            ),
            0
          );

        return (

          <div
            className="goal-card"
            key={goal.id}
          >

            <h2>{goal.name}</h2>

            <p>
              <span className="label">
                {t("targetAmount")}:
              </span>{" "}
              <span className="value">
                {formatCurrency(
                  goal.amount,
                  profile.currency,
                  i18n.language
                )}
              </span>
            </p>

            <p>
              <span className="label">
                {t("currentSavings")}:
              </span>{" "}
              <span className="value">
                {formatCurrency(
                  goal.currentSavings,
                  profile.currency,
                  i18n.language
                )}
              </span>
            </p>

            <p>
              <span className="label">
                {t("deadline")}:
              </span>{" "}
              <span className="value">
                {goal.deadline}{" "}
                {goal.deadline === 1
                  ? t("year")
                  : t("years")}
              </span>
            </p>

            <p>
              <span className="label">
                {t("monthlyNeeded")}:
              </span>{" "}
              <span className="value">
                {formatCurrency(
                  monthlyNeeded,
                  profile.currency,
                  i18n.language
                )}
              </span>
            </p>

            <p className="progress-title">
              {t("progress")}
            </p>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <p className="goal-progress">
              {progress}% {t("completed")}
            </p>

            <div className="goal-actions">

              <button
                className="update-btn"
                onClick={() => {
  setEditingGoal(goal);
  setNewSavings(goal.currentSavings);
}}
              >
                {t("updateSavings")}
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteGoal(goal.id)
                }
              >
                {t("deleteGoal")}
              </button>

            </div>

          </div>

        );

      })}

      {editingGoal && (

  <Modal
    title={t("updateSavings")}
    saveText={t("saveChanges")}
    cancelText={t("cancel")}
    onClose={() => {
      setEditingGoal(null);
      setNewSavings("");
    }}
    onSave={updateSavings}
  >

   <h3
  style={{
    textAlign: "center",
    color: "#fff",
    marginBottom: "18px",
    fontWeight: 600,
  }}
>
  {editingGoal.name}
</h3>

    <input
      type="number"
      value={newSavings}
      onChange={(e) =>
        setNewSavings(e.target.value)
      }
      placeholder={t("currentSavings")}
      autoFocus
    />

  </Modal>

  

)}

      <BottomNav />

    </div>
  );
}

export default Goals;
