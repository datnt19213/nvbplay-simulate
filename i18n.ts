// i18n.ts
import i18next from "i18next";
import {initReactI18next} from "react-i18next";

// Import translation JSON files directly
import enTranslation from "@/locales/en/translation.json";
import viTranslation from "@/locales/vi/translation.json";

// Initialize i18next
i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation, // English translations
    },
    vi: {
      translation: viTranslation, // Vietnamese translations
    },
  },
  lng: "vi", // Default language
  fallbackLng: "vi", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18next;
