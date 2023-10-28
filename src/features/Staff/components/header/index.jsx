import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, IconButton, MenuItem, Toolbar } from "@mui/material";
// import DialogContent from "@mui/material/DialogContent";
import Menu from "@mui/material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { default as React, useState } from "react";
import StaffSideBar from "../sidebar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#435334",
      contrastText: "#fff",
    },
  },
});

StaffHeader.propTypes = {
  loggout: PropTypes.func.isRequired,
};

function StaffHeader({ loggout }) {
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
              <StaffSideBar></StaffSideBar>
            </Box>

            {accountLogged != null && (
              <IconButton
                style={{ color: "white", textDecoration: "none" }}
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
          {/* <MenuItem onClick={handleCloseMenu}>MY ACCOUNT</MenuItem> */}
          <MenuItem onClick={loggout}>SIGN OUT</MenuItem>
        </Menu>
      </Box>
    </ThemeProvider>
  );
}

export default StaffHeader;
