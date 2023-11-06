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
import { useSnackbar } from "notistack";
import { default as React, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import LoginForm from "../../features/Auth/forms/LoginForm";
import RegisterForm from "../../features/Auth/forms/RegisterForm";
import TrainerHeader from "../../features/Trainer/components/header";
import StaffHeader from "../../features/Staff/components/header";
import AdminHeader from "../../features/Admin/components/header";
import { Link } from "react-router-dom";
import SideBar from "../sidebar";

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
  let localStorageValue = localStorage.getItem("ACCOUNT__LOGGED");

  //get RoleId user
  const [roleId, setRoleId] = useState({
    ...JSON.parse(localStorageValue),
  });

  //state navbar
  const [navbar, setNavbar] = useState(<></>);

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

  //Open menu account
  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleLoggedAccount = () => {
    localStorage.removeItem("ACCOUNT__LOGGED");
    handleCloseMenu();
    history.push("/");
    setAccountLogged(localStorage.getItem("ACCOUNT__LOGGED"));
    // localStorageValue = null;
    setRoleId(null);
    enqueueSnackbar("Sign out successfully", {
      variant: "success",
      anchorOrigin: {
        horizontal: "right",
        vertical: "top",
      },
    });
  };

  const setRoleIDWhenSignIn = () => {
    localStorageValue = localStorage.getItem("ACCOUNT__LOGGED");
    setRoleId(JSON.parse(localStorageValue));
  };

  useEffect(() => {
    if (localStorageValue) {
      const parsedAccountLogged = JSON.parse(localStorageValue);
      setAccountLogged(parsedAccountLogged);
    }
  }, [localStorageValue]);

  //Check navabar Role
  useEffect(() => {
    const renderNavbar = () => {
      if (roleId && roleId.role && roleId.role.id) {
        switch (roleId.role.id) {
          case 1:
            return <AdminHeader loggout={handleLoggedAccount}></AdminHeader>;
          case 2:
            return <StaffHeader loggout={handleLoggedAccount}></StaffHeader>;
          case 3:
            return (
              <TrainerHeader loggout={handleLoggedAccount}></TrainerHeader>
            );
          default:
            return (
              <AppBar position="static">
                <Toolbar>
                  {/* <Box color="inherit">
                    <SideBar></SideBar>
                  </Box> */}

                  <Button color="inherit">
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/"
                      activeClassName="active"
                    >
                      Home
                    </NavLink>
                  </Button>

                  <Button color="inherit">
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/"
                      activeClassName="active"
                    >
                      News
                    </NavLink>
                  </Button>

                  <Button color="inherit">
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/buyTicket"
                      activeClassName="active"
                    >
                      Buy Ticket
                    </NavLink>
                  </Button>

                  <Button color="inherit">
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/"
                      activeClassName="active"
                    >
                      About Us
                    </NavLink>
                  </Button>

                  <Button color="inherit">
                    <NavLink
                      style={{ color: "white", textDecoration: "none" }}
                      to="/"
                      activeClassName="active"
                    >
                      Contact
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
      } else {
        return (
          <AppBar position="static">
            <Toolbar>
              {/* <Box color="inherit">
                <SideBar></SideBar>
              </Box> */}

              <Button color="inherit">
                <NavLink
                  style={{ color: "white", textDecoration: "none" }}
                  to="/"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </Button>

              <Button color="inherit">
                <NavLink
                  style={{ color: "white", textDecoration: "none" }}
                  to="/news"
                  activeClassName="active"
                >
                  News
                </NavLink>
              </Button>

              <Button color="inherit">
                <NavLink
                  style={{ color: "white", textDecoration: "none" }}
                  to="/buyTicket"
                  activeClassName="active"
                >
                  Buy Ticket
                </NavLink>
              </Button>

              <Button color="inherit">
                <NavLink
                  style={{ color: "white", textDecoration: "none" }}
                  to="/"
                  activeClassName="active"
                >
                  About Us
                </NavLink>
              </Button>

              <Button color="inherit">
                <NavLink
                  style={{ color: "white", textDecoration: "none" }}
                  to="/"
                  activeClassName="active"
                >
                  Contact
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
    setNavbar(renderNavbar());
  }, [accountLogged, roleId]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        {/* Navbar */}
        {navbar}
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
                <LoginForm
                  closeDialog={handleClose}
                  onSignIn={setRoleIDWhenSignIn}
                ></LoginForm>
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
