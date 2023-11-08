import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Icon,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import "../../Trainer/styles/animalManage.css";
import FilterByCage from "../components/FilterByCage";
// import { GET_ALL_SPECIES, GET_ALL_ANIMALS } from "../../../api/SwaggerAPI";
import AnimalDetail from "../components/AnimalDetail";
import Skeleton from "../../../components/loading/Skeletion";

AnimalManage.propTypes = {};

function AnimalManage(props) {
  const [animalList, setAnimalList] = useState([]);

  const [specieslList, setSpeciesList] = useState([]);

  const [filterByName, setFilterByName] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchValue, setSearchValue] = useState("");

  const [open, setOpen] = useState(false);

  const [dialogInfo, setDialogInfo] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const idAccount = JSON.parse(localStorage.getItem("ACCOUNT__LOGGED"));

  //Fetch API get all animals
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://animall-400708.et.r.appspot.com/api/v1/animals"
        );
        const animalData = response.data.data;
        setAnimalList(animalData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  //Fetch API get all Species
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://animall-400708.et.r.appspot.com/api/v1/species"
        );
        const speciesData = response.data.data;
        setSpeciesList(speciesData);
        console.log("specieslList:", speciesData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  //Search by name
  useEffect(() => {
    handleFilterByName();
  }, [searchValue, animalList]);

  function handleFilterByName() {
    const filterdValue = animalList.filter(
      (animal) =>
        animal.cage.cageName
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        animal.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterByName(filterdValue);
  }

  const openDialog = (id) => {
    console.log("id tren cha:", id);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://animall-400708.et.r.appspot.com/api/v1/animals/${id}`
        );
        setDialogInfo(response.data.data);
        console.log("Data from API:", response.data.data);
        handleClickOpen();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  };

  return (
    <Box>
      <div class="row pt-5">
        <div className="col-1">
          <Box></Box>
        </div>
        <div className="col-10">
          <div className="sub-header mb-5">
            <div className="d-flex flex-row">
              <Stack direction="row">
                <div className="d-flex">
                  <div className="title-shape"></div>

                  <Typography className="title-typo" variant="h6" gutterBottom>
                    Animals Manage
                  </Typography>
                </div>
              </Stack>
            </div>
            <div className="d-flex">
              <TextField
                sx={{ width: "420px" }}
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
            </div>
          </div>
          {loading ? (
            <Skeleton /> // Show Skeleton component when loading is true
          ) : filterByName && filterByName.length === 0 ? (
            // Show "No results found" message when filterByName is empty
            <div className="d-flex justify-content-end">
              <Typography color="error">No results found</Typography>
            </div>
          ) : (
            // Render the list of animals when filterByName is not empty and loading is false
            <Grid container spacing={5}>
              {filterByName
                .filter((animal) => animal.idAccount === idAccount.idAccount)
                .map((animal) => (
                  <Grid item key={animal.idAnimal} xs={12} sm={6} md={6} lg={4}>
                    <AnimalDetail animal={animal} onOpen={openDialog} />
                  </Grid>
                ))}
            </Grid>
          )}
        </div>
        <div className="col-1">
          <Box></Box>
        </div>
      </div>

      <Dialog open={open}>
        <DialogTitle>
          Specie : {dialogInfo?.specie.status ? dialogInfo?.specie.specieName : "Not species attached to this one yet"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Specie info :{" "}
            {dialogInfo?.specie.status ? dialogInfo?.specie.description : "Not species attached to this one yet"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AnimalManage;
