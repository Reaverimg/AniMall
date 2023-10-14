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

TrainerHeader.propTypes = {};
function TrainerHeader({ loggout }) {
  //history
  const history = useHistory();

  //state login/register MODE
  const [mode, setMode] = useState(MODE.LOGIN);

  //state login/register dialog
  const [open, setOpen] = useState(false);

  //state menu account
  const [anchorEl, setAnchorEl] = useState(null);

  //getItem localStorage
  const localStorageValue = localStorage.getItem("ACCOUNT__LOGGED");

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

  const handleLoggedAccount= () => {
    if (loggout) {
      loggout();
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
              <TrainerSideBar></TrainerSideBar>
            </Box>

            {/* {accountLogged == null && (
              <NavLink
                style={{ color: "white", textDecoration: "none" }}
                to="/"
              >
                <Button color="inherit" onClick={handleClickOpen}>
                  Sign in
                </Button>
              </NavLink>
            )} */}
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
          <MenuItem onClick={handleCloseMenu}>MY ACCOUNT</MenuItem>
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

          {/* <DialogContent>
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
          </DialogContent> */}
          {/* <DialogActions>s
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

export default TrainerHeader;
