import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Chip,
  InputAdornment,
  Slide,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import "../../Trainer/styles/animalManage.css";
import CreateFeedingPlan from "../components/CreateFeedingPlan";

FeedingSchedule.propTypes = {};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FeedingSchedule(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <div className="col-1">
          <Box></Box>
        </div>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Create a feeding plan</DialogTitle>
        <DialogContent>
          {/* <CreateFeedingPlan></CreateFeedingPlan> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default FeedingSchedule;
