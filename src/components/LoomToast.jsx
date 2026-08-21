import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Trophy,
} from "lucide-react";

import { useTranslation } from "react-i18next";

function getIcon(priority) {
  switch (priority) {
    case "danger":
    case "warning":
      return <AlertTriangle size={22} />;

    case "success":
      return <CheckCircle2 size={22} />;

    case "celebration":
      return <Trophy size={22} />;

    default:
      return <Info size={22} />;
  }
}

export default function LoomToast({
  title,
  body,
  priority = "info",
  insight,
  onClose,
}) {
  const { t } = useTranslation();



  return (
    <div className={`loom-toast ${priority}`}>
      <div className="loom-toast-icon">
        {getIcon(priority)}
      </div>

      <div className="loom-toast-content">
        <h4>{title}</h4>
        <p>{body}</p>

      </div>

      <button
        className="loom-toast-close"
        onClick={() => onClose?.()}
      >
        ✕
      </button>
    </div>
  );
}
