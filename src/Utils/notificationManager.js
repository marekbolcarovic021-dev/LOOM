import { showNotification } from "./notificationService";

export function processInsights({
  insights,
  shownInsights,
  setShownInsights,
  profile,
  t,
}) {
  const shown = new Set(shownInsights);

  let changed = false;

  for (const insight of insights) {
    if (shown.has(insight.id)) {
      continue;
    }

    showNotification({
  profile,

  title: t(
    insight.titleKey,
    insight.values
  ),

  body: t(
    insight.bodyKey,
    insight.values
  ),

  priority: insight.priority,

  insight,
});

    shown.add(insight.id);
    changed = true;
  }

  if (changed) {
    setShownInsights([...shown]);
  }
}