import { Link } from "react-router-dom";
import { Box } from "@mui/material";

function Receipt() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Thanks for shopping</h1>
      <Link to="/">Return to Home</Link>
    </Box>
  );
}

export default Receipt;
