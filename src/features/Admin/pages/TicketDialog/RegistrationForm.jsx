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
    ticketName: Yup.string().required("Ticket name is required"),
    ticketPrice: Yup.number().required("PTicket price is required"),
    ticketType: Yup.string().required("Ticket type is require"),
});

function RegisterForm({ currentPage, setRegisterSuccess, fetchData, handleCloseCreateDialog }) {
    const [registerResult, setRegisterResult] = useState(null);
    const [ticketTypeId, setTicketTypeId] = useState("");

    const formik = useFormik({
        initialValues: {
            accountId: "7fd0b915-e235-4a06-bb25-25515581c6e6",
            ticketName: "",
            ticketPrice: "",
            ticketType: "",
            status: "true",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("https://animall-400708.et.r.appspot.com/api/v1/tickets/add", values);
                console.log(values)

                if (response) {
                    console.log(response)
                    setRegisterResult("success");
                    setRegisterSuccess(true);
                    handleCloseCreateDialog();
                    fetchData(currentPage);
                    setTimeout(() => {
                        setRegisterSuccess(false)
                    }, 3000);
                } else {
                    setRegisterResult("error");
                    console.log(response)
                }
            } catch (error) {
                setRegisterResult("error");
                console.log(values)
            }
        },
    });

    return (
        <div>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2} sx={{ marginTop: '15px' }}>

                        {/* Field ticket name */}
                        <Grid item xs={12}>
                            <TextField
                                id="ticketName"
                                name="ticketName"
                                label="Ticket Name"
                                variant="outlined"
                                fullWidth
                                value={formik.values.ticketName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.ticketName && formik.errors.ticketName}
                                helperText={formik.touched.ticketName && formik.errors.ticketName}
                            />
                        </Grid>

                        {/* Field ticket price */}
                        <Grid item xs={12}>
                            <TextField
                                id="ticketPrice"
                                name="ticketPrice"
                                label="Ticket Price"
                                variant="outlined"
                                fullWidth
                                value={formik.values.ticketPrice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.ticketPrice && formik.errors.ticketPrice}
                                helperText={
                                    formik.touched.ticketPrice && formik.errors.ticketPrice
                                }
                            />
                        </Grid>

                        {/* Field ticket type */}
                        <Grid item xs={12}>
                            <TextField
                                id="ticketType"
                                name="ticketType"
                                label="Ticket Type"
                                variant="outlined"
                                fullWidth
                                select
                                value={ticketTypeId}
                                onChange={(event) => {
                                    setTicketTypeId(event.target.value);
                                    formik.setFieldValue("ticketType", event.target.value);
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.ticketType && formik.errors.ticketType}
                                helperText={formik.touched.ticketType && formik.errors.ticketType}
                            >
                                <MenuItem value="Regular">Regular</MenuItem>
                                <MenuItem value="Adult Premium">Adult Premium</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Field ticket status */}
                        <Grid item xs={12}>
                            <TextField
                                id="status"
                                name="status"
                                label="Ticket Status"
                                variant="outlined"
                                fullWidth
                                select
                                value={formik.values.status}
                                onChange={(event) => {
                                    setTicketTypeId(event.target.value);
                                    formik.setFieldValue("ticketTypeId", "true");
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.status && formik.errors.status}
                                helperText={formik.touched.status && formik.errors.status}
                            >
                                <MenuItem value="true">Active</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Submut button */}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth>
                                Create
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </div>

            {/* Error alert */}
            {registerResult === 'error' && (
                <Typography
                    variant="body1"
                    color="error">
                    Create failed !!
                </Typography>
            )}
        </div>
    );
}

export default RegisterForm;