import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Alert, Box, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { subYears } from "date-fns";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormValues } from "../@types/FormValues";
import { useApplicationContext } from "../contexts/ApplicationContextProvider";

import type { FunctionComponent } from "react";

const EnterBirthDate: FunctionComponent = () => {
  const { t } = useTranslation();
  const { dateFormat } = useApplicationContext();
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();
  const [showAgeInfo, setShowAgeInfo] = useState(false);

  const today = new Date();

  // an employee must be at least 16 years old
  const maxDate = subYears(today, 16);

  // an employee cannot be older than 75 years
  const minDate = subYears(today, 75);

  return (
    <>
      <Box
        sx={{
          marginBottom: 2,
        }}
      >
        <Typography variant="body1" gutterBottom>
          {t("CANDIDATE_BIRTH_DATE")}
        </Typography>
      </Box>
      <Box
        sx={{
          "& .MuiTextField-root": { marginY: 1 },
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Controller
          control={control}
          name="birthDate"
          defaultValue=""
          rules={{ required: "Birth date is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <MobileDatePicker
                label={t("BIRTH_DATE")}
                disableFuture={true}
                format={dateFormat}
                minDate={minDate}
                maxDate={maxDate}
                value={value ? new Date(value) : null}
                onChange={(event) => {
                  onChange(event);
                }}
                slotProps={{
                  textField: {
                    error: !!error,
                    helperText: errors.startDate?.message,
                    InputProps: {
                      endAdornment: (
                        <Box
                          sx={{
                            fontSize: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: grey[600],
                          }}
                        >
                          <CalendarMonthIcon
                            data-testid="birth-date"
                            sx={{
                              fontSize: "1rem",
                            }}
                          />
                          <IconButton
                            onClick={(e) => {
                              e.preventDefault();
                              setShowAgeInfo(!showAgeInfo);
                            }}
                          >
                            <InfoOutlinedIcon
                              sx={{
                                fontSize: "1.2rem",
                              }}
                            />
                          </IconButton>
                        </Box>
                      ),
                    },
                  },
                }}
              />

              {showAgeInfo && (
                <Alert
                  severity="info"
                  onClose={() => {
                    setShowAgeInfo(false);
                  }}
                >
                  {t("HINT_MINIMUM_WAGE")}
                </Alert>
              )}
            </>
          )}
        />
      </Box>
    </>
  );
};

export { EnterBirthDate };
