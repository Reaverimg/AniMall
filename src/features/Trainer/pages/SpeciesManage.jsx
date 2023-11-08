import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardActions,
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
import Skeleton from "../../../components/loading/Skeletion";
import { Warning } from "@mui/icons-material";

SpeciesManage.propTypes = {};

function SpeciesManage(props) {
  const [specieslList, setSpeciesList] = useState();

  const [searchValue, setSearchValue] = useState();

  const [filterByName, setFilterByName] = useState([]);

  const [delDialog, setDelDialog] = useState();

  const [addDialog, setAddDialog] = useState();

  const [delForm, setDelForm] = useState();

  const [loading, setLoading] = useState();

  const [idSpecie, setIdSpecie] = useState();

  const handleAddDialogOpen = () => {
    setAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setAddDialog(false);
  };

  const handleDelDialogOpen = () => {
    setDelDialog(true);
  };
  const handleDelDialogClose = () => {
    setDelDialog(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://animall-400708.et.r.appspot.com/api/v1/species"
      );
      const speciesData = response.data.data;
      setSpeciesList(speciesData);
      console.log("SpeciesList:", speciesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Search by name
  // useEffect(() => {
  //   handleFilterByName();
  // }, [searchValue, specieslList]);

  // function handleFilterByName() {
  //   if (specieslList && searchValue) {
  //     const filteredValue = specieslList.filter(
  //       (specie) =>
  //         specie?.specieName
  //           ?.toLowerCase()
  //           .includes(searchValue.toLowerCase()) ||
  //         specie?.origin?.toLowerCase().includes(searchValue.toLowerCase())
  //     );
  //     setFilterByName(filteredValue);
  //   }
  // }

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
        console.log("newSpecie :", newSpecie);
        const response = await axios.post(
          "https://animall-400708.et.r.appspot.com/api/v1/species",
          newSpecie
        );
        enqueueSnackbar("Species created successfully!", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        handleAddDialogClose();
      } catch (error) {
        console.error("Error during registration:", error);
        enqueueSnackbar("Failed to create species. Please try again later.", {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }
    },
  });

  const setDeleteForm = (id) => {
    setIdSpecie(id);
    const fetchDataById = async () => {
      try {
        const response = await axios.get(
          `https://animall-400708.et.r.appspot.com/api/v1/species/${id}`
        );
        const speciesData = response.data.data;
        console.log("DelForm :", speciesData);
        setDelForm(speciesData);
        handleDelDialogOpen();
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchDataById();
  };

  const handleDelete = async () => {
    const delData = {
      idSpecie: delForm?.idSpecie,
      specieName: delForm?.specieName,
      origin: delForm?.origin,
      description: delForm?.description,
      status: false,
    };
    console.log("delData :", delData);
    try {
      const response = await fetch(
        "https://animall-400708.et.r.appspot.com/api/v1/species",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(delData),
        }
      );

      if (response.ok) {
        enqueueSnackbar("Delete successfully !", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        setLoading(false);
        handleDelDialogClose();
        fetchData();
      } else {
        enqueueSnackbar("Delete failed !", {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        throw new Error(`https error! status: ${response.status}`);
      }
      setLoading(false);
      handleDelDialogClose();
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("Delete failed !", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
    fetchData();
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

          {/* filterByName && filterByName.length === 0 ? 
            <div className="d-flex justify-content-end">
              <Typography color="error">No results found</Typography>
            </div> */}

          {loading ? (
            <Skeleton />
          ) : (
            <Grid container spacing={5}>
              {specieslList &&
                specieslList.map((specie) => (
                  <Grid item key={specie.idSpecie} xs={12} sm={6} md={6} lg={4}>
                    <Card sx={{ maxWidth: 250, maxWidth: 350 }}>
                      <SpeciesDetail
                        specie={specie}
                        getId={setDeleteForm}
                      ></SpeciesDetail>
                      {console.log}
                    </Card>
                  </Grid>
                ))}
            </Grid>
          )}
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

      {/* Delete Dialog */}
      <Dialog
        open={delDialog}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ color: "#ED4337" }}>
          Delete {delForm?.specieName} specie
        </DialogTitle>
        <DialogTitle style={{ color: "#ED4337" }}>
          Origin from {delForm?.origin} ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDelDialogClose}>Cancel</Button>
          <Button style={{ color: "#ED4337" }} onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SpeciesManage;
