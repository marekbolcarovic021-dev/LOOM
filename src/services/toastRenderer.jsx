import toast from "react-hot-toast";
import LoomToast from "../components/LoomToast";

export function renderToast(notification) {
  const title = notification.grouped
    ? `${notification.count} notifications`
    : notification.title;

  const body = notification.grouped
    ? notification.items
        .slice(0, 3)
        .map((n) => "• " + n.title)
        .join("\n")
    : notification.body;

  return new Promise((resolve) => {
    const duration =
      notification.priority === "warning" ||
      notification.priority === "danger"
        ? Infinity
        : notification.priority === "celebration"
        ? 7000
        : 5000;

    const toastId = toast.custom(
      (t) => (
        <LoomToast
          title={title}
          body={body}
          priority={notification.priority}
          insight={notification.insight}
          onClose={() => {
            toast.dismiss(t.id);
            resolve();
          }}
        />
      ),
      {
        duration,
      }
    );

    if (duration !== Infinity) {
      setTimeout(() => {
        toast.dismiss(toastId);
        resolve();
      }, duration + 100);
    }
  });
}