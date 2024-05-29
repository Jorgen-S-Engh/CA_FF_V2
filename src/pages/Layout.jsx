import React from "react";
import { Outlet, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Box } from "@mui/material";

function Layout() {
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
          <Avatar>
            <ShoppingBagIcon color="primary" />
            <Box
              sx={{
                color: " black",
                fontWeight: "bold",
              }}
            ></Box>
          </Avatar>
        </div>
      </Box>
      <Outlet />
    </>
  );
}

export default Layout;
