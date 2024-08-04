import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";

import type { PropsWithChildren, JSX, FunctionComponent } from "react";

interface ApplicationContextType {
  language: string;
  setLanguage: (language: string) => Promise<void>;
  languages: string[];
  dateFormat: string;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export const useApplicationContext = (): ApplicationContextType => {
  const context = useContext(ApplicationContext);
  if (typeof context === "undefined") {
    throw new Error(
      "useApplicationContext must be used inside the ApplicationContextProvider"
    );
  }
  return context;
};

export const ApplicationContextProvider: FunctionComponent<
  PropsWithChildren
> = ({ children }): JSX.Element => {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState("de");
  const dateFormat = useMemo(() => {
    switch (language) {
      case "de":
        return "dd.MM.yyyy";
      case "fr":
      case "it":
        return "dd/MM/yyyy";
      default:
        return "dd/MM/yyyy";
    }
  }, [language]);

  const languages = useMemo(() => {
    return ["de", "fr", "it"];
  }, []);

  const handleSetLanguage = useCallback(
    async (language: string): Promise<void> => {
      await i18n.changeLanguage(language).then(() => {
        setLanguage(language);
      });
    },
    [i18n]
  );

  const value = useMemo(() => {
    return {
      language,
      setLanguage: handleSetLanguage,
      languages,
      dateFormat,
    };
  }, [language, handleSetLanguage, languages, dateFormat]);

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};
