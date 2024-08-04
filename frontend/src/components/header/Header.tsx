import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";

import type { FunctionComponent } from "react";

interface HeaderProps {
  onClickLogo: () => void;
}

const Header: FunctionComponent<HeaderProps> = ({ onClickLogo }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" variant="elevation" color="default">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            {/* <Typography variant="h6" component="div"> */}
            <Button
              data-testid="header-logo"
              onClick={onClickLogo}
              variant="text"
              sx={{
                color: grey[800],
                fontSize: "1.2rem",
                textTransform: "none",
              }}
            >
              {t("WAGE_SIMULATOR")}
            </Button>
            {/* </Typography> */}
          </Box>
          <LanguageSwitch />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { Header };
