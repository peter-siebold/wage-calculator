import "./App.css";
import { GlobalStyles } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Fragment } from "react";

import { ApplicationContextProvider } from "./contexts/ApplicationContextProvider";
import { WizardContextProvider } from "./contexts/WizardContextProvider";
import { AppMain } from "./screens/AppMain";
import { getTheme } from "./theme/theme";

// If you are using date-fns v3.x, please import the v3 adapter

function App() {
  const theme = getTheme();
  return (
    <ApplicationContextProvider>
      <ThemeProvider theme={theme}>
        <WizardContextProvider>
          <CssBaseline />
          <Fragment>
            <GlobalStyles
              styles={{
                "*": {
                  fontFamily:
                    "system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
                },
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <AppMain />
            </LocalizationProvider>
          </Fragment>
        </WizardContextProvider>
      </ThemeProvider>
    </ApplicationContextProvider>
  );
}

export default App;
