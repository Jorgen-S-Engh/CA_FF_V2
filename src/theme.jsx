import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#190000",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {},
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

export default theme;
