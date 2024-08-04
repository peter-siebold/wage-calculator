import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { HourlyList } from "../components/WageOverview/HourlyList";
import { MonthlyList } from "../components/WageOverview/MontlyList";
import { useWizardContext } from "../contexts/WizardContextProvider";
import {
  calculateMinimumWage,
  calculateHourlyWage,
  HourlyWageValues,
} from "../util/calculateMinimumWage";
import { getMinimumWageByCanton } from "../util/cantonMinimumWages";
import { getCantonByInput } from "../util/getCantonData";

import type { FunctionComponent } from "react";

interface WageOverviewProps {
  onRestart: () => void;
}

enum WageInterval {
  Hourly = "hourly",
  Monthly = "monthly",
}

const WageOverview: FunctionComponent<WageOverviewProps> = ({ onRestart }) => {
  const { formData } = useWizardContext();
  const { t } = useTranslation();

  const [monthlyWage, setMonthlyWage] = useState<number>(0.0);

  const [wageInterval, setWageInterval] = useState<WageInterval>(
    WageInterval.Hourly
  );

  const [cantonMinimumMonthly, setCantonMinimumMonthly] = useState<
    number | null
  >(null);

  const [hourlyWageValues, setHourlyWageValues] = useState<HourlyWageValues>({
    baseSalary: 0,
    holidayCompensation: 0,
    publicHolidayCompensation: 0,
    shareThirteenthSalary: 0,
    grossSalary: 0,
    hoursPerWeek: 0,
    holidayCompensationPercentage: 0,
    publicHolidayCompensationPercentage: 0,
    shareThirteenthSalaryPercentage: 0,
    annualVacationDays: 0,
  });

  useEffect(() => {
    const getMinimumWageData = async () => {
      const guessedCanton = getCantonByInput(formData.location);

      if (guessedCanton) {
        const cantonMinimum = await getMinimumWageByCanton(guessedCanton);
        setCantonMinimumMonthly(cantonMinimum);
      }
    };
    void getMinimumWageData();
  }, [formData]);

  //   calculate the minimum wage based on the job description, birth date and the canton minimum wage
  useEffect(() => {
    const wage = calculateMinimumWage({
      jobMinimumWage: formData.position.baseSalary,
      cantonMinimumWage: cantonMinimumMonthly ?? 0,
      birthDate: new Date(formData.birthDate),
    });
    setMonthlyWage(wage);
    const hoursPerWeek = 42;

    const hourlyWageValues: HourlyWageValues = calculateHourlyWage({
      monthlyWage: wage,
      hoursPerWeek,
    });

    setHourlyWageValues(hourlyWageValues);
  }, [formData, cantonMinimumMonthly]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ToggleButtonGroup
        value={wageInterval}
        color="primary"
        exclusive
        onChange={(_event, newValue: WageInterval) => {
          setWageInterval(newValue);
        }}
        sx={{
          marginBottom: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ToggleButton
          value={WageInterval.Hourly}
          selected={wageInterval === WageInterval.Hourly}
          onClick={() => {
            setWageInterval(WageInterval.Hourly);
          }}
        >
          {t("HOUR")}
        </ToggleButton>
        <ToggleButton
          value={WageInterval.Monthly}
          selected={wageInterval === WageInterval.Monthly}
          onClick={() => {
            setWageInterval(WageInterval.Monthly);
          }}
        >
          {t("MONTH")}
        </ToggleButton>
      </ToggleButtonGroup>

      <Box
        sx={{
          padding: 2,
        }}
      >
        <Box
          sx={{
            textAlign: "right",
            color: "text.secondary",
          }}
        >
          <Typography variant="body2">{t("CURRENCY_HINT")}</Typography>
        </Box>
        {wageInterval === WageInterval.Hourly ? (
          <HourlyList
            baseSalary={hourlyWageValues.baseSalary}
            holidayCompensation={hourlyWageValues.holidayCompensation}
            publicHolidayCompensation={
              hourlyWageValues.publicHolidayCompensation
            }
            shareThirteenthSalary={hourlyWageValues.shareThirteenthSalary}
            grossSalary={hourlyWageValues.grossSalary}
            holidayCompensationPercentage={
              hourlyWageValues.holidayCompensationPercentage
            }
            publicHolidayCompensationPercentage={
              hourlyWageValues.publicHolidayCompensationPercentage
            }
            shareThirteenthSalaryPercentage={
              hourlyWageValues.shareThirteenthSalaryPercentage
            }
          />
        ) : (
          <MonthlyList monthlyWage={monthlyWage} />
        )}
      </Box>

      <Box
        sx={{
          paddingY: 4,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{
            marginTop: 2,
            width: "100%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={() => {
            onRestart();
          }}
        >
          {t("NEW_SIMULATION")}
        </Button>
      </Box>
    </Box>
  );
};

export { WageOverview };
