import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";

LoginForm.propTypes = {};

const theme = createTheme();

function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    <div>
      <Typography
        style={{ margin: theme.spacing(2, 0, 3, 0), textAlign: "center" }}
        component="h3"
        variant="h5"
      >
        Sign In
      </Typography>

      <form>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          type="email"
          required
        />
        <OutlinedInput
          fullWidth
          margin="dense"
          label="password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        ></OutlinedInput>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "1rem" }}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
