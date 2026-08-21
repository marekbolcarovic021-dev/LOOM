import { enqueueNotification } from "../services/notificationQueue";
import { getInsightAction } from "../services/insightActions";
import { isQuietHours } from "../services/quietHours";

export function showNotification({
    title,
    body,
    priority = "info",
    profile,
    insight,
}) {
    if (!profile?.notifications) return;

    // Always allow critical notifications
    if (isQuietHours() && priority !== "danger") {
        return;
    }

    enqueueNotification({
        id: insight?.id ?? crypto.randomUUID(),
        type: insight?.type,
        priority,
        title,
        body,
        insight,
        action: null,
    });
}
