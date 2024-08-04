import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import i18n from "../../../__tests__/i18n";
import { ApplicationContextProvider } from "../../contexts/ApplicationContextProvider";
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";

describe("LanguageSwitch", () => {
  it("should switch language", async () => {
    render(
      <ApplicationContextProvider>
        <LanguageSwitch />
      </ApplicationContextProvider>
    );

    const languageSwitch = screen.getByRole("group", {
      name: i18n.t("LANGUAGE_SWITCH"),
    });
    expect(languageSwitch).toBeInTheDocument();

    const languageSwitchDe = screen.getByRole("button", { name: /de/i });
    expect(languageSwitchDe).toBeInTheDocument();

    // per default de should be selected and the button should be disabled
    expect(languageSwitchDe).toBeDisabled();

    const languageSwitchIt = screen.getByRole("button", { name: /it/i });
    expect(languageSwitchIt).toBeInTheDocument();

    fireEvent.click(languageSwitchIt);

    await waitFor(() => {
      const languageSwitchIt = screen.getByRole("button", { name: /it/i });
      const languageSwitchDe = screen.getByRole("button", { name: /de/i });

      expect(languageSwitchIt).toBeDisabled();
      expect(languageSwitchDe).not.toBeDisabled();
    });
  });
});
