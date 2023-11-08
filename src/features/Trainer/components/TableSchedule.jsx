import {
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import UpdateFoodTracking from "../../Trainer/components/dialog/UpdateFoodTracking";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { enqueueSnackbar } from "notistack";
import "../../Trainer/styles/animalDetailPage.css";
import axios from "axios";
import FoodSelection from "./FoodSelection";

// import { updateFoodTracking } from "../../Trainer/components/dialog/updateFoodTracking";

TableSchedule.propTypes = {
  foodtracking: PropTypes.object.isRequired,
  Render: PropTypes.func,
};

function TableSchedule({ foodtracking, Render }) {
  const history = useHistory();

  const [updateDialog, setUpdateDialog] = useState();

  const [delDialog, setDelDialog] = useState();

  const [editDialog, setEditDialog] = useState();

  const currentDate = new Date();

  const [dateValue, setDateValue] = useState(dayjs(currentDate));

  const [idFood, setIdFood] = useState();

  const [updateForm, setUpdateForm] = useState();

  const [deleteForm, setDeleteForm] = useState();

  const [idFoodTracking, setIdFoodTracking] = useState();

  const [onChangeFood, setOnChangeFood] = useState();

  const openUpdateDialog = () => {
    setUpdateDialog(true);
  };

  const closeUpdateDialog = () => {
    setUpdateDialog(false);
  };

  // const handleAddDialogClose = () => {
  //   setAddDialog(false);
  // };

  // const handleAddDialogOpen = () => {
  //   setAddDialog(true);
  // };

  const handleDelDialogOpen = () => {
    setDelDialog(true);
  };
  const handleDelDialogClose = () => {
    setDelDialog(false);
  };

  const handleClickAdd = () => {
    history.push(`/trainer/feedingSchedule`);
  };

  //Set id state and open delete dialog
  let deleteFoodTracking = (idFoodTracking) => {
    if (!idFoodTracking) return;
    setIdFood(idFoodTracking);
    console.log("id:", idFoodTracking);
    const getFoodTrackingById = async () => {
      try {
        const response = await axios.get(
          `https://animall-400708.et.r.appspot.com/api/v1/foodtracking/${idFoodTracking}`
        );
        setDeleteForm(response.data.data);
        console.log("DeleteForm :", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    getFoodTrackingById();
    handleDelDialogOpen();
  };

  //Set id state and open edit dialog
  let editFoodTracking = (idFoodTracking) => {
    setIdFoodTracking(idFoodTracking);
    const foodTrackingById = async () => {
      if (idFoodTracking) {
        try {
          const response = await axios.get(
            `https://animall-400708.et.r.appspot.com/api/v1/foodtracking/${idFoodTracking}`
          );
          if (response) {
            const responseData = response.data.data;
            setUpdateForm(responseData);
            console.log("UpdateForm :", responseData);
            openUpdateDialog();
          }
        } catch (error) {
          console.error("Đã có lỗi:", error);
          throw error;
        }
      }
    };
    foodTrackingById();
  };

  //Handel Delete
  const handleDelete = async () => {
    const id = idFood;
    try {
      const response = await axios.delete(
        `https://animall-400708.et.r.appspot.com/api/v1/foodtracking/${id}`
      );
      if (response.status === 200) {
        enqueueSnackbar("Delete successfully !", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        if (Render) {
          Render();
        }
      } else {
        enqueueSnackbar("Delete failed !", {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }
    } catch (error) {
      enqueueSnackbar("Delete failed !", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
    handleDelDialogClose();
  };

  // Handle Edit
  const handleEditFoodTracking = async () => {
    const getDate = dayjs(dateValue).format("DD/MM/YYYY");
    const putData = {
      idTracking: idFoodTracking,
      date: getDate,
      animalName: updateForm?.animal.name,
      foodName: onChangeFood ? onChangeFood : updateForm.food.name,
      foodAmount: updateForm?.foodAmount,
      animalHealth: updateForm?.animalHealth,
    };
    console.log("putData :", putData);
    try {
      const response = await axios.put(
        "https://animall-400708.et.r.appspot.com/api/v1/foodtracking/",
        putData
      );
      if (response.status >= 200 && response.status < 300) {
        enqueueSnackbar("Edit successfully !", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        if (Render) {
          Render();
        }
        closeUpdateDialog();
      } else {
        enqueueSnackbar(`Edit failed !`, {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar(error, {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  const styles = {
    btnEdit: {
      color: "whitesmoke",
      border: "1px solid #1976D5",
      marginRight: "10px",
    },
    btnDelete: {
      border: "1px solid #D32F2F",
    },
  };

  return (
    <Box sx={{ marginTop: "3%" }}>
      <div className="btn-add mb-3">
        <Button variant="contained" color="success" onClick={handleClickAdd}>
          <AddIcon></AddIcon>
          Add new
        </Button>
      </div>
      <Table
        sx={{
          maxWidth: "100vw",
          width: "800px",
          backgroundColor: " rgba(200, 200, 200, 0.2);",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell className="table-title" align="center">
              Date
            </TableCell>
            <TableCell className="table-title" align="center">
              Food Consume
            </TableCell>
            <TableCell className="table-title" align="center">
              Food Name
            </TableCell>
            <TableCell className="table-title" align="center">
              Health Status
            </TableCell>
            <TableCell className="table-title" align="center">
              Actions
            </TableCell>
            <TableCell className="table-title" align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foodtracking &&
            foodtracking.map((data) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{data.date}</TableCell>
                <TableCell align="center">{data.foodAmount}Kg</TableCell>
                <TableCell align="center">{data.food.name}</TableCell>
                <TableCell align="center">{data.animalHealth}</TableCell>
                <TableCell align="right">
                  <Grid container justify="center" alignItems="center">
                    <Grid item sx={2}></Grid>
                    <Grid item sx={4} textAlign="center">
                      <Button
                        sx={styles.btnEdit}
                        onClick={() => {
                          editFoodTracking(data.idTracking);
                        }}
                      >
                        <IconButton
                          aria-label="edit"
                          color="success"
                          size="small"
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                      </Button>
                    </Grid>
                    <Grid item sx={4} textAlign="center">
                      <Button
                        sx={styles.btnDelete}
                        color="error"
                        onClick={() => deleteFoodTracking(data.idTracking)}
                      >
                        <IconButton
                          aria-label="delete"
                          color="error"
                          size="small"
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </Button>
                    </Grid>
                    <Grid item sx={2}></Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Update Dialog */}
      <Dialog open={updateDialog}>
        {/* <UpdateFoodTracking onClose={closeUpdateDialog}></UpdateFoodTracking> */}
        <DialogTitle>UPDATE PLAN</DialogTitle>
        <DialogContent>
          {/* <CreateFeedingPlan></CreateFeedingPlan> */}
          <Grid container spacing={2}>
            {/* Date */}
            <Grid item xs={12}>
              {updateForm && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={
                      updateForm?.date
                        ? dayjs(updateForm.date, "DD/MM/YYYY")
                        : null
                    }
                    onChange={(e) => setDateValue(e)}
                    format="DD/MM/YYYY"
                    disablePast
                  />
                </LocalizationProvider>
              )}
            </Grid>

            {/* Status */}
            {/* <Grid item xs={12}>
              <TextField
                label="Food name"
                variant="outlined"
                value={updateForm && updateForm.food.name}
                // onChange={(updateForm) =>
                //     setUpdateForm({ ...updateForm, food.name : value })
                //   }
                fullWidth
              ></TextField>
            </Grid> */}

            {/* Food Amount */}
            <Grid item xs={12}>
              {updateForm && (
                <TextField
                  label="Food Consumes"
                  variant="outlined"
                  value={updateForm.foodAmount}
                  onChange={(e) => {
                    // Cập nhật giá trị foodAmount trong updateForm
                    setUpdateForm({
                      ...updateForm,
                      foodAmount: e.target.value,
                    });
                  }}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">kg</InputAdornment>
                  }
                />
              )}
            </Grid>

            {/* Food Name */}
            <Grid item xs={12}>
              {updateForm && (
                <FoodSelection
                  formData={updateForm.food.name}
                  onFoodChange={(value) => {
                    setOnChangeFood(value);
                  }}
                ></FoodSelection>
              )}
            </Grid>

            {/* Health */}
            <Grid item xs={12}>
              {updateForm && (
                <TextField
                  label="Health Status"
                  variant="outlined"
                  fullWidth
                  value={updateForm?.animalHealth}
                  onChange={(e) => {
                    setUpdateForm({
                      ...updateForm,
                      animalHealth: e.target.value,
                    });
                  }}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateDialog}>Cancel</Button>
          <Button onClick={handleEditFoodTracking}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={delDialog}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          Delete feeding plan for {deleteForm?.animal.name} on{" "}
          {deleteForm?.date} ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDelDialogClose}>Cancel</Button>
          <Button color="warning" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TableSchedule;
