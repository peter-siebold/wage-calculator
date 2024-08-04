import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { initReactI18next } from "react-i18next";
import { afterEach, beforeAll, afterAll, vi } from "vitest";

import i18n from "./i18n";
import de from "../src/locales/de/translation.json";
import fr from "../src/locales/fr/translation.json";
import it from "../src/locales/it/translation.json";

beforeAll(async () => {
  await i18n.use(initReactI18next).init({
    lng: "de",
    defaultNS: "de",
    resources: {
      de: {
        de,
      },
      it: {
        it,
      },
      fr: {
        fr,
      },
    },
  });
  vi.stubEnv("NODE_ENV", "test");
});

afterAll(() => {
  vi.unstubAllGlobals();
  // reset env
  vi.unstubAllEnvs();
});

afterEach(() => {
  cleanup();
});
