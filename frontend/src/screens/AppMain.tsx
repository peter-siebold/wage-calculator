import { Button, Box, Paper, BottomNavigation } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { EnterBirthDate } from "./EnterBirthdate";
import { EnterDateAndLocation } from "./EnterDateAndLocation";
import { SelectJobDescription } from "./SelectJobDescription";
import { WageOverview } from "./WageOverview";
import { FormValues } from "../@types/FormValues";
import { Header } from "../components/header/Header";
import { useWizardContext } from "../contexts/WizardContextProvider";

import type { FunctionComponent } from "react";

const AppMain: FunctionComponent = () => {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      startDate: "",
      location: "",
      birthDate: "",
    },
  });

  const {
    currentStep,
    nextStep,
    prevStep,
    handleAddFormData,
    minStep,
    maxStep,
    restart,
    goToStep,
  } = useWizardContext();
  const { t } = useTranslation();
  const onSubmit = (data: FormValues) => {
    handleAddFormData(data);
    nextStep();
  };

  const onRestart = () => {
    methods.reset({
      startDate: "",
      location: "",
      birthDate: "",
    });
    restart();
  };

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        <Header
          onClickLogo={() => {
            goToStep(1);
          }}
        />

        <Box
          component="form"
          noValidate
          autoComplete="off"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={methods.handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              marginTop: 4,
              overflowY: "auto",
              padding: 2,
            }}
          >
            {currentStep === 1 && <EnterDateAndLocation />}
            {currentStep === 2 && <EnterBirthDate />}
            {currentStep === 3 && <SelectJobDescription />}
            {currentStep === 4 && <WageOverview onRestart={onRestart} />}
          </Box>

          <Paper>
            <BottomNavigation
              sx={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                backgroundColor: "background.paper",
                justifyContent: "center",
                gap: "1rem",
                padding: "0.35rem",
              }}
              value={currentStep}
            >
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => {
                  prevStep();
                }}
                disabled={currentStep === minStep}
              >
                {t("BUTTON_BACK")}
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                disabled={
                  currentStep === maxStep || currentStep === maxStep - 1
                }
              >
                {t("BUTTON_NEXT")}
              </Button>
            </BottomNavigation>
          </Paper>
        </Box>
      </Box>
    </FormProvider>
  );
};

export { AppMain };
