import {
  AppBar,
  Box,
  Button,
  DialogActions,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Menu from "@mui/material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { default as React, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import SideBar from "../sidebar";
import { AccountCircle, Close } from "@mui/icons-material";
import LoginForm from "../../features/Auth/forms/LoginForm";
import RegisterForm from "../../features/Auth/forms/RegisterForm";

const theme = createTheme({
  palette: {
    primary: {
      main: "#435334",
      contrastText: "#fff",
    },
  },
});

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};

Header.propTypes = {};
function Header(props) {
  //state login/register MODE
  const [mode, setMode] = useState(MODE.LOGIN);

  //state login/register dialog
  const [open, setOpen] = useState(false);

  //state menu account
  const [anchorEl, setAnchorEl] = useState(null);

  // const [loggedInUser, setLoggedInUser] = useState({});

  // const isLoggedIn = !!loggedInUser.id;

  //Open login/register dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Close login/register dialog
  const handleClose = () => {
    console.log('close');
    setOpen(false);
  };

  //close menu account
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //open menu accoun
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleLoggedAccount = (account) => {
    console.log("Account Logged in :", account);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit">
              <Box color="inherit">
                <SideBar></SideBar>
              </Box>
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
            <Button color="inherit" onClick={handleClickOpen}>
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to="/"
                activeClassName="active"
              >
                Log in
              </NavLink>
            </Button>
            {/* {!isLoggedIn && (
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to="/"
              >
                <Button color="inherit" onClick={handleClickOpen}>
                  Login
                </Button>
              </NavLink>
            )}
            {isLoggedIn && (
              <IconButton style={{ color: "white", textDecoration: "none" }}>
                <AccountCircle
                  color="inherit"
                  onClick={handleUserClick}
                ></AccountCircle>
              </IconButton>
            )} */}
          </Toolbar>
        </AppBar>

        {/* Menu profile */}
        {/* <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
          <MenuItem onClick={handleLoggedAccount}>Logout</MenuItem>
        </Menu> */}

        {/* Dialog login registrer */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        // aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
        >
          <IconButton
            style={{
              position: "absolute",
              top: theme.spacing(1),
              right: theme.spacing(3),
              color: theme.palette.grey[500],
              zIndex: 1,
            }}
            onClick={handleClose}
          >
            <Close></Close>
          </IconButton>

          <DialogContent>
            {mode === MODE.REGISTER && (
              <>
                <RegisterForm closeDialog={handleClose}></RegisterForm>
                <Box style={{ margin: "0 auto" }}>
                  <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                    Already have account, LOG IN here
                  </Button>
                </Box>
              </>
            )}
            {mode === MODE.LOGIN && (
              <>
                <LoginForm closeDialog={handleClose}></LoginForm>
                <Box style={{ margin: "0 auto" }}>
                  <Button
                    color="primary"
                    onClick={() => setMode(MODE.REGISTER)}
                  >
                    Don't have an account, REGISTER here
                  </Button>
                </Box>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Sign in
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default Header;
