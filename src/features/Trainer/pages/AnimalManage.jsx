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
import SearchAnimal from "../components/SearchAnimal";
import FilterByCage from "../components/FilterByCage";
import { GET_ALL_SPECIES, GET_ALL_ANIMALS } from "../../../api/SwaggerAPI";
import AnimalDetail from "../components/AnimalDetail";

AnimalManage.propTypes = {};

function AnimalManage(props) {
  const [animalList, setAnimalList] = useState([]);
  const [specieslList, setSpeciesList] = useState([]);
  const [filterByName, setFilterByName] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  //Fetch API get all animals
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(GET_ALL_ANIMALS);
        const animalData = response.data.data;
        setAnimalList(animalData);
        console.log("animals :", animalData);
        console.log("animalList :", animalList);
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
        const response = await axios.get(GET_ALL_SPECIES);
        const speciesData = response.data.data;
        setSpeciesList(speciesData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  //Search by name
  // useEffect(() => {
  //   handleFilterByName();
  // }, [searchValue, animalList]);

  // function handleFilterByName() {
  //   const filterdValue = animalList.filter((animal) =>
  //     animal.cage.cageName.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  //   setFilterByName(filterdValue);
  // }

  //Filter by Cage

  return (
    <Box>
      <div class="row pt-5">
        <div className="col-1">
          <Box></Box>
        </div>
        <div className="col-10">
          <div className="d-flex flex-row">
            <Stack direction="row" className="my-3">
              <Chip label="Animals Manage" color="success" />
            </Stack>
          </div>
          <div className="d-flex flex-row-reverse my-3">
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
            <FilterByCage></FilterByCage>
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
          <Grid container spacing={1}>
            {animalList.map((animal) => (
              <Grid item key={animal.idAnimal} xs={12} sm={6} md={4} lg={3}>
                <AnimalDetail animal={animal}></AnimalDetail>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className="col-1">
          <Box></Box>
        </div>
      </div>
    </Box>
  );
}

export default AnimalManage;
