import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
// import { GET_ALL_ANIMALS } from "../../../../public/api/SwaggerAPI";

AnimalSelection.propTypes = {
  formData: PropTypes.string,
  onAnimalChange: PropTypes.func,
};

function AnimalSelection({ formData, onAnimalChange }) {
  const idStaff = JSON.parse(localStorage.getItem("ACCOUNT__LOGGED"));

  const [animals, setAnimals] = useState();

  const [selectedAnimal, setSelectedAnimal] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://animall-400708.et.r.appspot.com/api/v1/animals"
        );
        setAnimals(response.data.data);

        return response.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const selectedAnimalName = event.target.value;
    setSelectedAnimal(selectedAnimalName);
    console.log("selectedAnimalName len cha :", selectedAnimalName);
    console.log("set SelectedAnimal :", selectedAnimal);
    if (onAnimalChange) {
      return onAnimalChange(selectedAnimalName);
    }
  };

  return (
    <Grid item xs={12}>
      {selectedAnimal ? (
        <TextField
          style={{ marginTop: "10px" }}
          label="Food Name"
          variant="outlined"
          fullWidth
          value={selectedAnimal}
          onChange={handleChange}
          select
        >
          {animals &&
            animals
              .filter((item) => item.idAccount === idStaff.idAccount)
              .map((item) => (
                <MenuItem key={item.idAnimal} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
        </TextField>
      ) : (
        <TextField
          style={{ marginTop: "10px" }}
          label="Animal Name"
          variant="outlined"
          fullWidth
          value={formData}
          onChange={handleChange}
          select
        >
          {animals &&
            animals
              .filter((item) => item.idAccount === idStaff.idAccount)
              .map((item) => (
                <MenuItem key={item.idAnimal} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
        </TextField>
      )}
    </Grid>
  );
}

export default AnimalSelection;
