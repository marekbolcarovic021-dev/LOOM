import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../../styles/public/PublicLayout.css";

function PublicHeader() {
  const { t } = useTranslation();
  const location = useLocation();

  const navigation = [
    {
      path: "/about",
      label: t("aboutLoom", {
        defaultValue: "About LOOM",
      }),
    },
    {
      path: "/guides",
      label: t("financialGuides", {
        defaultValue: "Financial Guides",
      }),
    },
    {
      path: "/contact",
      label: t("contact", {
        defaultValue: "Contact",
      }),
    },
  ];

  function isActive(path) {
    if (path === "/guides") {
      return location.pathname.startsWith("/guides");
    }

    return location.pathname === path;
  }

  return (
    <header className="public-header">

      <div className="public-header-inner">

        {/* ==================================================
            LOGO
        ================================================== */}

        <Link
          to="/about"
          className="public-logo"
        >
          <img
            src="/loom-favicon.png"
            alt="LOOM"
          />

          <span>
            LOOM
          </span>
        </Link>


        {/* ==================================================
            NAVIGATION
        ================================================== */}

        <nav className="public-navigation">

          {navigation.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={
                isActive(item.path)
                  ? "public-nav-link active"
                  : "public-nav-link"
              }
            >
              {item.label}
            </Link>

          ))}

        </nav>


        {/* ==================================================
            AUTH ACTIONS
        ================================================== */}

        <div className="public-header-actions">

          <Link
            to="/login"
            className="public-login-link"
          >
            {t("login", {
              defaultValue: "Login",
            })}
          </Link>

          <Link
            to="/register"
            className="public-register-button"
          >
            {t("register", {
              defaultValue: "Get Started",
            })}
          </Link>

        </div>

      </div>

    </header>
  );
}

export default PublicHeader;