import React, { useState, useEffect } from "react";
import { Form } from 'antd';
import {
    Button,
    TextField,
    Typography,
    createTheme,
    Snackbar,
    Alert
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const theme = createTheme({
    palette: {
        primary: {
            main: "#435334",
            contrastText: "#fff",
        },
    },
});


function UpdateProfileForm({ onClose }) {

    const [loginedUser, setLoginedUser] = useState({});


    useEffect(() => {
        const localStorageValue = localStorage.getItem("ACCOUNT__LOGGED");
        if (localStorageValue) {
            const parsedAccountLogged = JSON.parse(localStorageValue);
            setLoginedUser(parsedAccountLogged);

            
        formik.setValues({
            name: parsedAccountLogged.name,
            email: parsedAccountLogged.email,
            phoneNumber: parsedAccountLogged.phoneNumber,
        });
        }
    }, []);

    const [form] = Form.useForm();

    //snackbar state
    const [snackopen, setSnackOpen] = React.useState(false);

    //formik to validate
    const phoneRegExp = /^[0-9]{10,15}$/;
    const formik = useFormik({
        initialValues: {
            name: loginedUser.name,
            email: loginedUser.email,
            phoneNumber: loginedUser.phoneNumber,

        },

        validationSchema: yup.object({
            name: yup
                .string()
                .required("Please enter your name!")
                .trim()
                .min(2, "Name too short!"),
            email: yup
                .string()
                .required("Please enter your email!")
                .email("Invalid email! Email should have format: (ABC@gmail.com)."),
            phoneNumber: yup
                .string()
                .required("Please enter your phone number!")
                .matches(phoneRegExp, "Phone number is not valid!")
                .min(10, "Phone number must have at least 10 character!"),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        }

    });

    //handle submit form
    const handleSubmit = async (values) => {
        const apiData = {
            name: values.name,
            phoneNumber: values.phoneNumber,
            email: values.email,
            idAccount: loginedUser.idAccount,
            status: loginedUser.status,
            roleId: loginedUser.role.id,
            status: true
        };

        let json = {
            method: 'PUT',
            body: JSON.stringify(apiData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        }
        const response = await fetch(`http://animall-400708.et.r.appspot.com/api/v1/accounts`, json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        console.log(response)
        if (response.message == "OPERATION SUCCESSFUL") {
            console.log("Success!")
            setSnackOpen(true);
            const updatedUser = {idAccount: response.data.idAccount ,name : response.data.name, email: response.data.email, phoneNumber :  response.data.phoneNumber};
            localStorage.setItem("ACCOUNT__LOGGED", JSON.stringify(updatedUser));
        }
        else {

            console.log("UnSuccess!")
        }
    };

    //handle close snakebar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
      };

      const handleButtonCancel = () => {
       
        onClose();
      };
    


    return (
        <>
            <div
                className="pxs-5 mx-auto "
                id="updateForm">

                <Typography
                    style={{ margin: theme.spacing(2, 0, 3, 0), textAlign: "center" }}
                    component="h3"
                    variant="h5"
                >
                    Update User Profile
                </Typography>


                <form onSubmit={formik.handleSubmit}>

                    <TextField
                        fullWidth
                        margin="normal"
                        id="name"
                        label="Full name"
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
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        type="phone"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                    />

                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <Typography variant="caption" color="red">
                            {formik.errors.phoneNumber}
                        </Typography>
                    ) : null}


                    <div className="text-center mt-4">
                        <Button
                            type="primary"
                            className="mx-3"
                            size="large"
                            id="btnUpdate"
                            style={
                                {
                                    backgroundColor: theme.palette.primary.main,
                                    color: '#ffffff'
                                }
                            }
                        >
                            Update
                        </Button>
                        <Snackbar open={snackopen} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Update user profile successfully.
                            </Alert>
                        </Snackbar>
                        

                        <Button
                            className="mx-3"
                            size="large"
                            id="btnCancel"
                            onClick={handleButtonCancel}
                            style={
                                {
                                    color: "black",
                                    border: "black solid 1px"
                                }
                            }
                        >
                            Cancel
                        </Button>
                    </div>

                </form>

            </div>
        </>
    );
}



export default UpdateProfileForm;