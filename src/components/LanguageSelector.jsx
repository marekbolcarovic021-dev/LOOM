import { useTranslation } from "react-i18next";

function LanguageSelector({ onChange }) {
  const { i18n } = useTranslation();

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
    { code: "ru", name: "🇷🇺 Русский" }
  ];

  return (
    <select
      className="profile-select"
      value={i18n.language}
      onChange={onChange}
    >
      {languages.map((language) => (
        <option
          key={language.code}
          value={language.code}
        >
          {language.name}
        </option>
      ))}
    </select>
  );
}

export default LanguageSelector;
