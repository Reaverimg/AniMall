import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

//theme
const theme = createTheme();

//class css
const classes = {
  root: {
    position: "relative",
    paddingTop: theme.spacing(4),
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: "center",
  },
  submit: {
    textAlign: "center",
    margin: theme.spacing(3, 0, 2, 0),
  },
  progress: {
    position: "absolute",
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
};

function RegisterForm(props) {
  //Validation
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required("Pls enter your full name")
      .test(
        "should has at least two words",
        "Please enter at least two words.",
        (value) => {
          return value.split("").length >= 2;
        }
      ),
    email: yup
      .string()
      .required("Pls enter your email")
      .email("Pls enter a valid email"),
    password: yup
      .string()
      .required("Pls enter your password")
      .min(6, "Ples enter at least 6 letters"),
    retypePassword: yup
      .string()
      .required("Pls retype your password")
      .oneOf([yup.ref("password")], "Password does not match"),
  });

  //defaultValue cua form
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });

  //Gui values cua form lên trên component cha
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    <div>
      <Typography style={classes.title} component="h3" variant="h5">
        Create Account
      </Typography>
      {/* <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Fullname" form={form}></InputField>
        <InputField name="email" label="Email" form={form}></InputField>
        <PasswordField
          name="password"
          label="Password"
          form={form}
        ></PasswordField>
        <PasswordField
          name="retypePassword"
          label="Retype Password"
          form={form}
        ></PasswordField>
        <Button
          type="submit"
          style={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Create an account
        </Button>
      </form> */}
      <form>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          type="email"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Retype Password"
          variant="outlined"
          type="password"
          required
        />
        {/* <OutlinedInput
            fullWidth
            label="password"
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
          ></OutlinedInput> */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "1rem" }}
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
