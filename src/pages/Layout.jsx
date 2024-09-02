import React from "react";
import { Outlet, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
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
          position: "sticky",
          top: "0px",
        }}
      >
        <nav>
          <ul
            style={{
              display: "flex",
              justifyContent: "start",
              gap: "16px",
              listStyle: "none",
            }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
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
              <ShoppingBagIcon color="navy" sx={{ fontSize: 45 }} />
            </Link>

            {cartItemCount > 0 ? (
              <Box
                sx={{
                  position: "absolute",
                  top: "25px",
                  bgcolor: "gray",
                  borderRadius: "50%",
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
