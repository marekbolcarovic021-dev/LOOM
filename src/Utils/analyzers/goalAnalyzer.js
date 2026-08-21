import { InsightTypes } from "../../constants/insightTypes";
import {
  createInsightId,
  calculateGoalProgress,
  remainingGoal,
} from "../insightHelpers";

const milestones = [
  {
    value: 1,
    type: InsightTypes.GOAL_COMPLETED,
    titleKey: "goalCompletedTitle",
    bodyKey: "goalCompletedBody",
    priority: "celebration",
  },
  {
    value: 0.9,
    type: InsightTypes.GOAL_90,
    titleKey: "goal90Title",
    bodyKey: "goal90Body",
    priority: "warning",
  },
  {
    value: 0.75,
    type: InsightTypes.GOAL_75,
    titleKey: "goal75Title",
    bodyKey: "goal75Body",
    priority: "success",
  },
  {
    value: 0.5,
    type: InsightTypes.GOAL_50,
    titleKey: "goal50Title",
    bodyKey: "goal50Body",
    priority: "info",
  },
  {
    value: 0.25,
    type: InsightTypes.GOAL_25,
    titleKey: "goal25Title",
    bodyKey: "goal25Body",
    priority: "info",
  },
];

export function analyzeGoals({
  goals,
}) {
  const insights = [];

  const now = new Date();

  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  for (const goal of goals) {
    const progress = calculateGoalProgress(
      Number(goal.saved || 0),
      Number(goal.target || 0)
    );

    for (const milestone of milestones) {
      if (progress < milestone.value) continue;

      insights.push({
        id: createInsightId({
          type: milestone.type,
          goalId: goal.id,
          year,
          month,
        }),

        type: milestone.type,

        priority: milestone.priority,

        titleKey: milestone.titleKey,

        bodyKey: milestone.bodyKey,

        values: {
          goal: goal.name,
          target: goal.target,
          saved: goal.saved,
          remaining: remainingGoal(
            Number(goal.saved || 0),
            Number(goal.target || 0)
          ),
        },

        entity: {
    type: "goal",
    id: goal.id,
}
      });

      break;
    }
  }

  return insights;
}
