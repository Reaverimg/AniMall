import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    TextField,
    Typography,
    Grid,
    MenuItem,
} from "@mui/material";
import axios from "axios";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    roleId: Yup.number().required("Role is required"),
});

function RegisterForm({ setRegisterSuccess, fetchData, handleCloseCreateDialog }) {
    const [registerResult, setRegisterResult] = useState(null);
    const [roleId, setRoleId] = useState("");
    // const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            password: "",
            phoneNumber: "",
            roleId: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("http://animall-400708.et.r.appspot.com/api/v1/accounts/register",
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response) {
                    setRegisterResult("success");
                    setRegisterSuccess(true);
                    handleCloseCreateDialog();
                    fetchData();
                    setTimeout(() => {
                        setRegisterSuccess(false)
                        // Reload the page

                    }, 3000);
                } else {
                    setRegisterResult("error");
                }
            } catch (error) {
                setRegisterResult("error");
            }
        },
    });

    return (
        <div>
            
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>

                        {/* Field name */}
                        <Grid item xs={12}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && formik.errors.name}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>

                        {/* Field phoneNumber */}
                        <Grid item xs={12}>
                            <TextField
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                helperText={
                                    formik.touched.phoneNumber && formik.errors.phoneNumber
                                }
                            />
                        </Grid>

                        {/* Field password */}
                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && formik.errors.password}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>

                        {/* Field email */}
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && formik.errors.email}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>

                        {/* Field Role */}
                        <Grid item xs={12}>
                            <TextField
                                id="roleId"
                                name="roleId"
                                label="Role"
                                variant="outlined"
                                fullWidth
                                select
                                value={roleId}
                                onChange={(event) => {
                                    setRoleId(event.target.value);
                                    formik.setFieldValue("roleId", event.target.value);
                                }}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.roleId && formik.errors.roleId)} // Chuyển đổi thành boolean
                                helperText={formik.touched.roleId && formik.errors.roleId}
                            >
                                <MenuItem value="3">Trainer</MenuItem>
                            </TextField>
                        </Grid>
                        {/* Submut button */}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth>
                                Register
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            


            {registerResult === 'error' && (
                <Typography
                    variant="body1"
                    color="error">
                    Registration failed ( email existed !!)
                </Typography>
            )}
        </div>
    );
}

export default RegisterForm;