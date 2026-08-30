import BottomNav from "../components/BottomNav";
import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../Utils/currency";
import Modal from "../components/Modal";

import {
  Target,
  PiggyBank,
  CalendarDays,
  Wallet,
  Trophy,
  Plus,
  ArrowUpRight,
  Pencil,
  Trash2,
} from "lucide-react";

function Goals() {
  const { t, i18n } = useTranslation();

  const {
    goals,
    setGoals,
    profile,
  } = useFinance();

  // ==========================================================
  // ADD GOAL FORM
  // ==========================================================

  const [goalName, setGoalName] =
    useState("");

  const [targetAmount, setTargetAmount] =
    useState("");

  const [currentSavings, setCurrentSavings] =
    useState("");

  const [deadline, setDeadline] =
    useState("");

  // ==========================================================
  // EDIT GOAL
  // ==========================================================

  const [editingGoal, setEditingGoal] =
    useState(null);

  const [newSavings, setNewSavings] =
    useState("");

  // ==========================================================
  // ADD GOAL
  // ==========================================================

  function addGoal() {
    if (
      !goalName.trim() ||
      targetAmount === "" ||
      currentSavings === "" ||
      deadline === ""
    ) {
      return;
    }

    const numericTarget =
      Number(targetAmount);

    const numericSavings =
      Number(currentSavings);

    const numericDeadline =
      Number(deadline);

    // Prevent invalid values
    if (
      !Number.isFinite(
        numericTarget
      ) ||
      !Number.isFinite(
        numericSavings
      ) ||
      !Number.isFinite(
        numericDeadline
      )
    ) {
      return;
    }

    // Target must be positive
    if (numericTarget <= 0) {
      return;
    }

    // Savings cannot be negative
    if (numericSavings < 0) {
      return;
    }

    // Deadline must be positive
    if (numericDeadline <= 0) {
      return;
    }

    const cleanName =
      goalName.trim();

    const newGoal = {
      id: Date.now(),

      name:
        cleanName.charAt(0).toUpperCase() +
        cleanName.slice(1),

      amount:
        numericTarget,

      currentSavings:
        numericSavings,

      deadline:
        numericDeadline,
    };

    setGoals(
      (previousGoals) => [
        ...previousGoals,
        newGoal,
      ]
    );

    // Reset
    setGoalName("");
    setTargetAmount("");
    setCurrentSavings("");
    setDeadline("");
  }

  // ==========================================================
  // UPDATE SAVINGS
  // ==========================================================

  function updateSavings() {
    if (!editingGoal) {
      return;
    }

    if (newSavings === "") {
      return;
    }

    const numericSavings =
      Number(newSavings);

    if (
      !Number.isFinite(
        numericSavings
      )
    ) {
      return;
    }

    if (numericSavings < 0) {
      return;
    }

    setGoals(
      (previousGoals) =>
        previousGoals.map(
          (goal) =>
            goal.id ===
            editingGoal.id
              ? {
                  ...goal,
                  currentSavings:
                    numericSavings,
                }
              : goal
        )
    );

    setEditingGoal(null);
    setNewSavings("");
  }

  // ==========================================================
  // DELETE GOAL
  // ==========================================================

  function deleteGoal(goalId) {
    setGoals(
      (previousGoals) =>
        previousGoals.filter(
          (goal) =>
            goal.id !== goalId
        )
    );
  }

  // ==========================================================
  // OPEN UPDATE MODAL
  // ==========================================================

  function openUpdateSavings(goal) {
    setEditingGoal(goal);
    setNewSavings(
      goal.currentSavings ?? ""
    );
  }

  // ==========================================================
  // CLOSE UPDATE MODAL
  // ==========================================================

  function closeUpdateModal() {
    setEditingGoal(null);
    setNewSavings("");
  }

  // ==========================================================
  // OVERALL GOAL STATISTICS
  // ==========================================================

  const totalTarget =
    goals.reduce(
      (sum, goal) =>
        sum +
        Number(
          goal.amount || 0
        ),
      0
    );

  const totalSaved =
    goals.reduce(
      (sum, goal) =>
        sum +
        Number(
          goal.currentSavings || 0
        ),
      0
    );

  const overallProgress =
    totalTarget > 0
      ? Math.min(
          Math.round(
            (totalSaved /
              totalTarget) *
              100
          ),
          100
        )
      : 0;

  const completedGoals =
    goals.filter(
      (goal) =>
        Number(
          goal.currentSavings || 0
        ) >=
        Number(
          goal.amount || 0
        )
    ).length;

  return (
    <div className="goals-page">

      {/* ====================================================
          PAGE HEADER
          ==================================================== */}

      <div className="goals-page-header">

        <div className="goals-title-block">

          <div className="goals-title-icon">

            <Target
              size={30}
              strokeWidth={2}
            />

          </div>

          <div>

            <h1>
              {t("financialGoals")}
            </h1>

            <p>
              {t(
                "createYourFirstFinancialGoal"
              )}
            </p>

          </div>

        </div>

      </div>


      {/* ====================================================
          OVERALL GOALS OVERVIEW
          ==================================================== */}

      {goals.length > 0 && (

        <div className="goals-overview">

          {/* TOTAL TARGET */}

          <div className="goal-overview-card">

            <div className="goal-overview-icon target">

              <Target
                size={22}
                strokeWidth={2.2}
              />

            </div>

            <div>

              <span>
                {t("targetAmount")}
              </span>

              <strong>

                {formatCurrency(
                  totalTarget,
                  profile.currency,
                  i18n.language
                )}

              </strong>

            </div>

          </div>


          {/* TOTAL SAVED */}

          <div className="goal-overview-card">

            <div className="goal-overview-icon savings">

              <PiggyBank
                size={22}
                strokeWidth={2.2}
              />

            </div>

            <div>

              <span>
                {t("currentSavings")}
              </span>

              <strong>

                {formatCurrency(
                  totalSaved,
                  profile.currency,
                  i18n.language
                )}

              </strong>

            </div>

          </div>


          {/* PROGRESS */}

          <div className="goal-overview-card">

            <div className="goal-overview-icon progress">

              <ArrowUpRight
                size={22}
                strokeWidth={2.2}
              />

            </div>

            <div>

              <span>
                {t("progress")}
              </span>

              <strong>
                {overallProgress}%
              </strong>

            </div>

          </div>


          {/* COMPLETED */}

          <div className="goal-overview-card">

            <div className="goal-overview-icon completed">

              <Trophy
                size={22}
                strokeWidth={2.2}
              />

            </div>

            <div>

              <span>
                {t("completed")}
              </span>

              <strong>
                {completedGoals}/
                {goals.length}
              </strong>

            </div>

          </div>

        </div>

      )}


      {/* ====================================================
          ADD GOAL
          ==================================================== */}

      <div className="goal-form goals-create-card">

        <div className="goals-form-header">

          <div className="goals-form-icon">

            <Plus
              size={22}
              strokeWidth={2.4}
            />

          </div>

          <div>

            <h2>
              {t("addGoal")}
            </h2>

            <p>
              {t(
                "createYourFirstFinancialGoal"
              )}
            </p>

          </div>

        </div>


        <div className="goals-form-grid">

          {/* GOAL NAME */}

          <div className="goal-input-wrapper">

            <label>
              {t("goalName")}
            </label>

            <div className="goal-input-with-icon">

              <Target
                size={18}
                strokeWidth={2}
              />

              <input
                type="text"
                placeholder={t(
                  "goalName"
                )}
                value={goalName}
                onChange={(e) =>
                  setGoalName(
                    e.target.value
                  )
                }
              />

            </div>

          </div>


          {/* TARGET */}

          <div className="goal-input-wrapper">

            <label>
              {t("targetAmount")}
            </label>

            <div className="goal-input-with-icon">

              <Wallet
                size={18}
                strokeWidth={2}
              />

              <input
                type="number"
                min="0"
                step="any"
                placeholder={t(
                  "targetAmount"
                )}
                value={
                  targetAmount
                }
                onChange={(e) =>
                  setTargetAmount(
                    e.target.value
                  )
                }
              />

            </div>

          </div>


          {/* CURRENT SAVINGS */}

          <div className="goal-input-wrapper">

            <label>
              {t("currentSavings")}
            </label>

            <div className="goal-input-with-icon">

              <PiggyBank
                size={18}
                strokeWidth={2}
              />

              <input
                type="number"
                min="0"
                step="any"
                placeholder={t(
                  "currentSavings"
                )}
                value={
                  currentSavings
                }
                onChange={(e) =>
                  setCurrentSavings(
                    e.target.value
                  )
                }
              />

            </div>

          </div>


          {/* DEADLINE */}

          <div className="goal-input-wrapper">

            <label>
              {t("yearsToAchieve")}
            </label>

            <div className="goal-input-with-icon">

              <CalendarDays
                size={18}
                strokeWidth={2}
              />

              <input
                type="number"
                min="0.1"
                step="0.1"
                placeholder={t(
                  "yearsToAchieve"
                )}
                value={deadline}
                onChange={(e) =>
                  setDeadline(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        </div>


        <button
          className="goals-add-btn"
          onClick={addGoal}
        >

          <Plus
            size={19}
            strokeWidth={2.5}
          />

          {t("addGoal")}

        </button>

      </div>


      {/* ====================================================
          EMPTY STATE
          ==================================================== */}

      {goals.length === 0 && (

        <div className="goals-empty-state">

          <div className="goals-empty-visual">

            <div className="goals-empty-ring">

              <Target
                size={58}
                strokeWidth={1.5}
              />

            </div>

            <div className="empty-floating-icon savings">

              <PiggyBank
                size={21}
                strokeWidth={2}
              />

            </div>

            <div className="empty-floating-icon trophy">

              <Trophy
                size={19}
                strokeWidth={2}
              />

            </div>

          </div>


          <div className="goals-empty-content">

            <h2>
              {t("noGoalsYet")}
            </h2>

            <p>
              {t(
                "createYourFirstFinancialGoal"
              )}
            </p>

            <div className="goals-empty-hint">

              <ArrowUpRight
                size={17}
                strokeWidth={2}
              />

              <span>
                {t("addGoal")}
              </span>

            </div>

          </div>

        </div>

      )}


      {/* ====================================================
          GOALS
          ==================================================== */}

      {goals.length > 0 && (

        <div className="goals-list">

          {goals.map(
            (goal) => {

              const numericTarget =
                Number(
                  goal.amount || 0
                );

              const numericSavings =
                Number(
                  goal.currentSavings ||
                    0
                );

              const numericDeadline =
                Number(
                  goal.deadline || 0
                );


              // ---------------------------------------------
              // PROGRESS
              // ---------------------------------------------

              const progress =
                numericTarget > 0
                  ? Math.min(
                      Math.max(
                        Math.round(
                          (numericSavings /
                            numericTarget) *
                            100
                        ),
                        0
                      ),
                      100
                    )
                  : 0;


              // ---------------------------------------------
              // REMAINING
              // ---------------------------------------------

              const remaining =
                Math.max(
                  numericTarget -
                    numericSavings,
                  0
                );


              // ---------------------------------------------
              // MONTHLY NEEDED
              // ---------------------------------------------

              const months =
                numericDeadline *
                12;

              const monthlyNeeded =
                months > 0
                  ? Math.ceil(
                      remaining /
                        months
                    )
                  : 0;


              // ---------------------------------------------
              // COMPLETED
              // ---------------------------------------------

              const isCompleted =
                numericSavings >=
                numericTarget;


              return (

                <div
                  className={`goal-card ${
                    isCompleted
                      ? "goal-completed"
                      : ""
                  }`}
                  key={
                    goal.id
                  }
                >

                  {/* ========================================
                      CARD HEADER
                      ======================================== */}

                  <div className="goal-card-header">

                    <div className="goal-card-title">

                      <div className="goal-card-icon">

                        {isCompleted ? (

                          <Trophy
                            size={25}
                            strokeWidth={2}
                          />

                        ) : (

                          <Target
                            size={25}
                            strokeWidth={2}
                          />

                        )}

                      </div>

                      <div>

                        <h2>
                          {goal.name}
                        </h2>

                        <span>
                          {isCompleted
                            ? `${progress}% ${t(
                                "completed"
                              )}`
                            : `${progress}% ${t(
                                "completed"
                              )}`}
                        </span>

                      </div>

                    </div>


                    {isCompleted && (

                      <div className="goal-complete-badge">

                        <Trophy
                          size={15}
                          strokeWidth={2.2}
                        />

                        {t(
                          "completed"
                        )}

                      </div>

                    )}

                  </div>


                  {/* ========================================
                      PROGRESS
                      ======================================== */}

                  <div className="goal-progress-section">

                    <div className="goal-progress-top">

                      <span>
                        {t("progress")}
                      </span>

                      <strong>
                        {progress}%
                      </strong>

                    </div>

                    <div className="progress-bar">

                      <div
                        className="progress-fill"
                        style={{
                          width:
                            `${progress}%`,
                        }}
                      />

                    </div>

                  </div>


                  {/* ========================================
                      FINANCIAL INFORMATION
                      ======================================== */}

                  <div className="goal-stats-grid">

                    {/* TARGET */}

                    <div className="goal-stat">

                      <div className="goal-stat-icon">

                        <Target
                          size={18}
                          strokeWidth={2}
                        />

                      </div>

                      <div>

                        <span>
                          {t(
                            "targetAmount"
                          )}
                        </span>

                        <strong>

                          {formatCurrency(
                            numericTarget,
                            profile.currency,
                            i18n.language
                          )}

                        </strong>

                      </div>

                    </div>


                    {/* SAVED */}

                    <div className="goal-stat">

                      <div className="goal-stat-icon">

                        <PiggyBank
                          size={18}
                          strokeWidth={2}
                        />

                      </div>

                      <div>

                        <span>
                          {t(
                            "currentSavings"
                          )}
                        </span>

                        <strong>

                          {formatCurrency(
                            numericSavings,
                            profile.currency,
                            i18n.language
                          )}

                        </strong>

                      </div>

                    </div>


                    {/* DEADLINE */}

                    <div className="goal-stat">

                      <div className="goal-stat-icon">

                        <CalendarDays
                          size={18}
                          strokeWidth={2}
                        />

                      </div>

                      <div>

                        <span>
                          {t(
                            "deadline"
                          )}
                        </span>

                        <strong>

                          {numericDeadline}{" "}

                          {numericDeadline ===
                          1
                            ? t("year")
                            : t("years")}

                        </strong>

                      </div>

                    </div>


                    {/* MONTHLY */}

                    <div className="goal-stat">

                      <div className="goal-stat-icon">

                        <Wallet
                          size={18}
                          strokeWidth={2}
                        />

                      </div>

                      <div>

                        <span>
                          {t(
                            "monthlyNeeded"
                          )}
                        </span>

                        <strong>

                          {formatCurrency(
                            monthlyNeeded,
                            profile.currency,
                            i18n.language
                          )}

                        </strong>

                      </div>

                    </div>

                  </div>


                  {/* ========================================
                      REMAINING
                      ======================================== */}

                  {!isCompleted && (

                    <div className="goal-remaining">

                      <div>

                        <span>
                          {t(
                            "targetAmount"
                          )}
                        </span>

                        <strong>

                          {formatCurrency(
                            remaining,
                            profile.currency,
                            i18n.language
                          )}

                        </strong>

                      </div>

                      <div className="goal-remaining-icon">

                        <ArrowUpRight
                          size={19}
                          strokeWidth={2.2}
                        />

                      </div>

                    </div>

                  )}


                  {/* ========================================
                      ACTIONS
                      ======================================== */}

                  <div className="goal-actions">

                    <button
                      className="update-btn"
                      onClick={() =>
                        openUpdateSavings(
                          goal
                        )
                      }
                    >

                      <Pencil
                        size={17}
                        strokeWidth={2.2}
                      />

                      {t(
                        "updateSavings"
                      )}

                    </button>


                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteGoal(
                          goal.id
                        )
                      }
                    >

                      <Trash2
                        size={17}
                        strokeWidth={2.2}
                      />

                      {t(
                        "deleteGoal"
                      )}

                    </button>

                  </div>

                </div>

              );
            }
          )}

        </div>

      )}


      {/* ====================================================
          UPDATE SAVINGS MODAL
          ==================================================== */}

      {editingGoal && (

        <Modal
          title={t(
            "updateSavings"
          )}
          saveText={t(
            "saveChanges"
          )}
          cancelText={t(
            "cancel"
          )}
          onClose={
            closeUpdateModal
          }
          onSave={
            updateSavings
          }
        >

          <div className="goal-modal-header">

            <div className="goal-modal-icon">

              <PiggyBank
                size={25}
                strokeWidth={2}
              />

            </div>

            <div>

              <h3>
                {editingGoal.name}
              </h3>

              <span>
                {t(
                  "currentSavings"
                )}
              </span>

            </div>

          </div>


          <input
            type="number"
            min="0"
            step="any"
            value={
              newSavings
            }
            onChange={(e) =>
              setNewSavings(
                e.target.value
              )
            }
            placeholder={t(
              "currentSavings"
            )}
            autoFocus
          />

        </Modal>

      )}


      <BottomNav />

    </div>
  );
}

export default Goals;