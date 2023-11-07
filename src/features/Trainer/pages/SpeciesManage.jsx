import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { GET_ALL_SPECIES } from "../../../api/SwaggerAPI";
import SpeciesDetail from "../components/SpeciesDetail";
import * as yup from "yup";
import { useFormik } from "formik";
import { enqueueSnackbar, useSnackbar } from "notistack";

SpeciesManage.propTypes = {};

function SpeciesManage(props) {
  const [specieslList, setSpeciesList] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [filterByName, setFilterByName] = useState([]);

  const [addDialog, setAddDialog] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://animall-400708.et.r.appspot.com/api/v1/species"
        );
        const speciesData = response.data.data;
        setSpeciesList(speciesData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  function handleFilterByName() {
    // if (searchValue) {
    //   const filterdValues = specieslList.filter((specie) =>
    //     specie.specieName.toLowerCase().includes(searchValue.toLowerCase())
    //   );
    //   setFilterByName(filterdValues);
    // }
    if (searchValue) {
      const filteredValues = specieslList.filter(
        (specie) =>
          specie.specieName &&
          specie.specieName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterByName(filteredValues);
    }
  }

  // Search by name
  useEffect(() => {
    handleFilterByName();
  }, [searchValue, specieslList]);

  const formik = useFormik({
    initialValues: {
      name: "",
      origin: "",
      description: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Vui lòng nhập tên loài"),
      origin: yup.string().required("Vui lòng nhập nguồn gốc"),
      description: yup.string().required("Vui lòng nhập mô tả"),
    }),
    onSubmit: async (values) => {
      try {
        const newSpecie = {
          specieName: values.name,
          origin: values.origin,
          description: values.description,
        };

        const response = await axios.post(
          "http://animall-400708.et.r.appspot.com/api/v1/exps/",
          newSpecie
        );
        enqueueSnackbar("Delete successfully !", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        handleAddDialogClose();
      } catch (error) {
        console.error("Error during registration:", error);
      }
    },
  });

  const handleAddDialogOpen = () => {
    setAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setAddDialog(false);
  };

  return (
    <Box>
      <div className="row">
        <div className="col-1">
          <Box></Box>
        </div>
        <div className="col-10 pt-5">
          <div className="d-flex flex-row">
            <Stack direction="row" className="my-3">
              <Chip label="Species Manage" color="success" />
            </Stack>
          </div>
          <div className="d-flex justify-content-evenly my-3">
            <Box>
              <Button>
                <AddCircleOutlineIcon
                  onClick={handleAddDialogOpen}
                  sx={{ fontSize: 40 }}
                ></AddCircleOutlineIcon>
              </Button>
            </Box>
            <Box>
              <TextField
                label="Search"
                variant="outlined"
                value={searchValue}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon></SearchIcon>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchValue(e.target.value)}
              ></TextField>
            </Box>
          </div>
          {/* {filterByName.length === 0 ? (
            <div className="d-flex justify-content-end">
              <Typography align="inherit" color="red">
                No results found
              </Typography>
            </div>
          ) : (
            <Grid container spacing={5}>
              {filterByName.map((specie) => (
                <Grid item key={specie.idSpecie} xs={12} sm={6} md={6} lg={4}>
                  <SpeciesDetail specie={specie}></SpeciesDetail>
                </Grid>
              ))}
            </Grid>
          )} */}
          <Grid container spacing={5}>
            {specieslList.map((specie) => (
              <Grid item key={specie.idSpecie} xs={12} sm={6} md={6} lg={4}>
                <SpeciesDetail specie={specie}></SpeciesDetail>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className="col-1">
          <Box></Box>
        </div>
      </div>

      <Dialog
        open={addDialog}
        // TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Create New Specie</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            {/* <CreateFeedingPlan></CreateFeedingPlan> */}
            <Grid container spacing={2}>
              {/* Name */}
              <Grid item xs={12}>
                <TextField
                  style={{ marginTop: "10px" }}
                  label="Specie Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                ></TextField>
                {formik.touched.name && formik.errors.name ? (
                  <Typography variant="caption" color="red">
                    {formik.errors.name}
                  </Typography>
                ) : null}
              </Grid>

              {/* Status */}
              <Grid item xs={12}>
                <TextField
                  label="Specie Origin"
                  variant="outlined"
                  name="origin"
                  fullWidth
                  value={formik.values.origin}
                  onChange={formik.handleChange}
                ></TextField>
                {formik.touched.origin && formik.errors.origin ? (
                  <Typography variant="caption" color="red">
                    {formik.errors.origin}
                  </Typography>
                ) : null}
              </Grid>

              {/* Phone */}
              <Grid item xs={12}>
                <TextField
                  label="Specie Description"
                  variant="outlined"
                  name="description"
                  fullWidth
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.touched.description && formik.errors.description ? (
                  <Typography variant="caption" color="red">
                    {formik.errors.description}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddDialogClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default SpeciesManage;
