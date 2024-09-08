import React from "react";
import { Outlet, Link } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Box } from "@mui/material";
import { cartStore } from "../cartStore";

function Layout() {
  const cartItemCount = cartStore((state) => state.cartItemCount());
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "20px",
        }}
      >
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Link to="/">
            <HomeRoundedIcon sx={{ fontSize: 45, color: "#113065" }} />
          </Link>
        </Box>

        <Box sx={{ position: "relative" }}>
          <Link to="/checkout">
            <ShoppingBagIcon sx={{ fontSize: 40, color: "#113065" }} />
          </Link>
          {cartItemCount > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: "0px",
                right: "-10px",
                bgcolor: "white",
                borderRadius: "50%",
                border: "solid 1px gray",
                textAlign: "center",
                width: "25px",
                fontWeight: "bold",
              }}
            >
              {cartItemCount}
            </Box>
          )}
        </Box>
      </Box>
      <Outlet />
    </>
  );
}

export default Layout;
