import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "../src/locales/de/translation.json";
import fr from "../src/locales/fr/translation.json";
import it from "../src/locales/it/translation.json";

export const defaultNS = "de";
export const resources = {
  de: {
    de,
  },
  it: {
    it,
  },
  fr: {
    fr,
  },
} as const;

void i18n.use(initReactI18next).init({
  lng: "de",
  defaultNS,
  resources,
});

export default i18n;
