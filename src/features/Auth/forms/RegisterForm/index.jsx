import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
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
import * as yup from "yup";
import InputField from "../inputField";
import PasswordField from "../passwordField";
import { useFormik } from "formik";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Please enter your username")
        .min(3, "Name too short")
        .max(20, "Name too long"),
      email: yup
        .string()
        .required("Please enter your username")
        .email("Invalid email (ABC@gmail.com)"),
      password: yup
        .string()
        .required("Please enter your password")
        .min(3, "Password too short"),
      retypePassword: yup
        .string()
        .required("Please retype your password")
        .oneOf(
          [yup.ref("password")],
          "Retype password does not match password"
        ),
    }),
    onSubmit: (values) => {
      setFormData(values);
      console.log("Register form submitted with values:", values);
    },
  });

  const postRegister = async () => {
    try {
      const response = await fetch(
        "http://animall-400708.et.r.appspot.com/api/v1/accounts/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        // Handle successful registration, such as redirecting to login page
      } else {
        console.error("Registration failed");
        // Handle failed registration, show error message, etc.
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error, show error message, etc.
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   postRegister();
  // };

  return (
    <Box>
      <Typography style={classes.title} component="h3" variant="h5">
        Create Account
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="name"
          label="Fullname"
          name="name"
          type="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name ? (
          <Typography variant="caption" color="red">
            {formik.errors.name}
          </Typography>
        ) : null}

        <TextField
          fullWidth
          margin="normal"
          id="email"
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (
          <Typography variant="caption" color="red">
            {formik.errors.email}
          </Typography>
        ) : null}

        <TextField
          fullWidth
          margin="normal"
          //helperText="Please enter your email"
          id="password"
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password ? (
          <Typography variant="caption" color="red">
            {formik.errors.password}
          </Typography>
        ) : null}

        <TextField
          fullWidth
          margin="normal"
          //helperText="Please enter your email"
          id="retypePassword"
          label="Retype Password"
          name="retypePassword"
          type="password"
          value={formik.values.retypePassword}
          onChange={formik.handleChange}
        />
        {formik.touched.retypePassword && formik.errors.retypePassword ? (
          <Typography variant="caption" color="red">
            {formik.errors.retypePassword}
          </Typography>
        ) : null}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Sign up
        </Button>
      </form>
    </Box>
  );
}

export default RegisterForm;
