import { renderToast } from "./toastRenderer";
import { groupNotifications } from "./notificationGrouping";

let queue = [];

let processing = false;

export function enqueueNotification(notification) {
  // Prevent duplicates already waiting in the queue
  if (queue.some((item) => item.id === notification.id)) {
    return;
  }

  queue.push({
    createdAt: Date.now(),
    ...notification,
  });

 sortQueue();

queue = groupNotifications(queue);

processQueue();
}

function sortQueue() {
  const weights = {
    danger: 5,
    warning: 4,
    celebration: 3,
    success: 2,
    info: 1,
  };

  queue.sort((a, b) => {
    const pa = weights[a.priority] ?? 0;
    const pb = weights[b.priority] ?? 0;

    if (pa !== pb) {
      return pb - pa;
    }

    return a.createdAt - b.createdAt;
  });
}

async function processQueue() {
  if (processing) return;

  processing = true;

  while (queue.length > 0) {
    const notification = queue.shift();

    if (!notification) continue;

    await renderToast(notification);
  }

  processing = false;
}