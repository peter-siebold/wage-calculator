import { it, describe, expect } from "vitest";

import {
  calculateHourlyWage,
  calculateMinimumWage,
  HourlyWageParams,
  HourlyWageValues,
} from "./calculateMinimumWage";

interface TestData {
  testData: HourlyWageParams;
  expected: Partial<HourlyWageValues>;
}

describe("calculateHourlyWage", () => {
  const values: TestData[] = [
    {
      testData: {
        monthlyWage: 4500,
        hoursPerWeek: 42,
        annualVacationDays: 25,
      },
      expected: {
        baseSalary: 24.74,
        annualVacationDays: 25,
        holidayCompensation: 2.63,
        holidayCompensationPercentage: 10.64,
        hoursPerWeek: 42,
        publicHolidayCompensation: 0.78,
        publicHolidayCompensationPercentage: 3.17,
        shareThirteenthSalary: 2.06,
        shareThirteenthSalaryPercentage: 8.33,
        grossSalary: 30.21,
      },
    },
    {
      testData: {
        monthlyWage: 4500,
        hoursPerWeek: 42,
        annualVacationDays: 20,
      },
      expected: {
        baseSalary: 24.74,
        annualVacationDays: 20,
        holidayCompensation: 2.06,
        holidayCompensationPercentage: 8.33,
        hoursPerWeek: 42,
        publicHolidayCompensation: 0.78,
        publicHolidayCompensationPercentage: 3.17,
        shareThirteenthSalary: 2.06,
        shareThirteenthSalaryPercentage: 8.33,
        grossSalary: 29.64,
      },
    },
    {
      testData: {
        monthlyWage: 4500,
        hoursPerWeek: 42,
        annualVacationDays: 30,
      },
      expected: {
        baseSalary: 24.74,
        annualVacationDays: 30,
        holidayCompensation: 3.23,
        holidayCompensationPercentage: 13.04,
        hoursPerWeek: 42,
        publicHolidayCompensation: 0.78,
        publicHolidayCompensationPercentage: 3.17,
        shareThirteenthSalary: 2.06,
        shareThirteenthSalaryPercentage: 8.33,
        grossSalary: 30.81,
      },
    },
  ];
  it.each(values)(
    "should calculate the hourly wage for a %s hours per week job",
    ({ testData, expected }) => {
      expect(calculateHourlyWage(testData)).toEqual(expected);
    }
  );
});

describe("calculateMinimumWage", () => {
  it("should calculate the minimum wage for a job", () => {
    const jobMinimumWage = 4500;
    const cantonMinimumWage = 4000;
    const birthDate = new Date("1990-01-01");

    const expected = 4500;
    expect(
      calculateMinimumWage({
        jobMinimumWage,
        cantonMinimumWage,
        birthDate,
      })
    ).toBe(expected);
  });
});
