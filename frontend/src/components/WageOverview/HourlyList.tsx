import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";

import type { FunctionComponent } from "react";

interface HourlyListProps {
  baseSalary: number;
  holidayCompensation: number;
  publicHolidayCompensation: number;
  shareThirteenthSalary: number;
  grossSalary: number;
  holidayCompensationPercentage: number;
  publicHolidayCompensationPercentage: number;
  shareThirteenthSalaryPercentage: number;
}

const HourlyList: FunctionComponent<HourlyListProps> = ({
  baseSalary,
  holidayCompensation,
  publicHolidayCompensation,
  shareThirteenthSalary,
  grossSalary,
  holidayCompensationPercentage,
  publicHolidayCompensationPercentage,
  shareThirteenthSalaryPercentage,
}) => {
  const { t } = useTranslation();
  return (
    <List data-testid="hourly-list">
      <ListItem data-testid="base-salary">
        <ListItemText>
          <strong>{t("BASE_SALARY")}:</strong>{" "}
        </ListItemText>
        <ListItemText
          sx={{
            textAlign: "right",
          }}
        >
          {baseSalary.toFixed(2)}
        </ListItemText>
      </ListItem>
      <Divider component="li" aria-hidden="true" />
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ListItemText
          secondary={`${holidayCompensationPercentage.toFixed(2)}%`}
        >
          <strong>{t("HOLIDAY_COMPENSATION")}</strong>
        </ListItemText>
        <ListItemText
          sx={{
            textAlign: "right",
          }}
        >
          {holidayCompensation.toFixed(2)}
        </ListItemText>
      </ListItem>
      <Divider component="li" aria-hidden="true" />
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ListItemText
          secondary={`${publicHolidayCompensationPercentage.toFixed(2)}%`}
        >
          <strong>{t("PUBLIC_HOLIDAY_COMPENSATION")}</strong>
        </ListItemText>
        <ListItemText
          sx={{
            textAlign: "right",
          }}
        >
          {publicHolidayCompensation.toFixed(2)}
        </ListItemText>
      </ListItem>
      <Divider component="li" aria-hidden="true" />
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ListItemText
          secondary={`${shareThirteenthSalaryPercentage.toFixed(2)}%`}
        >
          <strong>{t("SHARE_OF_13TH_MONTH_SALARY")}</strong>
        </ListItemText>
        <ListItemText
          sx={{
            textAlign: "right",
          }}
        >
          {shareThirteenthSalary.toFixed(2)}
        </ListItemText>
      </ListItem>
      <Divider component="li" aria-hidden="true" />
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ListItemText>
          <strong>{t("GROSS_SALARY")}</strong>
        </ListItemText>
        <ListItemText
          sx={{
            textAlign: "right",
          }}
        >
          {grossSalary.toFixed(2)}
        </ListItemText>
      </ListItem>
      <Divider component="li" aria-hidden="true" />
    </List>
  );
};
export { HourlyList };
