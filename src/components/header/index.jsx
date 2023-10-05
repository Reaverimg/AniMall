import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import SideBar from "../sidebar";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#435334",
      contrastText: "#fff",
    },
  },
});

Header.propTypes = {};
function Header(props) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* Chưa đăng nhập */}
            {/* <Button color="inherit">
              <SideBar></SideBar>
            </Button> */}
            {/* <Button color="inherit">
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to="/"
                activeClassName="active"
              >
                Buyer
              </NavLink>
            </Button> */}

            {/* <Button color="inherit">
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to="/trainer/newsmanage"
                activeClassName="active"
              >
                Traniner
              </NavLink>
            </Button> */}
            {/* <Button color="inherit">
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to="/staff"
                activeClassName="active"
              >
                Staff
              </NavLink>
            </Button> */}
            {/* <Button color="inherit">
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to="/admin"
                activeClassName="active"
              >
                Admin
              </NavLink>
            </Button> */}
            <Button color="inherit">
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to="/"
                activeClassName="active"
              >
                Trang chủ
              </NavLink>
            </Button>
            <Button color="inherit">Đăng nhập</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Header;
