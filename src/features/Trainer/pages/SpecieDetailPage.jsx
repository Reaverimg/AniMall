import {
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import SettingsRoundedIcon from "@mui/icons-material/Settings";
import SpecieAnimalsList from "../../Trainer/components/SpecieAnimalsList";

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

  const handleEditDialogOpen = () => setEditDialogOpen(true);

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
          console.log("SpecieAnimals :", specieAnimals);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [match]);

  return (
    <Box>
      <div className="row pt-5">
        {/* col-2 */}
        <div className="col-2"></div>
        {/* col-8 */}
        <div className="col-8">
          <div
            className="card mb-3 "
            style={{ maxWidth: "100vw", maxHeight: "250px" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={thumbnailUrl}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div class="d-flex flex-row-reverse">
                    <Button onClick={handleEditDialogOpen}>
                      <SettingsRoundedIcon></SettingsRoundedIcon>
                    </Button>
                  </div>
                  <div class="d-flex flex-row ">
                    <h5 className="card-title">Loài : {specie.speciesName} </h5>
                  </div>
                  <p className="card-text">Nguồn gốc : {specie.origin}</p>
                  <p className="card-text">
                    Đặc điểm của loài : {specie.description}
                  </p>
                  <p className="card-text">
                    Loài thức ăn : {specie.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Table row */}
        <div className="row">
          <div className="d-flex justify-content-center">
            {specieAnimals.map((animal) => (
              <SpecieAnimalsList animal={animal}></SpecieAnimalsList>
            ))}
          </div>
        </div>

        {/* col-2 */}
        <div className="col-2"></div>
      </div>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditDialogClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SpecieDetailPage;
