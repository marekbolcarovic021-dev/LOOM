import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function GuideCard({
  to,
  icon,
  title,
  description,
  articleCount,
}) {
  const { t } = useTranslation();

  return (
    <Link
      to={to}
      className="guide-card"
    >
      <div className="guide-card-icon">
        {icon}
      </div>

      <div className="guide-card-content">

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

        {articleCount !== undefined && (
          <span className="guide-card-count">
            {articleCount}{" "}
            {articleCount === 1
              ? t("guide")
              : t("guides")}
          </span>
        )}

        <span className="guide-card-read">
          {t("readGuides")} →
        </span>

      </div>

      <div className="guide-card-arrow">
        →
      </div>
    </Link>
  );
}

export default GuideCard;