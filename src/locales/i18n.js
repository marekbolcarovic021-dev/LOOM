import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import sk from "./sk.json";
import de from "./de.json";
import cs from "./cs.json";
import pl from "./pl.json";
import fr from "./fr.json";
import zh from "./zh.json";
import ja from "./ja.json";
import es from "./es.json";
import pt from "./pt.json";
import ko from "./ko.json";
import ru from "./ru.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      sk: { translation: sk },
      de: { translation: de },
      cs: { translation: cs },
      pl: { translation: pl },
      fr: { translation: fr },
      zh: { translation: zh },
      ja: { translation: ja },
      es: { translation: es },
      pt: { translation: pt },
      ko: { translation: ko },
      ru: { translation: ru }
    },

    lng:
      localStorage.getItem("loom-language") ||
      "en",

    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;