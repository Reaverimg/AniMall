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

// import { updateFoodTracking } from "../../Trainer/components/dialog/updateFoodTracking";

TableSchedule.propTypes = {
  foodtracking: PropTypes.object.isRequired,
};

function TableSchedule({ foodtracking }) {
  const history = useHistory();
  //update dialog
  const [updateDialog, setUpdateDialog] = useState();
  //delete dialog
  const [delDialog, setDelDialog] = useState();
  //edit dialog
  const [editDialog, setEditDialog] = useState();

  const currentDate = new Date();

  const [value, setValue] = useState(dayjs(currentDate));

  const [idFood, setIdFood] = useState();

  const [updateForm, setUpdateForm] = useState({});

  const [idFoodTracking, setIdFoodTracking] = useState();

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

  function compareDateWithToday(dateString) {
    // Chuyển đổi chuỗi ngày thành đối tượng Date
    const [day, month, year] = dateString.split("/").map(Number);
    const comparisonDate = new Date(year, month - 1, day); // Tháng trong JavaScript bắt đầu từ 0

    // Ngày hiện tại
    const currentDate = new Date();

    // So sánh ngày
    if (comparisonDate > currentDate) {
      return "Ngày trong tương lai";
    } else if (comparisonDate < currentDate) {
      return "Ngày trong quá khứ";
    } else {
      return `Ngày hiện tại và animalHealth: ${foodtracking.animalHealth}`;
    }
  }

  const handleClickAdd = () => {
    history.push(`/trainer/feedingSchedule`);
  };

  let deleteFoodTracking = (idFoodTracking) => {
    if (!idFoodTracking) return;
    setIdFood(idFoodTracking);
    handleDelDialogOpen();
    console.log(idFoodTracking);
  };

  const handleDelete = async () => {
    const id = idFood;
    try {
      const response = await axios.delete(
        `http://animall-400708.et.r.appspot.com/api/v1/foodtracking/${id}`
      );
      if (response.status === 200) {
        enqueueSnackbar("Delete successfully !", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
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

  let editFoodTracking = (idFoodTracking) => {
    setIdFoodTracking(idFoodTracking);
    async function foodTrackingById() {
      if (idFoodTracking) {
        try {
          const response = await axios.get(
            `http://animall-400708.et.r.appspot.com/api/v1/foodtracking/${idFoodTracking}`
          );
          if (response) {
            const responseData = response.data.data;
            setUpdateForm(responseData);
            openUpdateDialog();
          }
        } catch (error) {
          console.error("Đã có lỗi:", error);
          throw error;
        }
      }
    }
    foodTrackingById();
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
            <TableCell className="table-title" align="left">
              Date
            </TableCell>
            <TableCell className="table-title" align="center">
              Food Consume
            </TableCell>
            <TableCell className="table-title" align="center">
              Food Name
            </TableCell>
            <TableCell className="table-title" align="center">
              Health
            </TableCell>
            <TableCell className="table-title" align="center">
              Action
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
            {/* Name */}
            {/* <Grid item xs={12}>
              <TextField
                label="Animal name"
                style={{ marginTop: "10px" }}
                variant="outlined"
                fullWidth
                value={updateForm && updateForm.animal.name}
                disabled
              ></TextField>
            </Grid> */}

            {/* Date */}
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // value={updateForm.date}
                  label="Feeding date"
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, date: e.target.value })
                  }
                  format="DD-MM-YYYY"
                  disablePast
                />
              </LocalizationProvider>
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

            {/* Phone */}
            <Grid item xs={12}>
              <TextField
                label="Food consume"
                variant="outlined"
                value={updateForm.foodAmount}
                onChange={(e) => {
                  // Cập nhật giá trị foodAmount trong updateForm
                  setUpdateForm({ ...updateForm, foodAmount: e.target.value });

                  // Log ra data mỗi khi giá trị thay đổi
                  console.log("Update Form Data:", {
                    ...updateForm,
                    foodAmount: e.target.value,
                  });
                }}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">kg</InputAdornment>
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateDialog}>Cancel</Button>
          <Button onClick={closeUpdateDialog}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* {console.log("update form:", updateForm)} */}
      {/* Delete Dialog */}
      <Dialog
        open={delDialog}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete this food tracking ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelDialogClose}>Cancel</Button>
          <Button color="warning" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* {foodtracking &&
        foodtracking.forEach((tracking) => {
          const result = compareDateWithToday(tracking.date);
          console.log(
            ID Tracking: ${tracking.idTracking} - Kết quả so sánh: ${result}
          );
        })} */}
      {/* Table */}
    </Box>
  );
}

export default TableSchedule;
