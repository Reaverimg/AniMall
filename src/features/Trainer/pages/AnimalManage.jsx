import {
  Box,
  Chip,
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

AnimalManage.propTypes = {};

function AnimalManage(props) {
  const [animalList, setAnimalList] = useState([]);

  const [specieslList, setSpeciesList] = useState([]);

  const [filterByName, setFilterByName] = useState([]);

  const [searchValue, setSearchValue] = useState("");

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

          {filterByName && filterByName.length === 0 ? (
            <div className="d-flex justify-content-end">
              <Typography align="inherit" color="red">
                No results found
              </Typography>
            </div>
          ) : (
            <Grid container spacing={5}>
              {filterByName
                .filter((animal) => animal.idAccount === idAccount.idAccount)
                .map((animal) => (
                  <Grid item key={animal.idAnimal} xs={12} sm={6} md={6} lg={4}>
                    <AnimalDetail animal={animal}></AnimalDetail>
                  </Grid>
                ))}
            </Grid>
          )}
        </div>
        <div className="col-1">
          <Box></Box>
        </div>
      </div>
    </Box>
  );
}

export default AnimalManage;
