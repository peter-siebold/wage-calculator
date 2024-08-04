import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "./locales/de/translation.json";
import fr from "./locales/fr/translation.json";
import it from "./locales/it/translation.json";

export const defaultNS = "de";

export const resources = {
  de: {
    translation: {
      ...de,
    },
  },
  fr: {
    translation: {
      ...fr,
    },
  },
  it: {
    translation: {
      ...it,
    },
  },
} as const;

export const resourceDefault = {
  de,
} as const;

i18n
  .use(initReactI18next)
  .init({
    lng: "de",
    fallbackLng: "de",
    resources,
  })
  .catch((e: unknown) => {
    console.error("Error initializing i18n", e);
  });

export default i18n;
