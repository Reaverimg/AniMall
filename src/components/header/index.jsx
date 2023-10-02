import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import SideBar from "../sidebar";

Header.propTypes = {};

function Header(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="white">
            <SideBar></SideBar>
          </Button>

          <Button color="inherit">
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              to="/"
              activeClassName="active"
            >
              Buyer
            </NavLink>
          </Button>

          <Button color="inherit">
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              to="/trainer"
              activeClassName="active"
            >
              Traniner
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              to="/staff"
              activeClassName="active"
            >
              Staff
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              to="/admin"
              activeClassName="active"
            >
              Admin
            </NavLink>
          </Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
