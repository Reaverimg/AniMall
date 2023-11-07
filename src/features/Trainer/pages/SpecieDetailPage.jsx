import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import SettingsRoundedIcon from "@mui/icons-material/Settings";
import SpecieAnimalsList from "../../Trainer/components/SpecieAnimalsList";
import { useFormik } from "formik";
import axios from "axios";
import { enqueueSnackbar, useSnackbar } from "notistack";
import * as Yup from "yup";

SpecieDetailPage.propTypes = {};

const thumbnailUrl = "https://via.placeholder.com/300x250";

function SpecieDetailPage(props) {
  const {
    params: { idSpecie },
  } = useRouteMatch();

  const match = useRouteMatch();

  const [specie, setSpecie] = useState({});

  const [specieAnimals, setSpecieAnimals] = useState([]);

  const [editDialogOpen, setEditDialogOpen] = useState();

  const [formData, setFormData] = useState({});

  const [updateSpecie, setUpdateSpecie] = useState({
    idSpecie: `${idSpecie}`,
    specieName: "",
    origin: "",
    description: "",
    status: true,
  });

  const handleEditDialogOpen = (specie) => {
    setFormData({
      specieName: specie.specieName,
      origin: specie.origin,
      description: specie.description,
    });
    // console.log("formData", formData);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => setEditDialogOpen(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://animall-400708.et.r.appspot.com/api/v1/species/${idSpecie}`
        );
        if (response.ok) {
          const data = await response.json();
          setSpecie(data.data);
          setSpecieAnimals(data.data.animalList);
          // console.log("SpecieAnimals :", specieAnimals);
          // console.log("specie :", specie);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [match]);

  const formik = useFormik({
    initialValues: {
      idSpecie: `${idSpecie}`,
      specieName: "",
      origin: "",
      description: "",
    },
    validationSchema: Yup.object({
      specieName: Yup.string()
        .matches(/^[a-zA-ZÀ-ỹ]+$/, "Name must contain only letters")
        .required("Please enter name")
        .min(2, "Species name must be at least 2 characters"),
      origin: Yup.string()
        .matches(/^[a-zA-ZÀ-ỹ]+$/, "Origin must contain only letters")
        .required("Please enter origin")
        .min(4, "Origin must be at least 4 characters"),
      description: Yup.string()
        .matches(/^[a-zA-ZÀ-ỹ]+$/, "Description name must contain only letters")
        .required("Please enter description")
        .min(5, "Description must be at least 5 characters"),
    }),
    onSubmit: async (values) => {
      const data = {
        ...updateSpecie,
        specieName: values.specieName,
        origin: values.origin,
        description: values.description,
      };
      console.log("values :", data);
      try {
        const response = await axios.put(
          "http://animall-400708.et.r.appspot.com/api/v1/species/",
          values
        );
        if (response.ok) {
          enqueueSnackbar("Update succesfully", {
            variant: "success",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
          });
          handleEditDialogClose();
        } else {
          enqueueSnackbar("Update failed", {
            variant: "error",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
          });
        }
      } catch (error) {
        console.error("Error making PUT request", error);
      }
    },
  });

  return (
    <Grid container justifyContent="center" spacing={2} pt={5}>
      {/* col-8 */}
      <Grid item xs={12} md={8}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <img
              src={thumbnailUrl}
              className="img-fluid rounded-start"
              alt="..."
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <div
              className="card mb-3"
              style={{ maxWidth: "100vw", maxHeight: "250px" }}
            >
              <div className="card-body">
                <Grid container justifyContent="flex-end">
                  <Button onClick={() => handleEditDialogOpen(specie)}>
                    <SettingsRoundedIcon />
                  </Button>
                </Grid>
                <Grid container justifyContent="flex-start">
                  <h5 className="card-title">Loài : {specie.specieName} </h5>
                </Grid>
                <p className="card-text">Nguồn gốc : {specie.origin}</p>
                <p className="card-text">
                  Đặc điểm của loài : {specie.description}
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      {/* Table row */}
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={5}>
          {specieAnimals.map((animal) => (
            <Grid item key={animal.idAnimal}>
              <SpecieAnimalsList animal={animal} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen}>
        <DialogTitle>Edit Specie</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              {/* Name */}
              <Grid item xs={12}>
                <TextField
                  label="Tên loài"
                  name="specieName"
                  variant="outlined"
                  value={formik.values.specieName}
                  defaultValue={formData.specieName}
                  onChange={formik.handleChange}
                  fullWidth
                >
                  {formData.specieName}
                </TextField>
                {formik.touched.specieName && formik.errors.specieName ? (
                  <Typography variant="caption" color="red">
                    {formik.errors.specieName}
                  </Typography>
                ) : null}
              </Grid>

              {/* Status */}
              <Grid item xs={12}>
                <TextField
                  label="Nguồn gốc"
                  name="origin"
                  variant="outlined"
                  value={formik.values.origin}
                  defaultValue={formData.origin}
                  onChange={formik.handleChange}
                  fullWidth
                ></TextField>
                {formik.touched.origin && formik.errors.origin ? (
                  <Typography variant="caption" color="red">
                    {formik.errors.origin}
                  </Typography>
                ) : null}
              </Grid>

              {/* Status */}
              <Grid item xs={12}>
                <TextField
                  label="Đặc điểm"
                  name="description"
                  variant="outlined"
                  value={formik.values.description}
                  // value={formData.description}
                  onChange={formik.handleChange}
                  fullWidth
                ></TextField>
                {formik.touched.description && formik.errors.description ? (
                  <Typography variant="caption" color="red">
                    {formik.errors.description}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleEditDialogClose}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
}

export default SpecieDetailPage;
