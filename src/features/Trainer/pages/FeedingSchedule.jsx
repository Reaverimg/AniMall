import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Skeleton from "../../../components/loading/Skeletion";
import "../../Trainer/styles/animalManage.css";
import AnimalSelection from "../components/AnimalSelection";
import FoodSelection from "../components/FoodSelection";

FeedingSchedule.propTypes = {};

function FeedingSchedule(props) {
  const [open, setOpen] = useState();

  const currentDate = new Date();

  const [dateValue, setDateValue] = useState(dayjs(currentDate));

  const [selectedDate, setSelectedDate] = useState();

  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState();

  const [editDialogOpen, setEditDialogOpen] = useState();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState();

  const [animalFoodTrackings, setAnimalFoodTrackings] = useState();

  const [idFoodTracking, setIdFoodTracking] = useState();

  const [onChangeAnimal, setOnChangeAnimal] = useState("");

  const [onChangeFood, setOnChangeFood] = useState();

  const [loading, setLoading] = useState(true);

  const [searchValue, setSearchValue] = useState("");

  const [filterByName, setFilterByName] = useState([]);

  const handleDateOpen = () => setIsOpen(true);

  const handleDateClose = () => setIsOpen(false);

  const handleEditDialogOpen = () => setEditDialogOpen(true);

  const handleEditDialogClose = () => setEditDialogOpen(false);

  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true);

  const handleDeleteDialogClose = () => setDeleteDialogOpen(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  async function fetchData(page) {
    try {
      const response = await axios.get(
        `http://animall-400708.et.r.appspot.com/api/v1/foodtracking/`
      );
      const responseData = response.data.data;
      setAnimalFoodTrackings(responseData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  //Fetch data foodtracking
  useEffect(() => {
    fetchData();
  }, []);

  //Search by name
  useEffect(() => {
    handleFilterByName();
  }, [searchValue, animalFoodTrackings]);

  function handleFilterByName() {
    if (animalFoodTrackings) {
      const filterdValue = animalFoodTrackings.filter(
        (data) =>
          data.date.toLowerCase().includes(searchValue.toLowerCase()) ||
          data.animalHealth.toLowerCase().includes(searchValue.toLowerCase()) ||
          data.food.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          data.animal.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterByName(filterdValue);
    }
  }

  //Add formik
  const formik = useFormik({
    initialValues: {
      // name: "",
      // foodName: "",
      foodAmount: "",
      animalHealth: "",
    },
    validationSchema: yup.object({
      // name: yup.string().required("Vui lòng chọn con vật cho ăn"),
      // foodName: yup.string().required("Vui lòng chọn loại thức ăn"),
      animalHealth: yup.string().required("Vui lòng nhập sức khỏe con vật"),
      foodAmount: yup
        .number()
        .required("Vui lòng nhập lượng thức ăn")
        .positive("Lượng thức ăn phải lớn hơn 0"),
    }),
    onSubmit: async (values) => {
      const getDate = dayjs(dateValue).format("DD/MM/YYYY");
      const data = {
        animalName: onChangeAnimal,
        name: onChangeFood,
        date: getDate,
        animalHealth: values.animalHealth,
        foodAmount: values.foodAmount,
        status: true,
      };
      try {
        console.log("post data :", data);
        const response = await axios.post(
          "http://animall-400708.et.r.appspot.com/api/v1/foodtracking/",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status >= 200 && response.status < 300) {
          // POST request thành công (mã trạng thái 2xx)
          enqueueSnackbar("Create successful!", {
            variant: "success",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
          });
          setLoading(true);
        } else {
          // POST request không thành công (mã trạng thái không phải 2xx)
          enqueueSnackbar("Create failed!", {
            variant: "error",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
          });
        }
      } catch (error) {
        console.error("Error during POST request:", error);
        enqueueSnackbar("Create failed !", {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }
      setIsOpen(false);
      fetchData();
    },
  });

  //Get id to delete and open del dialog
  const setFormDelFoodTracking = (foodId) => {
    setIdFoodTracking(foodId);
    const getFoodTrackingById = async () => {
      try {
        const response = await axios.get(
          `http://animall-400708.et.r.appspot.com/api/v1/foodtracking/${foodId}`
        );
        if (response) {
          const foodTrackingData = response.data.data;
          setFormData(foodTrackingData);
          handleDeleteDialogOpen();
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu API:", error);
      }
    };
    getFoodTrackingById();
  };

  //Get id to edit and open edit dialog
  const setFormEditFoodTracking = (foodId) => {
    setIdFoodTracking(foodId);
    const getFoodTrackingById = async () => {
      try {
        const response = await axios.get(
          `http://animall-400708.et.r.appspot.com/api/v1/foodtracking/${foodId}`
        );
        if (response) {
          const foodTrackingData = response.data.data;
          setFormData(foodTrackingData);
          handleEditDialogOpen();
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu API:", error);
      }
    };
    getFoodTrackingById();
  };

  //Delete food tracking
  const handleDelFoodTracking = async () => {
    setLoading(true);
    const foodId = idFoodTracking;
    try {
      const response = await axios.delete(
        `http://animall-400708.et.r.appspot.com/api/v1/foodtracking/${foodId}`
      );
      enqueueSnackbar("Delete  successfully !", {
        variant: "success",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
      handleDeleteDialogClose();
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

  // Edit food tracking
  const handleEditFoodTracking = async () => {
    const getDate = dayjs(dateValue).format("DD/MM/YYYY");
    const putData = {
      idTracking: idFoodTracking,
      date: getDate,
      animalName: onChangeAnimal ? onChangeAnimal : formData.animal.name,
      foodName: onChangeFood ? onChangeFood : formData.food.name,
      foodAmount: formData.foodAmount,
      animalHealth: formData.animalHealth,
    };
    console.log("putData :", putData);
    try {
      const response = await axios.put(
        "http://animall-400708.et.r.appspot.com/api/v1/foodtracking/",
        putData
      );
      enqueueSnackbar("Edit successfully !", {
        variant: "success",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
      setLoading(false);
      handleEditDialogClose();
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
    fetchData();
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
    <Box>
      <div class="row pt-5">
        <div className="col-1">
          <Box></Box>
        </div>

        <div className="col-10">
          <div className=" header-content">
            <div className="d-flex flex-row header-title">
              <Stack direction="row" className="my-3">
                <div className="d-flex">
                  <div className="title-shape"></div>
                  {/* <Chip label="Animals Manage" color="success" /> */}
                  <Typography className="title-typo" variant="h6" gutterBottom>
                    Feeding Schedule
                  </Typography>
                </div>
              </Stack>
            </div>

            <div className="d-flex justify-content-evenly my-3 sub-header">
              <Box>
                <TextField
                  sx={{ width: "400px" }}
                  label="Search"
                  variant="outlined"
                  //value={searchValue}
                  placeholder="Search"
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
            <div className="btn-add">
              <Box>
                <Button
                  onClick={handleClickOpen}
                  variant="outlined"
                  startIcon={<AddIcon />}
                >
                  Create
                </Button>
              </Box>
            </div>
          </div>

          <Grid containerspacing={2}>
            <Grid item sx={12}></Grid>
          </Grid>

          {/* filter by name */}
          {/* {loading ? <Skeleton></Skeleton> : } */}
          {filterByName && filterByName.length === 0 ? (
            <div className="d-flex justify-content-end">
              <Typography align="inherit" color="red">
                No results found
              </Typography>
            </div>
          ) : loading ? (
            <Skeleton />
          ) : (
            <Grid container justifyContent="center" alignItems="center" sx={12}>
              <Table
                sx={{
                  maxWidth: "60vw",
                  backgroundColor: " rgba(200, 200, 200, 0.2);",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Animal Name</TableCell>
                    <TableCell align="center">Food Name</TableCell>
                    <TableCell align="center">Food Consume</TableCell>
                    <TableCell align="center">Animal Health</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterByName.map((tracking) => (
                    <TableRow
                      key={tracking.idTracking}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">{tracking?.date}</TableCell>
                      <TableCell align="center">
                        {tracking?.animal?.name}
                      </TableCell>
                      <TableCell align="center">
                        {tracking?.food?.name}
                      </TableCell>
                      <TableCell align="center">
                        {tracking?.foodAmount}kg
                      </TableCell>
                      <TableCell align="center">
                        {tracking?.animalHealth}
                      </TableCell>
                      <TableCell align="center">
                        <Grid container justify="center" alignItems="center">
                          <Grid item sx={2}></Grid>
                          <Grid item sx={4} textAlign="center">
                            <Button
                              sx={styles.btnEdit}
                              onClick={() =>
                                setFormEditFoodTracking(tracking.idTracking)
                              }
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
                              onClick={() =>
                                setFormDelFoodTracking(tracking.idTracking)
                              }
                            >
                              <IconButton
                                aria-label="delete"
                                color="error"
                                size="small"
                              >
                                <DeleteIcon
                                  fontSize="inherit"
                                  color="error"
                                  size="small"
                                />
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
            </Grid>
          )}
        </div>
        <div className="col-1"></div>
      </div>

      {/* Table Food Trackings */}
      {/* {loading ? (
        <Skeleton></Skeleton>
      ) : (
        <Grid container justifyContent="center" alignItems="center" sx={12}>
          <Table sx={{ maxWidth: "50vw" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#FFFF" }}>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Animal Name</TableCell>
                <TableCell align="center">Food Name</TableCell>
                <TableCell align="center">Food Consume</TableCell>
                <TableCell align="center">Animal Health</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {animalFoodTrackings &&
                animalFoodTrackings.map((tracking) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{tracking?.date}</TableCell>
                    <TableCell align="center">
                      {tracking?.animal?.name}
                    </TableCell>
                    <TableCell align="center">{tracking?.food?.name}</TableCell>
                    <TableCell align="center">
                      {tracking?.foodAmount}kg
                    </TableCell>
                    <TableCell align="center">
                      {tracking?.animalHealth}Healthy
                    </TableCell>
                    <TableCell align="center">
                      <Grid container justify="center" alignItems="center">
                        <Grid item sx={2}></Grid>
                        <Grid item sx={4} textAlign="center">
                          <Button
                            onClick={() =>
                              setFormEditFoodTracking(tracking.idTracking)
                            }
                          >
                            Edit
                          </Button>
                        </Grid>
                        <Grid item sx={4} textAlign="center">
                          <Button
                            color="error"
                            onClick={() =>
                              setFormDelFoodTracking(tracking.idTracking)
                            }
                          >
                            Delete
                          </Button>
                        </Grid>
                        <Grid item sx={2}></Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>
      )} */}

      {/* Add dialog */}
      <Dialog
        open={open}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>CREATE FEEDING PLAN</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            {/* <CreateFeedingPlan></CreateFeedingPlan> */}
            <Grid container spacing={2}>
              {/* Name */}
              <AnimalSelection
                formData={formData}
                onAnimalChange={(value) => {
                  setOnChangeAnimal(value);
                }}
              ></AnimalSelection>
              {/* Food Name */}
              <FoodSelection
                formData={formData}
                onFoodChange={(value) => {
                  setOnChangeFood(value);
                }}
              ></FoodSelection>
              {/* <Grid item xs={12}>
                <TextField
                  style={{ marginTop: "10px" }}
                  label="Chọn con vật cho ăn"
                  variant="outlined"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  fullWidth
                ></TextField>
                {formik.touched.name && formik.errors.name ? (
                  <Typography variant="caption" color="red">
                    {formik.errors.name}
                  </Typography>
                ) : null}
              </Grid> */}

              {/* <Grid item xs={12}>
                <TextField
                  style={{ marginTop: "10px" }}
                  label="Chọn con vật cho ăn"
                  variant="outlined"
                  fullWidth
                  select
                >
                  <MenuItem value="1">Henry</MenuItem>
                  <MenuItem value="2">Lior</MenuItem>
                  <MenuItem value="3">Daisy</MenuItem>
                </TextField>
              </Grid> */}

              {/* Date */}
              {/* <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={value}
                    value={dayjs(formik.values.date)}
                    onChange={() => {
                      dayjs(formik.handleChange);
                    }}
                    format="DD-MM-YYYY"
                    disablePast
                  />
                </LocalizationProvider>
              </Grid> */}
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dateValue}
                    onChange={(newDate) => setDateValue(newDate)}
                    format="DD/MM/YYYY"
                    disablePast
                  />
                </LocalizationProvider>
              </Grid>

              {/* Food Amount */}
              <Grid item xs={12}>
                <TextField
                  label="Lượng thức ăn"
                  variant="outlined"
                  name="foodAmount"
                  value={formik.values.foodAmount}
                  onChange={formik.handleChange}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Kg</InputAdornment>
                    ),
                  }}
                ></TextField>
                {formik.touched.foodAmount && formik.errors.foodAmount ? (
                  <Typography variant="caption" color="red">
                    {formik.errors.foodAmount}
                  </Typography>
                ) : null}
              </Grid>

              {/* Animal Health */}
              <Grid item xs={12}>
                <TextField
                  label="Sức khỏe"
                  variant="outlined"
                  name="animalHealth"
                  value={formik.values.animalHealth}
                  onChange={formik.handleChange}
                  fullWidth
                />
                {formik.touched.animalHealth && formik.errors.animalHealth ? (
                  <Typography variant="caption" color="red">
                    {formik.errors.animalHealth}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        // TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Edit Feeding Plan</DialogTitle>
        <DialogContent>
          {/* <CreateFeedingPlan></CreateFeedingPlan> */}
          <Grid container spacing={2}>
            {/* Name */}
            {/* <Grid item xs={12}>
              {formData && (
                <TextField
                  style={{ marginTop: "10px" }}
                  label="Chọn con vật cho ăn"
                  variant="outlined"
                  value={formData?.animal.name}
                  fullWidth
                ></TextField>
              )}
            </Grid> */}
            {formData && (
              <AnimalSelection
                formData={formData.animal.name}
                onAnimalChange={(value) => {
                  setOnChangeAnimal(value);
                }}
              ></AnimalSelection>
            )}

            {/* Date */}
            <Grid item xs={12}>
              {formData && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={
                      formData?.date ? dayjs(formData.date, "DD/MM/YYYY") : null
                    }
                    format="DD/MM/YYYY"
                    onChange={(newDate) => setDateValue(newDate)}
                    disablePast
                  />
                </LocalizationProvider>
              )}
            </Grid>

            {/* Food name */}
            {/* <Grid item xs={12}>
              {formData && (
                <TextField
                  label="Loại thức ăn"
                  variant="outlined"
                  value={formData?.food.name}
                  fullWidth
                ></TextField>
              )}
            </Grid> */}
            {formData && (
              <FoodSelection
                formData={formData.food.name}
                onFoodChange={(value) => {
                  setOnChangeFood(value);
                }}
              ></FoodSelection>
            )}

            {/* Food amout */}
            <Grid item xs={12}>
              {formData && (
                <TextField
                  label="Lượng thức ăn"
                  variant="outlined"
                  fullWidth
                  value={formData?.foodAmount}
                  onChange={(e) => {
                    setFormData({ ...formData, foodAmount: e.target.value });
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Kg</InputAdornment>
                    ),
                  }}
                />
              )}
            </Grid>
            {/* Health */}
            <Grid item xs={12}>
              {formData && (
                <TextField
                  label="Sức khỏe"
                  variant="outlined"
                  fullWidth
                  value={formData?.animalHealth}
                  onChange={(e) => {
                    setFormData({ ...formData, animalHealth: e.target.value });
                  }}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditFoodTracking}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        // TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color={"error"}>Delete This Feeding Plan ?</DialogTitle>
        <DialogContent>
          {/* <CreateFeedingPlan></CreateFeedingPlan> */}
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12}>
              {formData && (
                <TextField
                  style={{ marginTop: "10px" }}
                  label="Chọn con vật cho ăn"
                  variant="outlined"
                  value={formData?.animal.name}
                  disabled
                  fullWidth
                ></TextField>
              )}
            </Grid>

            {/* Date */}
            <Grid item xs={12}>
              {formData && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={
                      formData?.date ? dayjs(formData.date, "DD/MM/YYYY") : null
                    }
                    format="DD/MM/YYYY"
                    disablePast
                    disabled
                  />
                </LocalizationProvider>
              )}
            </Grid>

            {/* Food name */}
            <Grid item xs={12}>
              {formData && (
                <TextField
                  label="Loại thức ăn"
                  variant="outlined"
                  value={formData?.food.name}
                  disabled
                  fullWidth
                ></TextField>
              )}
            </Grid>

            {/* Food amout */}
            <Grid item xs={12}>
              {formData && (
                <TextField
                  label="Lượng thức ăn"
                  variant="outlined"
                  fullWidth
                  value={formData?.foodAmount}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Kg</InputAdornment>
                    ),
                  }}
                  disabled
                />
              )}
            </Grid>
            {/* Health */}
            <Grid item xs={12}>
              {formData && (
                <TextField
                  label="Sức khỏe"
                  variant="outlined"
                  fullWidth
                  value={formData?.animalHealth}
                  disabled
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button color="error" onClick={handleDelFoodTracking}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default FeedingSchedule;
