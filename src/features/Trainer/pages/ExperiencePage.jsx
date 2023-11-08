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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import * as React from "react";
import { useEffect, useState } from "react";
import * as yup from "yup";

ExperiencePage.propTypes = {};

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

function ExperiencePage(props) {
  const [experienceList, setExperienceList] = useState();

  const [addDialog, setAddDialog] = useState();

  const [delDialog, setDelDialog] = useState();

  const [editDialog, setEditDialog] = useState();

  const [formData, setFormData] = useState();

  const [updateForm, setUpdateForm] = useState();

  const [idExp, setIdExp] = useState();

  const idAccount = JSON.parse(localStorage.getItem("ACCOUNT__LOGGED"));

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://animall-400708.et.r.appspot.com/api/v1/exps/"
      );
      const responseData = response.data.data;
      setExperienceList(responseData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [experienceList]);

  const handleAddDialogClose = () => {
    setAddDialog(false);
    formik.resetForm();
  };
  const handleAddDialogOpen = () => {
    setAddDialog(true);
  };
  const handleEditDialogOpen = () => {
    setEditDialog(true);
  };
  const handleEditDialogClose = () => {
    setEditDialog(false);
  };
  const handleDelDialogOpen = () => {
    setDelDialog(true);
  };
  const handleDelDialogClose = () => {
    setDelDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      accountId: "",
      specie: "",
      years: "",
      images: "",
      description: "",
    },
    validationSchema: yup.object({
      specie: yup.string().required("Vui lòng nhập tên loài"),
      description: yup.string().required("Vui lòng nhập mô tả"),
      images: yup.string().required("Vui lòng nhập nguồn gốc"),
    }),
    onSubmit: async (values) => {
      try {
        const newExp = {
          accountId: idAccount.idAccount,
          specieName: values.specie,
          years: 0,
          description: values.description,
          certiImg: values.images,
        };
        handleAddDialogClose();
        console.log(newExp);
        const response = await axios.post(
          "https://animall-400708.et.r.appspot.com/api/v1/exps/",
          newExp
        );
        enqueueSnackbar("Add successfully !", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        fetchData();
      } catch (error) {
        console.error("Error during registration:", error);
        enqueueSnackbar("Add failed !", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }
    },
  });

  let editExp = (exp) => {
    setIdExp(exp.idExp);
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://animall-400708.et.r.appspot.com/api/v1/exps/${idExp}`
        );
        const responseData = response.data.data;
        setFormData(responseData);
        console.log("setFormData :", responseData);
        handleEditDialogOpen();
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  };

  let deleteExp = (exp) => {
    handleDelDialogOpen();
    if (!exp) return;
    setIdExp(exp.idExp);
  };

  const handleDelete = async () => {
    const id = idExp;
    try {
      const response = await axios.delete(
        `https://animall-400708.et.r.appspot.com/api/v1/exps?id=${id}`
      );
      enqueueSnackbar("Delete successfully !", {
        variant: "success",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
      handleDelDialogClose();
    } catch (error) {
      console.error("Error making DELETE request", error);
      enqueueSnackbar("Delete failed !", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  const handleEditExp = () => {
    console.log("update form data :", updateForm);
    const putData = {
      expId: idExp,
      specieId: updateForm?.specie.idSpecie,
      years: 0,
      description: updateForm?.description,
      certiImg: updateForm?.certiImg,
    };
    console.log("putData :", putData);
    const updateDataToAPI = async () => {
      try {
        const response = await axios.put(
          "https://animall-400708.et.r.appspot.com/api/v1/exps",
          putData
        );
        enqueueSnackbar("Edit successfully !", {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu PUT đến API:", error);
        enqueueSnackbar("Edit failed !", {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }
    };
    updateDataToAPI();
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
              <Chip label="Experience Manage" color="success" />
            </Stack>
          </div>
          <div className="d-flex justify-content-evenly my-3">
            <Box>
              <Button>
                <AddCircleOutlineIcon
                  sx={{ fontSize: 40 }}
                  onClick={handleAddDialogOpen}
                ></AddCircleOutlineIcon>
              </Button>
            </Box>
            <Box>
              <TextField
                label="Search"
                variant="outlined"
                // value={searchValue}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon></SearchIcon>
                    </InputAdornment>
                  ),
                }}
                // onChange={(e) => setSearchValue(e.target.value)}
              ></TextField>
            </Box>
          </div>
          <Grid>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Specie Name</TableCell>
                    <TableCell align="center">Experience</TableCell>
                    <TableCell style={{ paddingLeft: "60px" }} align="left">
                      Actions
                    </TableCell>
                    {/* <TableCell align="center">Images</TableCell> */}
                  </TableRow>
                </TableHead>
                {experienceList &&
                  experienceList.map((exp) => (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          {exp.specie.specieName}
                        </TableCell>
                        <TableCell align="left">{exp.description}</TableCell>
                        {/* <TableCell align="center">{exp.certiImg}</TableCell> */}
                        <TableCell align="left">
                          <Button onClick={() => editExp(exp)}>Edit</Button>
                          <Button
                            color="warning"
                            onClick={() => deleteExp(exp)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
              </Table>
            </TableContainer>
          </Grid>

          {/* Update Dialog */}
          <Dialog
            open={editDialog}
            // TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Edit Experience</DialogTitle>
            <DialogContent>
              {/* <CreateFeedingPlan></CreateFeedingPlan> */}
              <Grid container spacing={2}>
                {/* Specie Name */}
                <Grid item xs={12}>
                  {formData && (
                    <TextField
                      style={{ marginTop: "10px" }}
                      label="Specie Name"
                      variant="outlined"
                      fullWidth
                      value={formData.specie.specieName}
                      onChange={(e) =>
                        setUpdateForm({
                          ...formData,
                          specieName: e.target.value,
                        })
                      }
                    ></TextField>
                  )}
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  {formData && (
                    <TextField
                      label="Experience "
                      variant="outlined"
                      fullWidth
                      value={formData.description}
                      onChange={(e) =>
                        setUpdateForm({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    ></TextField>
                  )}
                </Grid>

                {/* Certificate */}
                <Grid item xs={12}>
                  {formData && (
                    <TextField
                      label="Images"
                      variant="outlined"
                      fullWidth
                      value={formData.certiImg}
                      onChange={(e) =>
                        setUpdateForm({
                          ...formData,
                          certiImg: e.target.value,
                        })
                      }
                    />
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose}>Cancel</Button>
              <Button onClick={handleEditExp}>Edit</Button>
            </DialogActions>
          </Dialog>

          {/* Add Dialog */}
          <Dialog
            open={addDialog}
            // TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Create New Experience</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
              <DialogContent>
                {/* <CreateFeedingPlan></CreateFeedingPlan> */}
                <Grid container spacing={2}>
                  {/* Name */}
                  <Grid item xs={12}>
                    <TextField
                      style={{ marginTop: "10px" }}
                      label="Specie Name"
                      name="specie"
                      variant="outlined"
                      fullWidth
                      value={formik.values.specie}
                      onChange={formik.handleChange}
                    ></TextField>
                    {formik.touched.specie && formik.errors.specie ? (
                      <Typography variant="caption" color="red">
                        {formik.errors.specie}
                      </Typography>
                    ) : null}
                  </Grid>

                  {/* Status */}
                  <Grid item xs={12}>
                    <TextField
                      label="Experience "
                      variant="outlined"
                      name="description"
                      fullWidth
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    ></TextField>
                    {formik.touched.description && formik.errors.description ? (
                      <Typography variant="caption" color="red">
                        {formik.errors.description}
                      </Typography>
                    ) : null}
                  </Grid>

                  {/* Phone */}
                  <Grid item xs={12}>
                    <TextField
                      label="Images"
                      variant="outlined"
                      name="images"
                      fullWidth
                      value={formik.values.images}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.images && formik.errors.images ? (
                      <Typography variant="caption" color="red">
                        {formik.errors.images}
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
            <DialogTitle>Delete This Experience ?</DialogTitle>
            <DialogActions>
              <Button onClick={handleDelDialogClose}>Cancel</Button>
              <Button color="warning" onClick={handleDelete}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="col-1">
          <Box></Box>
        </div>
      </div>
    </Box>
  );
}

export default ExperiencePage;
