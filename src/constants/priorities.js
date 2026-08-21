export const NotificationPriority = Object.freeze({
  INFO: "info",
  SUCCESS: "success",
  CELEBRATION: "celebration",
  WARNING: "warning",
  DANGER: "danger",
});

export const PriorityWeight = Object.freeze({
  [NotificationPriority.INFO]: 1,
  [NotificationPriority.SUCCESS]: 2,
  [NotificationPriority.CELEBRATION]: 3,
  [NotificationPriority.WARNING]: 4,
  [NotificationPriority.DANGER]: 5,
});