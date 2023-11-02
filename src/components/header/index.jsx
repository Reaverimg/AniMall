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
import DialogContent from "@mui/material/DialogContent";
import Menu from "@mui/material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { default as React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { Link } from 'react-router-dom';
import LoginForm from "../../features/Auth/forms/LoginForm";
import RegisterForm from "../../features/Auth/forms/RegisterForm";
import SideBar from "../sidebar";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import TrainerHeader from "../../features/Trainer/components/header";
import { useSnackbar } from "notistack";

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
  //history
  const history = useHistory();

  //snackbar
  const { enqueueSnackbar } = useSnackbar();

  //state login/register MODE
  const [mode, setMode] = useState(MODE.LOGIN);

  //state login/register dialog
  const [open, setOpen] = useState(false);

  //state menu account
  const [anchorEl, setAnchorEl] = useState(null);

  //getItem localStorage
  const localStorageValue = localStorage.getItem("ACCOUNT__LOGGED");

  //get RoleId user
  // const roleID = localStorageValue.roleId;
  const [roleId, setRoleId] = useState(1);

  //state login icon
  const [accountLogged, setAccountLogged] = useState(localStorageValue);

  //Open login/register dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Close login/register dialog
  const handleClose = () => {
    setOpen(false);
  };

  //Close menu account
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //Open menu accoun
  //Open menu account
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleLoggedAccount = () => {
    localStorage.removeItem("ACCOUNT__LOGGED");
    handleCloseMenu();
    history.push("/");
    setAccountLogged(localStorage.getItem("ACCOUNT__LOGGED"));
    enqueueSnackbar("Sign out successfully", {
      variant: "success",
      anchorOrigin: {
        horizontal: "right",
        vertical: "top",
      },
    });
  };

  useEffect(() => {
    if (localStorageValue) {
      const parsedAccountLogged = JSON.parse(localStorageValue);
      setAccountLogged(parsedAccountLogged);
    }
  }, [localStorageValue]);

  //Check navabar Role
  const renderNavbar = () => {
    switch (roleId) {
      case 1:
        return <TrainerHeader loggout={handleLoggedAccount}></TrainerHeader>;
      case 2:
        // <StaffHeader></StaffHeader>
        console.log(2);
        break;
      case 3:
        // <AdminHeader></AdminHeader>
        console.log(3);
        break;
      default:
        return (
          <AppBar position="static">
            <Toolbar>
              <Box color="inherit">
                <SideBar></SideBar>
              </Box>

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
                  to="/trainer/animalManage"
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
              {accountLogged == null && (
                <Button color="inherit" onClick={handleClickOpen}>
                  Sign In
                </Button>
              )}
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
        );
    }
  };

  useEffect(() => {
    if (localStorageValue) {
      const parsedAccountLogged = JSON.parse(localStorageValue);
      setAccountLogged(parsedAccountLogged);
    }
  }, [localStorageValue]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box color="inherit">
              <SideBar></SideBar>
            </Box>

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
                to="/trainer/newsmanage"
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

            {accountLogged == null && (
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to="/"
              >
                <Button color="inherit" onClick={handleClickOpen}>
                  Sign in
                </Button>
              </NavLink>
            )}
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

        {/* Navbar */}
        {renderNavbar()}
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
          <MenuItem component={Link} to="/user/profile">MY ACCOUNT</MenuItem>
          <MenuItem component={Link} to="/buyer/orderHistory"> MY ORDER HISTORY</MenuItem>
          <MenuItem onClick={handleLoggedAccount}>SIGN OUT</MenuItem>
        </Menu>

        {/* Dialog login registrer */}
        <Dialog
          open={open}
          // onClose={handleClose}
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
                <Box style={{ display: "flex" }} justifyContent="center">
                  <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                    Already have account, LOG IN here !
                  </Button>
                </Box>
              </>
            )}
            {mode === MODE.LOGIN && (
              <>
                <LoginForm closeDialog={handleClose}></LoginForm>
                <Box style={{ margin: "0 auto" }}>
                  <Button color="primary">Forgot password ?</Button>
                  <Typography align="center">━━━━ OR ━━━━</Typography>
                  <Box style={{ display: "flex" }} justifyContent="center">
                    <IconButton color="primary">
                      <GoogleIcon></GoogleIcon>
                    </IconButton>
                  </Box>
                  <Typography align="center">
                    ____________________________________________________________
                  </Typography>
                  <Box style={{ display: "flex" }} justifyContent="center">
                    <Button
                      color="primary"
                      onClick={() => setMode(MODE.REGISTER)}
                    >
                      Don't have an account, REGISTER here !
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </DialogContent>
          {/* <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Sign in
            </Button>
          </DialogActions> */}
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default Header;
