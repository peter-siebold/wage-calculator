import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";

import type { FunctionComponent } from "react";

interface MonthlyListProps {
  monthlyWage: number;
}

const MonthlyList: FunctionComponent<MonthlyListProps> = ({ monthlyWage }) => {
  const { t } = useTranslation();
  return (
    <List data-testid="monthly-list">
      <ListItem>
        <ListItemText>
          <strong>{t("GROSS_SALARY")}:</strong>{" "}
        </ListItemText>
        <ListItemText
          sx={{
            textAlign: "right",
          }}
        >
          {monthlyWage.toFixed(2)}
        </ListItemText>
      </ListItem>
      <Divider component="li" aria-hidden="true" />
    </List>
  );
};
export { MonthlyList };
