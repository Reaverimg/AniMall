import React, { useEffect, useState } from "react";
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
    name: Yup.string()
        .required("Animal name is required")
        .test("unique", "Animal name already existed ", async function (value) {
            if (!value) {
                return true;
            }
            const response = await axios.get(`http://animall-400708.et.r.appspot.com/api/v1/animals`);
            const existingAnimal = response.data.data;
            const isUnique = !existingAnimal.some((animal) =>
                animal.name.toLowerCase() === value.toLowerCase()
            );
            return isUnique;
        }),
    idCage: Yup.string().required("Cage is required"),
    idSpecie: Yup.string().required("Species is required"),
    sex: Yup.boolean().required('Gender is required'),
    dob: Yup.string()
    .required("Date of Birth is required")
    .matches(
      /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Invalid date format. Please use dd/mm/yyyy."
    ),
    description: Yup.string().required("Description is required"),
    idAccount: Yup.string().required("Trainer is required"),
});

function NewAnimalForm({ setAddSuccess, fetchData, handleCloseCreateDialog }) {
    const [addResult, setAddResult] = useState(null);
    const [idSpeciesData, setIdSpeciesData] = useState([]);
    const [idCageData, setIdCageData] = useState([]);
    const [idAccountData, setIdAccountData] = useState([]);
    //fetch Cage
    async function fetchCageData() {
        try {
            const response = await axios.get("http://animall-400708.et.r.appspot.com/api/v1/cages");
            const data = response.data.data;
            setIdCageData(data);
            console.log("idCageData : ", idCageData)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchCageData();
    }, []);

    //fetch Speciies
    async function fetchSpecies() {
        try {
            const response = await axios.get("http://animall-400708.et.r.appspot.com/api/v1/species")
            const data = response.data.data;
            setIdSpeciesData(data);
            console.log("idSpeciesData : ", idSpeciesData);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchSpecies();
    }, []);

    //fetch account
    async function fetchTrainer() {
        try {
            const response = await axios.get("http://animall-400708.et.r.appspot.com/api/v1/accounts");
            const data = response.data.data;
            const getRole = data.filter(account => account.role && account.role.roleDesc === "TRAINER");
            setIdAccountData(getRole);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTrainer();
    }, []);


    const formik = useFormik({
            initialValues: {
                name: "",
                idCage: "",
                idSpecie: "",
                sex: "",
                dob: "",
                description: "",
                idAccount: ""
            },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values)

            try {
                const response = await axios.post("http://animall-400708.et.r.appspot.com/api/v1/animals",
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        
                    },
                );
                if (response) {
                    setAddResult("success");
                    setAddSuccess(true);
                    handleCloseCreateDialog();
                    fetchData();
                    setTimeout(() => {
                        setAddSuccess(false)
                    }, 3000);
                } else {
                    setAddResult("error");
                }
            } catch (error) {
                console.error(error);
                setAddResult("error");
            }
        },
    });

    return (
        <div >
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>

                    {/* Animal name */}
                    <Grid item xs={12} style={{ marginTop: '20px' }}>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && !!formik.errors.name}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>

                    {/* Cage name */}
                    <Grid item xs={12}>
                        <TextField
                            id="idCage"
                            name="idCage"
                            label="Cage Name"
                            variant="outlined"
                            fullWidth
                            select
                            value={formik.values.idCage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.idCage && !!formik.errors.idCage}
                            helperText={formik.touched.idCage && formik.errors.idCage}
                        >
                            {idCageData.map((cage) => (
                                <MenuItem 
                                key={cage.idCage}
                                value={cage.idCage}>
                                    {cage.cageName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Species name */}
                    <Grid item xs={12}>
                        <TextField
                            id="idSpecie"
                            name="idSpecie"
                            label="Specie"
                            variant="outlined"
                            fullWidth
                            className="select-with-scroll"
                            select
                            value={formik.values.idSpecie}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.idSpecie && !!formik.errors.idSpecie}
                            helperText={formik.touched.idSpecie && formik.errors.idSpecie}
                        >
                            {idSpeciesData.map((species) => (
                                <MenuItem
                                    key={species.idSpecie}
                                    value={species.idSpecie}
                                >
                                    {species.specieName}
                                </MenuItem>
                            ))}

                        </TextField>
                    </Grid>


                    {/* Animal gender */}
                    <Grid item xs={12}>
                        <TextField
                            id="sex"
                            name="sex"
                            label="Gender"
                            variant="outlined"
                            fullWidth
                            select
                            value={formik.values.sex}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.sex && !!formik.errors.sex}
                            helperText={formik.touched.sex && formik.errors.sex
                            }
                        >
                            <MenuItem value={true}>Male</MenuItem>
                            <MenuItem value={false}>Female</MenuItem>
                        </TextField>
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                        <TextField
                            id="dob"
                            name="dob"
                            label="Date of Birth"
                            variant="outlined"
                            fullWidth
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.dob && !!formik.errors.dob}
                            helperText={formik.touched.dob && formik.errors.dob}
                        />
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && !!formik.errors.description}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>

                    {/* account name */}
                    <Grid item xs={12}>
                        <TextField
                            id="idAccount"
                            name="idAccount"
                            label="Trainer"
                            variant="outlined"
                            fullWidth
                            select
                            value={formik.values.idAccount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.idAccount && !!formik.errors.idAccount}
                            helperText={formik.touched.idAccount && formik.errors.idAccount}
                        >
                            {idAccountData.map((trainer) => (
                                <MenuItem
                                    key={trainer.idAccount}
                                    value={trainer.idAccount}
                                >
                                    {trainer.name}
                                </MenuItem>
                            ))}

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

            {/* Error Alert */}
            {addResult === 'error' && (
                <Typography
                    variant="body1"
                    color="error">
                    Add New Animal Fails ( Try again !!)
                </Typography>
            )}
        </div>
    );
}

export default NewAnimalForm;