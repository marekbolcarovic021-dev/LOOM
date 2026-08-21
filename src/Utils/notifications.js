export async function enableNotifications() {
  if (!("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  const permission =
    await Notification.requestPermission();

  return permission === "granted";
}

export function notify({
  profile,
  title,
  body,
  priority = "info",
  tag,
}) {
  if (!profile?.notifications) return;

  if (!("Notification" in window)) return;

  if (Notification.permission !== "granted")
    return;

  const options = {
    body,
    tag,
  };

  if (
    priority === "warning" ||
    priority === "danger"
  ) {
    options.requireInteraction = true;
  }

  new Notification(title, options);
}