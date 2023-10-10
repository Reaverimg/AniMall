import React from "react";
import PropTypes from "prop-types";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { GET_ALL_ANIMALS } from "../../../api/SwaggerAPI";
SearchAnimal.propTypes = {};

function SearchAnimal(props) {
  // const [filterByName, setFilterByName] = useState([]);

  // const [animalList, setAnimalList] = useState([]);

  // const [searchValue, setSearchValue] = useState("");

  // //Search by name
  // useEffect(() => {
  //   handleFilterByName();
  // }, [searchValue, animalList]);

  // function handleFilterByName() {
  //   const filterdValue = animalList.filter((animal) =>
  //     animal.cage.cageName.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  //   setFilterByName(filterdValue);
  // }

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(GET_ALL_ANIMALS);
  //       const animalData = response.data.data;
  //       setAnimalList(animalData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return <TextField label="Search" variant="outlined" size="small"></TextField>;
}

export default SearchAnimal;
