interface Values {
  jobMinimumWage: number;
  cantonMinimumWage: number;
  birthDate: Date;
}

export const calculateMinimumWage = (values: Values): number => {
  const { jobMinimumWage, cantonMinimumWage, birthDate } = values;
  const age = new Date().getFullYear() - birthDate.getFullYear();
  let wage = jobMinimumWage;
  if (age < 18) {
    wage *= 1.1;
  } else if (age > 60) {
    wage *= 1.2;
  }

  if (wage < cantonMinimumWage) {
    wage = cantonMinimumWage;
  }

  return parseFloat(wage.toFixed(2));
};
export interface HourlyWageParams {
  monthlyWage: number;
  hoursPerWeek: number;
  annualVacationDays?: number;
}
export interface HourlyWageValues {
  baseSalary: number;
  holidayCompensation: number;
  publicHolidayCompensation: number;
  shareThirteenthSalary: number;
  grossSalary: number;
  hoursPerWeek: number;
  holidayCompensationPercentage: number;
  publicHolidayCompensationPercentage: number;
  shareThirteenthSalaryPercentage: number;
  annualVacationDays: number;
}
export const calculateHourlyWage = ({
  monthlyWage,
  hoursPerWeek = 42,
  annualVacationDays = 25,
}: HourlyWageParams): HourlyWageValues => {
  const hoursPerMonth = hoursPerWeek * 4.33;

  const baseSalary = parseFloat((monthlyWage / hoursPerMonth).toFixed(2));

  const publicHolidayCompensationPercentage = 0.0317;
  const shareThirteenthSalaryPercentage = 0.0833;

  let holidayCompensationPercentage = 0.0833;

  if (annualVacationDays <= 20 && annualVacationDays < 25) {
    holidayCompensationPercentage = 0.0833;
  } else if (annualVacationDays >= 25 && annualVacationDays < 30) {
    holidayCompensationPercentage = 0.1064;
  } else if (annualVacationDays >= 30) {
    holidayCompensationPercentage = 0.1304;
  }

  const holidayCompensation = parseFloat(
    (baseSalary * holidayCompensationPercentage).toFixed(2)
  );

  const publicHolidayCompensation = parseFloat(
    (baseSalary * publicHolidayCompensationPercentage).toFixed(2)
  );

  const shareThirteenthSalary = parseFloat(
    (baseSalary * shareThirteenthSalaryPercentage).toFixed(2)
  );

  const grossSalary = parseFloat(
    (
      baseSalary +
      holidayCompensation +
      publicHolidayCompensation +
      shareThirteenthSalary
    ).toFixed(2)
  );

  return {
    baseSalary,
    holidayCompensation,
    publicHolidayCompensation,
    shareThirteenthSalary,
    grossSalary,
    hoursPerWeek,
    holidayCompensationPercentage: parseFloat(
      (holidayCompensationPercentage * 100).toFixed(2)
    ),
    publicHolidayCompensationPercentage: parseFloat(
      (publicHolidayCompensationPercentage * 100).toFixed(2)
    ),
    shareThirteenthSalaryPercentage: parseFloat(
      (shareThirteenthSalaryPercentage * 100).toFixed(2)
    ),
    annualVacationDays,
  };
};
