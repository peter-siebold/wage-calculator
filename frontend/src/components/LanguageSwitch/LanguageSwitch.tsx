import { Button, ButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useApplicationContext } from "../../contexts/ApplicationContextProvider";

import type { FunctionComponent } from "react";

const LanguageSwitch: FunctionComponent = () => {
  const { language, setLanguage, languages } = useApplicationContext();
  const { t } = useTranslation();

  return (
    <ButtonGroup
      variant="outlined"
      // variant="text"
      title={t("LANGUAGE_SWITCH") + ""}
    >
      {languages.map((lng) => (
        <Button
          key={lng}
          color="primary"
          // TODO: Fix this typing issue with dynamic langugage constants
          // @ts-expect-error Language constants are dynamic here and can't be typed easily
          title={t(lng)}
          onClick={() => void setLanguage(lng)}
          disabled={language === lng}
          // variant={language === lng ? "contained" : "outlined"}
          variant="text"
        >
          {lng.toUpperCase()}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export { LanguageSwitch };
