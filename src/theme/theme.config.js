import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6347",
    },
    secondary: {
      main: "#3498DB",
    },
    background: {
      default: "#F5F5F5",
      paper: grey[50],
    },
    divider: "#101112",
  },
});
