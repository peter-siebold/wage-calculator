import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  IconButton,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { differenceInYears, format } from "date-fns";
import { useTranslation } from "react-i18next";

import { useApplicationContext } from "../contexts/ApplicationContextProvider";
import { useWizardContext } from "../contexts/WizardContextProvider";

import type { FunctionComponent } from "react";

const SelectedCandidateSummary: FunctionComponent = () => {
  const { dateFormat } = useApplicationContext();
  const { formData, goToStep } = useWizardContext();
  const { t } = useTranslation();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {format(new Date(formData.birthDate), dateFormat)} (
        {differenceInYears(new Date(), formData.birthDate)})
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => {
                  goToStep(1);
                }}
              >
                <EditIcon />
              </IconButton>
            }
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography variant="body1" gutterBottom>
                Start Date: {format(new Date(formData.startDate), dateFormat)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" gutterBottom>
                Location: {formData.location}
              </Typography>
            </Box>
          </ListItem>
          <Divider />
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => {
                  goToStep(2);
                }}
              >
                <EditIcon />
              </IconButton>
            }
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body1" gutterBottom>
              {t("BIRTH_DATE")}:{" "}
              {format(new Date(formData.birthDate), dateFormat)} (
              {differenceInYears(new Date(), formData.birthDate)} {t("YEARS")})
            </Typography>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export { SelectedCandidateSummary };
