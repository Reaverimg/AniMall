import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Modal, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useHistory } from 'react-router-dom';
import { useParams, useLocation } from "react-router-dom";
import "../styles/ResetPassFormStyle.css";
import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

function ResetPassForm() {
  const [accounts, setAccounts] = useState([]);

  const history = useHistory();
  const { token } = useParams();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  useEffect(() => {
    const apiUrl = 'http://animall-400708.et.r.appspot.com/api/v1/accounts';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        console.log("accountlist", result.data);
        setAccounts(result.data);
      })
      .catch((error) => {
        console.error('There was a problem with the API request:', error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPass: ""

    },
    validationSchema: yup.object({
      password: yup
        .string()
        .min(6, 'Password must be 6 characters or more in length')
        .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least 1 lowercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 special letter')
        .required('Please enter password!'),
      confirmPass: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Confirm password must match with new password')
        .required('Please confirm password!'),

    }),
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const handleSubmit = async (values) => {
    // neu khong dang nhap => gọi API đăng ký guest
    const apiData = {
      email: values.password,
      newPassword: values.password,
      resetToken: token
    };

    let json = {
      method: 'POST',
      body: JSON.stringify(apiData),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    }
    const response = await fetch(`https://animall-400708.et.r.appspot.com/api/v1/accounts/password/confirm`, json)
      .then((res) => res.json())
      .catch((error) => { console.log(error) })
    console.log(response)
    if (response.message == "OPERATION SUCCESSFUL") {
      history.push(`/buyTicket`);
    }
    else {
      console.log(response.message)
    }

  }


  return (
    <>
      <div className="resetPassForm mx-auto p-4 my-5">
        <Typography variant="h5" className="text-center mt-3 font-weight-bold"  >
          Reset Password
        </Typography>
        <form onSubmit={formik.handleSubmit}>

          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="password" fullWidth
              label="New Password *"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              variant="standard"
              type={showPassword ? 'text' : 'password'}
              color="success"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end" >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>


          {formik.touched.password && formik.errors.password ? (
            <Typography variant="caption" color="red" >
              {formik.errors.password}
            </Typography>
          ) : null}
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField fullWidth
              id="confirmPass"
              label="Confirm Password *"
              name="confirmPass"
              value={formik.values.confirmPass}
              onChange={formik.handleChange}
              className="mt-3"
              variant="standard"
              type={showPassword ? 'text' : 'password'}
              color="success"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end" >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>


          {formik.touched.confirmPass && formik.errors.confirmPass ? (
            <Typography variant="caption" color="red">
              {formik.errors.confirmPass}
            </Typography>
          ) : null}

          <div className="passRequirement mt-4">
            <p className="mb-1" >
              * Password must be 6 characters or more in length
            </p>
            <p className="mb-1" >
              * Password must contain at least 1 uppercase letter
            </p>
            <p className="mb-1" >
              * Password must contain at least 1 lowercase letter
            </p>
            <p className="mb-1" >
              * Password must contain at least 1 special letter
            </p>

          </div>


          <div className=" mt-4  text-center">
            <Button variant="contained" type="submit" className="btn-confirm">
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}


export default ResetPassForm;