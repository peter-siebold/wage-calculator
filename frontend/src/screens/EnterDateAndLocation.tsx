import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { subMonths } from "date-fns";
import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormValues } from "../@types/FormValues";
import { useApplicationContext } from "../contexts/ApplicationContextProvider";

import type { FunctionComponent } from "react";

const EnterDateAndLocation: FunctionComponent = () => {
  const { dateFormat } = useApplicationContext();
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();
  const { t } = useTranslation();
  const today = new Date();
  const minDate = subMonths(today, 1);

  return (
    <>
      <Box>
        <Typography variant="body1" gutterBottom>
          1. {t("DATE_AND_LOCATION")}
        </Typography>

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
            name="startDate"
            defaultValue=""
            rules={{ required: "Date is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <MobileDatePicker
                label={t("START_DATE")}
                format={dateFormat}
                value={value ? new Date(value) : null}
                onChange={(event) => {
                  onChange(event);
                }}
                minDate={minDate}
                slotProps={{
                  textField: {
                    error: !!error,
                    helperText: errors.startDate?.message,
                    InputProps: {
                      endAdornment: (
                        <Box
                          data-testid="start-date"
                          sx={{
                            fontSize: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: grey[600],
                          }}
                        >
                          <CalendarMonthIcon
                            sx={{
                              fontSize: "1rem",
                            }}
                          />
                        </Box>
                      ),
                    },
                  },
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="location"
            defaultValue=""
            rules={{
              required: "Location is required",
              minLength: {
                value: 3,
                message: "Location must be at least 3 characters",
              },
            }}
            // TODO check if error is needed
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label={t("LOCATION")}
                variant="outlined"
                required
                fullWidth
                margin="normal"
                // error={!!error}
                // helperText={error ? error.message : ""}
                error={!!errors.location}
                helperText={errors.location?.message ?? ""}
              />
            )}
          />
        </Box>
      </Box>
    </>
  );
};

export { EnterDateAndLocation };
