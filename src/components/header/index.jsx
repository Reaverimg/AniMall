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
import { Close } from "@mui/icons-material";
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
  const [mode, setMode] = useState(MODE.LOGIN);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log('close');
    setOpen(false);
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
          </Toolbar>
        </AppBar>

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
