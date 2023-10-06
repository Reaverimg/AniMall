import { Box, Button, TextField, Typography, createTheme } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

LoginForm.propTypes = {};

const theme = createTheme();

function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

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
    onSubmit: (values) => {
      setFormData(values);
      console.log("Login form submitted with values:", values);
    },
  });

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
        // Handle successful login, such as setting authentication state
      } else {
        console.error("Login failed");
        // Handle failed login, show error message, etc.
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error, show error message, etc.
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   postLogin();
  // };

  return (
    <Box>
      <Typography
        style={{ margin: theme.spacing(2, 0, 3, 0), textAlign: "center" }}
        component="h3"
        variant="h5"
      >
        Sign In
      </Typography>

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
        >
          Sign in
        </Button>
      </form>
    </Box>
  );
}

export default LoginForm;
