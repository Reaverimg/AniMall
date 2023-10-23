import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Chip,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
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
import { GET_ALL_ANIMALS } from "../../../api/SwaggerAPI";
import "../../Trainer/styles/animalManage.css";

FeedingSchedule.propTypes = {};

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

function FeedingSchedule(props) {
  const [open, setOpen] = useState();

  const currentDate = new Date();

  const [value, setValue] = useState(dayjs(currentDate));

  const [selectedDate, setSelectedDate] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleDateOpen = () => setIsOpen(true);

  const handleDateClose = () => setIsOpen(false);

  const [editDialogOpen, setEditDialogOpen] = useState();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState();

  const [animalFoodTrackings, setAnimalFoodTrackigng] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      foodType: "",
      foodAmount: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Vui lòng chọn con vật cho ăn"),
      date: yup.date().required("Vui lòng chọn ngày"),
      foodType: yup.string().required("Vui lòng chọn loại thức ăn"),
      foodAmount: yup
        .number()
        .required("Vui lòng nhập lượng thức ăn")
        .positive("Lượng thức ăn phải lớn hơn 0"),
    }),
    onSubmit: async (values) => {
      try {
      } catch (error) {
        console.error("Error during registration:", error);
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditDialogOpen = () => setEditDialogOpen(true);

  const handleEditDialogClose = () => setEditDialogOpen(false);

  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true);

  const handleDeleteDialogClose = () => setDeleteDialogOpen(false);

  useEffect(() => {
    async function fetchData(page) {
      try {
        const response = await axios.get(
          `http://animall-400708.et.r.appspot.com/api/v1/foodtracking/`
        );
        const responseData = response.data.data;
        console.log("data :", responseData);
        setAnimalFoodTrackigng(responseData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Box>
      <div class="row pt-5">
        <div className="col-1">
          <Box></Box>
        </div>
        <div className="col-10">
          <div className="d-flex flex-row">
            <Stack direction="row" className="my-3">
              <Chip label="Feeding Schedule" color="success" />
            </Stack>
          </div>
          <div className="d-flex justify-content-evenly my-3">
            <Box>
              <Button onClick={handleClickOpen}>
                <AddCircleOutlineIcon
                  sx={{ fontSize: 40 }}
                ></AddCircleOutlineIcon>
              </Button>
            </Box>
            <Box>
              <TextField
                label="Search"
                variant="outlined"
                //   value={searchValue}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon></SearchIcon>
                    </InputAdornment>
                  ),
                }}
                //   onChange={(e) => setSearchValue(e.target.value)}
              ></TextField>
            </Box>
          </div>
          <Grid containerspacing={2}>
            <Grid item sx={12}></Grid>
          </Grid>

          {/* filter by name */}
          {/* {filterByName.length === 0 ? (
            <div className="d-flex justify-content-end">
              <Typography align="inherit" color="red">
                No results found
              </Typography>
            </div>
          ) : (
            <Grid container spacing={1}>
              {filterByName.map((animal) => (
                <Grid item key={animal.idAnimal} xs={12} sm={6} md={4} lg={3}>
                  <AnimalDetail animal={animal}></AnimalDetail>
                </Grid>
              ))}
            </Grid>
          )} */}
        </div>
        <div className="col-1"></div>
      </div>
      {/* Table Food Trackings */}

      <Grid container justifyContent="center" alignItems="center" sx={12}>
        <Table sx={{ maxWidth: "50vw" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FFFF" }}>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Animal Name</TableCell>
              <TableCell align="center">Food Type</TableCell>
              <TableCell align="center">Food Consume</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animalFoodTrackings.map((tracking) => {
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {tracking.foodTrackings.date}
                </TableCell>
                <TableCell align="center">{tracking.calories}</TableCell>
                <TableCell align="center">{tracking.fat}</TableCell>
                <TableCell align="center">{tracking.carbs}</TableCell>
                <TableCell align="right">
                  <Grid container justify="center" alignItems="center">
                    <Grid item sx={2}></Grid>
                    <Grid item sx={4} textAlign="center">
                      <Button onClick={handleEditDialogOpen}>Edit</Button>
                    </Grid>
                    <Grid item sx={4} textAlign="center">
                      <Button color="error" onClick={handleDeleteDialogOpen}>
                        Delete
                      </Button>
                    </Grid>
                    <Grid item sx={2}></Grid>
                  </Grid>
                </TableCell>
              </TableRow>;
            })}
          </TableBody>
        </Table>
      </Grid>

      {/* Add dialog */}
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Create a feeding plan</DialogTitle>
        <DialogContent>
          {/* <CreateFeedingPlan></CreateFeedingPlan> */}
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12}>
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
            </Grid>

            {/* Date */}
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  format="MM-DD-YYYY"
                  disablePast
                />
              </LocalizationProvider>
            </Grid>

            {/* Status */}
            <Grid item xs={12}>
              <TextField
                label="Loại thức ăn"
                variant="outlined"
                fullWidth
                select
              >
                <MenuItem value="true">Chay</MenuItem>
                <MenuItem value="false">Mặn</MenuItem>
              </TextField>
            </Grid>

            {/* Phone */}
            <Grid item xs={12}>
              <TextField
                label="Lượng thức ăn"
                variant="outlined"
                fullWidth
                endAdornment={
                  <InputAdornment position="end">kg</InputAdornment>
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
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
            <Grid item xs={12}>
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
            </Grid>

            {/* Date */}
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  format="MM-DD-YYYY"
                  disablePast
                />
              </LocalizationProvider>
            </Grid>

            {/* Status */}
            <Grid item xs={12}>
              <TextField
                label="Loại thức ăn"
                variant="outlined"
                fullWidth
                select
              >
                <MenuItem value="true">Chay</MenuItem>
                <MenuItem value="false">Mặn</MenuItem>
              </TextField>
            </Grid>

            {/* Phone */}
            <Grid item xs={12}>
              <TextField
                label="Lượng thức ăn"
                variant="outlined"
                fullWidth
                endAdornment={
                  <InputAdornment position="end">kg</InputAdornment>
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditDialogClose}>Confirm</Button>
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
              <TextField
                style={{ marginTop: "10px" }}
                label="Chọn con vật cho ăn"
                variant="outlined"
                fullWidth
                value={1}
                select
              >
                <MenuItem value="1">Henry</MenuItem>
                <MenuItem value="2">Lior</MenuItem>
                <MenuItem value="3">Daisy</MenuItem>
              </TextField>
            </Grid>

            {/* Date */}
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  format="MM-DD-YYYY"
                  disablePast
                />
              </LocalizationProvider>
            </Grid>

            {/* Status */}
            <Grid item xs={12}>
              <TextField
                label="Loại thức ăn"
                variant="outlined"
                value={true}
                fullWidth
                select
              >
                <MenuItem value="true">Chay</MenuItem>
                <MenuItem value="false">Mặn</MenuItem>
              </TextField>
            </Grid>

            {/* Phone */}
            <Grid item xs={12}>
              <TextField
                label="Lượng thức ăn"
                variant="outlined"
                fullWidth
                value={"7kg"}
                endAdornment={
                  <InputAdornment position="end">kg</InputAdornment>
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button color="error" onClick={handleDeleteDialogClose}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default FeedingSchedule;
