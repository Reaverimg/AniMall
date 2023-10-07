import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useEffect } from "react";

LoginForm.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  //onSubmit: PropTypes.func.isRequired,
};

const theme = createTheme();

function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);

  const [response, setResponse] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please enter your username")
        .email("Invalid email (ABC@gmail.com)"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: async (values) => {
      setFormData(values);
      // console.log("Login form submitted with values:", values);
    },
  });

  // fetch api login
  useEffect(() => {
    const postLogin = async () => {
      try {
        const response = await fetch(
          "http://animall-400708.et.r.appspot.com/api/v1/accounts/login",
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
          console.log("Login successful:", data);
          localStorage.setItem("ACCOUNT__LOGGED", JSON.stringify(data.data));
          enqueueSnackbar("Login successful", { variant: "success" });
          // Handle successful login, such as setting authentication state
        } else {
          console.error("Login failed");
          // Handle failed login, show error message, etc.
        }
      } catch (error) {
        // console.error("Error during login:", error);
        enqueueSnackbar(error.message, { variant: "error" });
        // Handle error, show error message, etc.
      }
    };
    postLogin();
  }, []);

  const handleLoginSubmit = (event) => {
    // event.preventDefault();
  };

  return (
    <Box>
      {/* Title form */}
      <Typography
        style={{ margin: theme.spacing(2, 0, 3, 0), textAlign: "center" }}
        component="h3"
        variant="h5"
      >
        Sign In
      </Typography>

      {/* Login Form */}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          //helperText="Please enter your email"
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleLoginSubmit()}
        >
          Sign in
        </Button>
      </form>
    </Box>
  );
}

export default LoginForm;
