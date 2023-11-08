import { AccountCircle, Close } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
import Menu from "@mui/material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { default as React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import TrainerSideBar from "../../../Trainer/components/sidebar/index";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";

const theme = createTheme({
  palette: {
    primary: {
      main: "#435334",
      contrastText: "#fff",
    },
  },
});

TrainerHeader.propTypes = {
  loggout: PropTypes.func.isRequired,
};

function TrainerHeader({ loggout }) {
  //state menu account
  const [anchorEl, setAnchorEl] = useState(null);

  // //getItem localStorage
  // const localStorageValue = localStorage.getItem("ACCOUNT__LOGGED");

  //state login icon
  const [accountLogged, setAccountLogged] = useState(
    localStorage.getItem("ACCOUNT__LOGGED")
  );

  //Close menu account
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //Open menu account
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  // useEffect(() => {
  //   if (localStorageValue) {
  //     const parsedAccountLogged = JSON.parse(localStorageValue);
  //     setAccountLogged(parsedAccountLogged);
  //   }
  // }, [localStorageValue]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box color="inherit">
              <TrainerSideBar></TrainerSideBar>
            </Box>

            {accountLogged != null && (
              <IconButton
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginLeft: "auto",
                }}
                onClick={handleUserClick}
              >
                <AccountCircle color="inherit"></AccountCircle>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>

        {/* Menu profile */}
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleCloseMenu}>MY ACCOUNT</MenuItem>
          <MenuItem onClick={loggout}>SIGN OUT</MenuItem>
        </Menu>
      </Box>
    </ThemeProvider>
  );
}

export default TrainerHeader;
