import { createTheme } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#6c9a3c",
    },
    secondary: {
      main: "#777b7b",
      light: "#b5bdbf",
    },
    background: {
      default: "#efefef",
      paper: "#e0e0e0",
    },
  },
};
export const getTheme = () => {
  return createTheme(themeOptions);
};
