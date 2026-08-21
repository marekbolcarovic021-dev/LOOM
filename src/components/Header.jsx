import { Link } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import { useTranslation } from "react-i18next";

function Header() {
  const { profile } = useFinance();
  const { t } = useTranslation();

  const hour = new Date().getHours();

  let greeting;
  let dashboardMessage;

  if (hour < 12) {
    greeting = t("goodMorning");
    dashboardMessage = t("dashboardMorning");
  } else if (hour < 18) {
    greeting = t("goodAfternoon");
    dashboardMessage = t("dashboardAfternoon");
  } else {
    greeting = t("goodEvening");
    dashboardMessage = t("dashboardEvening");
  }

  return (
    <header className="welcome-header">

      <div className="welcome-content">

        <h1 className="welcome-title">
          <span className="gradient-text">
            {greeting}
          </span>

          <span className="wave">
            👋
          </span>
        </h1>

        <h2 className="welcome-subtitle">
  {t("welcomeBack", {
    name: profile?.name || "User",
  })}
</h2>

        <p className="welcome-description">
          {dashboardMessage}
        </p>

      </div>

      <Link
        to="/profile"
        className="header-avatar"
      >
        {profile?.avatar ? (
          <img
            src={profile.avatar}
            alt="Avatar"
            className="header-avatar-image"
          />
        ) : (
          profile?.name?.charAt(0).toUpperCase() || "U"
        )}
      </Link>

    </header>
  );
}

export default Header;