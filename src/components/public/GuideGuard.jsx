import { Link } from "react-router-dom";

function GuideCard({
  to,
  icon,
  title,
  description,
  articleCount,
}) {
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
              ? "guide"
              : "guides"}
          </span>

        )}

      </div>

      <div className="guide-card-arrow">
        →
      </div>

    </Link>
  );
}

export default GuideCard;