import { useFinance } from "../context/FinanceContext";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Download, Upload } from "lucide-react";
import {
  CreditCard,
  Flag,
  Target,
  TrendingUp,
  Trash2,
} from "lucide-react";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import { enableNotifications } from "../Utils/notifications";
import { showNotification } from "../Utils/notificationService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

function Profile() {
  const { logout, currentUser } = useAuth();
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  const memberSince =
    currentUser?.metadata?.creationTime
      ? new Intl.DateTimeFormat(i18n.language, {
          month: "long",
          year: "numeric",
        }).format(new Date(currentUser.metadata.creationTime))
      : "";

  async function handleLogout() {
    await logout();
  }

  async function handleDeleteAccount() {
    if (deletingAccount) return;

    try {
      setDeletingAccount(true);

      const deleteAccount = httpsCallable(
        functions,
        "deleteAccount"
      );

      await deleteAccount();

      /*
       * Firebase Authentication account has now
       * been deleted by the Cloud Function.
       */

      setShowDeleteModal(false);

      /*
       * Clear local application data as well.
       */
      localStorage.clear();

      /*
       * The Firebase auth listener will detect
       * that the user no longer exists.
       */
      await logout();
    } catch (error) {
      console.error(
        "Delete account error:",
        error
      );

      setDeletingAccount(false);

      showNotification({
        title: "LOOM",
        body: t("deleteAccountError"),
        priority: "error",
      });
    }
  }

  const {
    transactions,
    setTransactions,
    budgets,
    setBudgets,
    goals,
    setGoals,
    investments,
    setInvestments,
    profile,
    setProfile,
    settings,
    setSettings,
    premium,
    resetDemoData,
  } = useFinance();

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(
    profile?.name || ""
  );

  const handleStartNameEdit = () => {
    setNameInput(profile?.name || "");
    setEditingName(true);
  };

  const handleSaveName = () => {
    const trimmedName = nameInput.trim();

    if (!trimmedName) {
      return;
    }

    setProfile({
      ...profile,
      name: trimmedName,
    });

    setEditingName(false);
  };

  const handleCancelNameEdit = () => {
    setNameInput(profile?.name || "");
    setEditingName(false);
  };

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Argentina",
    "Australia",
    "Austria",
    "Belgium",
    "Brazil",
    "Bulgaria",
    "Canada",
    "Chile",
    "China",
    "Croatia",
    "Czech Republic",
    "Denmark",
    "Egypt",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "India",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Saudi Arabia",
    "Serbia",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "Ukraine",
    "United Kingdom",
    "United States",
    "Vietnam",
  ];

  const currencies = [
    { code: "EUR", name: "Euro (€)" },
    { code: "USD", name: "US Dollar ($)" },
    { code: "GBP", name: "British Pound (£)" },
    { code: "CZK", name: "Czech Koruna (Kč)" },
    { code: "PLN", name: "Polish Złoty (zł)" },
    { code: "CHF", name: "Swiss Franc (CHF)" },
    { code: "JPY", name: "Japanese Yen (¥)" },
  ];

  const languages = [
    { code: "en", name: "🇬🇧 English" },
    { code: "sk", name: "🇸🇰 Slovenčina" },
    { code: "de", name: "🇩🇪 Deutsch" },
    { code: "cs", name: "🇨🇿 Čeština" },
    { code: "pl", name: "🇵🇱 Polski" },
    { code: "fr", name: "🇫🇷 Français" },
    { code: "es", name: "🇪🇸 Español" },
    { code: "pt", name: "🇵🇹 Português" },
    { code: "zh", name: "🇨🇳 中文" },
    { code: "ja", name: "🇯🇵 日本語" },
    { code: "ko", name: "🇰🇷 한국어" },
    { code: "ru", name: "🇷🇺 Русский" },
  ];

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile({
        ...profile,
        avatar: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleExport = () => {
    const data = {
      profile,
      transactions,
      budgets,
      goals,
      investments,
    };

    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `loom-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (data.profile)
          setProfile(data.profile);

        if (data.transactions)
          setTransactions(data.transactions);

        if (data.budgets)
          setBudgets(data.budgets);

        if (data.goals)
          setGoals(data.goals);

        if (data.investments)
          setInvestments(data.investments);

        alert(t("dataImported"));
      } catch (error) {
        alert(t("invalidBackup"));
        console.error(error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="profile-page">
      <Header />

      <div className="profile-header">
        <h1 className="profile-title">
          {t("profile")}
        </h1>

        <div className="profile-title-line"></div>
      </div>

      {/* PROFILE CARD */}

      <div className="card profile-card">
        <div
          className="profile-avatar"
          onClick={() =>
            document
              .getElementById("avatarInput")
              .click()
          }
        >
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt="Avatar"
              className="avatar-image"
            />
          ) : (
            profile.name?.charAt(0).toUpperCase() || "U"
          )}

          <div className="avatar-edit">
            ✎
          </div>
        </div>

        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          hidden
        />

        {editingName ? (
          <div className="profile-name-edit">
            <input
              type="text"
              className="profile-name-input"
              value={nameInput}
              onChange={(e) =>
                setNameInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveName();
                }

                if (e.key === "Escape") {
                  handleCancelNameEdit();
                }
              }}
              autoFocus
              maxLength={40}
            />

            <div className="profile-name-actions">
              <button
                type="button"
                className="profile-name-save"
                onClick={handleSaveName}
              >
                {t("save")}
              </button>

              <button
                type="button"
                className="profile-name-cancel"
                onClick={handleCancelNameEdit}
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-name-wrapper">
            <h2 className="profile-name">
              {profile.name}
            </h2>

            <button
              type="button"
              className="profile-name-edit-button"
              onClick={handleStartNameEdit}
            >
              {t("changeName")}
            </button>
          </div>
        )}

        <p className="profile-member-since">
          {t("memberSince", {
            date: memberSince,
          })}
        </p>

        <div className="profile-avatar-actions">
          <label className="profile-action-card">
            <Upload size={22} />

            <h4>{t("changeAvatar")}</h4>

            <span>
              {t("uploadNewImage")}
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              hidden
            />
          </label>

          <button
            className="profile-action-card danger"
            onClick={() =>
              setProfile({
                ...profile,
                avatar: "",
              })
            }
          >
            <Download size={22} />

            <h4>{t("removeAvatar")}</h4>

            <span>
              {t("restoreDefault")}
            </span>
          </button>
        </div>

        <div className="subscription-card">
          <div>
            <h3>
              {premium?.plan === "premium"
                ? t("premium")
                : t("freePlan")}
            </h3>

            <p>
              {premium?.plan === "premium"
                ? t("premiumActive")
                : t("memberSince", {
                    date: memberSince,
                  })}
            </p>
          </div>

          <button
            onClick={() => navigate("/premium")}
          >
            {premium?.plan === "premium"
              ? t("manageSubscription")
              : t("upgrade")}
          </button>
        </div>
      </div>

      <div className="profile-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <CreditCard size={26} />
          </div>

          <div>
            <h3>{transactions.length}</h3>
            <p>{t("transactions")}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <Target size={26} />
          </div>

          <div>
            <h3>{goals.length}</h3>
            <p>{t("goals")}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <TrendingUp size={26} />
          </div>

          <div>
            <h3>{investments.length}</h3>
            <p>{t("assets")}</p>
          </div>
        </div>
      </div>

      {/* PERSONAL INFO */}

      <div className="card">
        <h3>{t("personalInformation")}</h3>

        <div className="profile-row">
          <span>{t("country")}</span>

          <select
            className="profile-select"
            value={profile.country}
            onChange={(e) =>
              setProfile({
                ...profile,
                country: e.target.value,
              })
            }
          >
            {countries.map((country) => (
              <option
                key={country}
                value={country}
              >
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="profile-row">
          <span>{t("currency")}</span>

          <select
            className="profile-select"
            value={profile.currency}
            onChange={(e) =>
              setProfile({
                ...profile,
                currency: e.target.value,
              })
            }
          >
            {currencies.map((currency) => (
              <option
                key={currency.code}
                value={currency.code}
              >
                {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div className="profile-row">
          <span>{t("language")}</span>

          <LanguageSelector
            onChange={(e) => {
              const language = e.target.value;

              i18n.changeLanguage(language);

              localStorage.setItem(
                "loom-language",
                language
              );
            }}
          />
        </div>
      </div>

      {/* PREFERENCES */}

      <div className="card">
        <h3>{t("preferences")}</h3>

        <div className="profile-row">
          <div className="profile-label">
            <span>{t("notifications")}</span>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={async (e) => {
                const enabled = e.target.checked;

                // When turning notifications ON,
                // request browser permission first.
                if (enabled) {
                  const granted =
                    await enableNotifications();

                  if (!granted) {
                    return;
                  }
                }

                // Save the actual notification preference.
                setSettings({
                  ...settings,
                  notifications: enabled,
                });

                // Show confirmation notification.
                showNotification({
                  profile: {
                    notifications: enabled,
                  },

                  title: "LOOM",

                  body: enabled
                    ? t("notificationsEnabled")
                    : t("notificationsDisabled"),

                  priority: "success",
                });
              }}
            />

            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* ==================================================
          ABOUT LOOM
      ================================================== */}

      <div className="card">
        <h3>{t("aboutLoom")}</h3>

        <div className="profile-row">
          <span>
            {t("learnMoreAboutMoney")}
          </span>

          <button
  type="button"
  className="profile-about-button"
  onClick={() => navigate("/about")}
>
  {t("aboutLoom")}
</button>
        </div>
      </div>

      {/* DATA MANAGEMENT */}

      <div className="card">
        <h3>{t("dataManagement")}</h3>

        <div className="profile-data-actions">
          <button
            className="profile-button"
            onClick={handleExport}
          >
            <Download size={20} />
            {t("exportData")}
          </button>

          <label className="profile-button profile-button-outline">
            <Upload size={20} />
            {t("importData")}

            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              hidden
            />
          </label>

          <button
            className="profile-button-outline"
            onClick={async () => {
              const confirmed = window.confirm(
                t("resetDemoConfirm")
              );

              if (!confirmed) return;

              try {
                await resetDemoData();

                showNotification({
                  title: "LOOM",
                  body: t("dataReset"),
                  priority: "success",
                });
              } catch (error) {
                console.error(
                  "Reset demo data error:",
                  error
                );

                showNotification({
                  title: "LOOM",
                  body: t("dataResetError"),
                  priority: "error",
                });
              }
            }}
          >
            {t("resetDemoData")}
          </button>

          <button
            className="profile-button-danger"
            onClick={() =>
              setShowDeleteModal(true)
            }
            disabled={deletingAccount}
          >
            {t("deleteAccount")}
          </button>
        </div>

        {showDeleteModal && (
          <div
            className="delete-account-overlay"
            onClick={() => {
              if (!deletingAccount) {
                setShowDeleteModal(false);
              }
            }}
          >
            <div
              className="delete-account-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <div className="delete-account-icon">
                <Trash2 size={28} />
              </div>

              <h2>
                {t("deleteAccountTitle")}
              </h2>

              <p>
                {t("deleteAccountMessage")}
              </p>

              <p className="delete-account-warning">
                {t("deleteAccountWarning")}
              </p>

              <div className="delete-account-actions">
                <button
                  type="button"
                  className="delete-account-cancel"
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                  disabled={deletingAccount}
                >
                  {t("cancel")}
                </button>

                <button
                  type="button"
                  className="delete-account-confirm"
                  onClick={handleDeleteAccount}
                  disabled={deletingAccount}
                >
                  {deletingAccount
                    ? t("deletingAccount")
                    : t("confirmDeleteAccount")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="app-version">
        {t("version")} 1.0.0
      </div>

      <button
        className="profile-danger-button"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        {t("logout")}
      </button>

      <BottomNav />
    </div>
  );
}

export default Profile;