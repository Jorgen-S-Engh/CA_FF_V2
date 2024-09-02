import React from "react";
import { Outlet, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/material";
import { cartStore } from "../cartStore";

function Layout() {
  const cartItemCount = cartStore((state) => state.cartItemCount());
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <Box>
          <Link to="/">
            <HomeIcon sx={{ fontSize: 45, color: "#000080" }} />
          </Link>
        </Box>
        <div
          style={{
            marginLeft: "auto",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link to="/checkout">
              <ShoppingBagIcon
                color="blue"
                sx={{ fontSize: 40, color: "#000080" }}
              />
            </Link>

            {cartItemCount > 0 ? (
              <Box
                sx={{
                  position: "absolute",
                  top: "25px",
                  left: "15px",
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
            ) : (
              ""
            )}
          </Box>
        </div>
      </Box>
      <Outlet />
    </>
  );
}

export default Layout;
