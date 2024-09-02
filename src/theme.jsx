import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#190000", // Din primærfarge
    },
    secondary: {
      main: "#dc004e", // Din sekundærfarge
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
