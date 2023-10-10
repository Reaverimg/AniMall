import { Box, Button, TextField, Typography, createTheme } from "@mui/material";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";
import * as yup from "yup";
import { enqueueSnackbar, useSnackbar } from "notistack";
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
  // const [formData, setFormData] = useState({
  //   name: "",
  //   phone: "",
  //   email: "",
  //   password: "",
  //   roleId: 4,
  // });

  const registerAccount = {
    name: "",
    phone: "",
    email: "",
    password: "",
    roleId: 4,
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  const formik = useFormik({
    initialValues: {
      name: registerAccount.name,
      phone: registerAccount.phone,
      email: registerAccount.email,
      password: registerAccount.password,
      retypePassword: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Please enter your username")
        .min(3, "Name too short")
        .max(20, "Name too long"),
      phone: yup
        .string()
        .required("Please enter your phone number")
        .min(7, "Phone number too short")
        .max(13, "Phone number too long"),
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

    onSubmit: async (values) => {
      try {
        const newAccount = {
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
          roleId: 4,
        };

        const response = await fetch(
          "http://animall-400708.et.r.appspot.com/api/v1/accounts/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newAccount),
          }
        );

        if (response.ok) {
          const data = await response.json();
          enqueueSnackbar("Register Successfully", { variant: "success" });
          const logIn = async () => {
            try {
              const LoggedAccount = {
                email: data.email,
                password: data.password,
              };
              const response = await fetch(
                "http://animall-400708.et.r.appspot.com/api/v1/accounts/login",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(LoggedAccount),
                }
              );

              if (response.ok) {
                const data = await response.json();
                localStorage.setItem(
                  "ACCOUNT__LOGGED",
                  JSON.stringify(data.data)
                );
                enqueueSnackbar("Register successful", { variant: "success" });
              } else {
                console.error("Login failed");
              }
            } catch (error) {
              enqueueSnackbar(error.message, { variant: "error" });
            }
          };
          logIn();
          // console.log("Registration successful:", data);
        } else {
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    },
  });

  // const postRegister = async () => {
  //   try {
  //     const newAccount = {
  //       name: `${formik.values.name}`,
  //       phone: `${formik.values.phone}`,
  //       email: `${formik.values.email}`,
  //       password: `${formik.values.password}`,
  //       roleId: 4,
  //     };
  //     const response = await fetch(
  //       "http://animall-400708.et.r.appspot.com/api/v1/accounts/register",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(newAccount),
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Registration successful:", data);
  //       // Handle successful registration, such as redirecting to login page
  //     } else {
  //       console.error("Registration failed");
  //       // Handle failed registration, show error message, etc.
  //     }
  //   } catch (error) {
  //     console.error("Error during registration:", error);
  //     // Handle error, show error message, etc.
  //   }
  // };

  return (
    <Box>
      <Typography style={classes.title} component="h3" variant="h5">
        CREATE ACCOUNT
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
          id="phone"
          label="Phonenumber"
          name="phone"
          type="text"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <Typography variant="caption" color="red">
            {formik.errors.phone}
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
