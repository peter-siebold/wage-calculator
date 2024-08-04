import { Button, Paper, BottomNavigation } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface FooterProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  minStep: number;
  maxStep: number;
}

const Footer: React.FC<FooterProps> = ({
  currentStep,
  nextStep,
  prevStep,
  minStep,
  maxStep,
}) => {
  const { t } = useTranslation();
  return (
    <Paper>
      <BottomNavigation
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "background.paper",
          justifyContent: "space-between",
        }}
        value={currentStep}
        onChange={(_event, newValue) => {
          if (newValue === 0) {
            prevStep();
          } else {
            nextStep();
          }
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            prevStep();
          }}
          disabled={currentStep === minStep}
        >
          {t("BUTTON_BACK")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            nextStep();
          }}
          disabled={currentStep === maxStep}
        >
          {t("BUTTON_NEXT")}
        </Button>
      </BottomNavigation>
    </Paper>
  );
};

export { Footer };
