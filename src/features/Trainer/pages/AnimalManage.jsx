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
import AnimalDetail from "../components/AnimalDetail";
import SearchIcon from "@mui/icons-material/Search";
import "../../Trainer/styles/animalManage.css";
import SearchAnimal from "../components/SearchAnimal";
import FilterByCage from "../components/FilterByCage";
import { GET_ALL_SPECIES, GET_ALL_ANIMALS } from "../../../api/SwaggerAPI";

AnimalManage.propTypes = {};

function AnimalManage(props) {
  const [animalList, setAnimalList] = useState([]);
  const [specieslList, setSpeciesList] = useState([]);
  const [filterByName, setFilterByName] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // useEffect(() => {
  // const fetchAnimals = async () => {
  //   try {
  //     const response = await fetch("http://animall-400708.et.r.appspot.com/api/v1/animals", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log(responseData);
  //       setAnimals(responseData.data);
  //       console.log(animals);
  //     } else {
  //       throw new Error("Không thể lấy dữ liệu từ API.");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi lấy dữ liệu từ API:", error);
  //   }
  // };
  // fetchAnimals();
  // }, []);

  //Fetch API get all animals
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(GET_ALL_ANIMALS);
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
  useEffect(() => {
    handleFilterByName();
  }, [searchValue, animalList]);

  function handleFilterByName() {
    const filterdValue = animalList.filter((animal) =>
      animal.cage.cageName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterByName(filterdValue);
  }

  //Filter by Cage

  return (
    <Box className="Trainer_AM_container container">
      <div class="row">
        <div className="col-1">
          <Box></Box>
        </div>
        <div className="col-10">
          <div className="d-flex">
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
          {filterByName.length === 0 ? (
            <div>
              <Typography
                className="d-flex flex-row-reverse"
                align="inherit"
                color="red"
              >
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
          )}
          {filterByName.length === 0 && (
            <Grid container spacing={1}>
              {animalList.map((animal) => (
                <Grid item key={animal.idAnimal} xs={12} sm={6} md={4} lg={3}>
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
