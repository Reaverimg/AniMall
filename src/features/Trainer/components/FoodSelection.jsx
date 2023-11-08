import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
// import { GET_ALL_FOOD } from "../../../../public/api/SwaggerAPI";
import axios from "axios";

FoodSelection.propTypes = {
  onFoodChange: PropTypes.func,
  formData: PropTypes.string,
};

function FoodSelection({ formData, onFoodChange }) {
  const idAccount = JSON.parse(localStorage.getItem("ACCOUNT__LOGGED"));

  const [foods, setFoods] = useState();

  const [selectedFood, setSelectedFood] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://animall-400708.et.r.appspot.com/api/v1/food"
        );
        setFoods(response.data.data);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const selectedFoodName = event.target.value;
    setSelectedFood(selectedFoodName);
    if (onFoodChange) {
      return onFoodChange(selectedFoodName);
    }
  };

  return (
    <Grid item xs={12}>
      {selectedFood ? (
        <TextField
          label="Food Name"
          variant="outlined"
          fullWidth
          value={selectedFood}
          onChange={handleChange}
          select
        >
          {foods &&
            foods.map((item) => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
        </TextField>
      ) : (
        <TextField
          label="Food Name"
          variant="outlined"
          fullWidth
          value={formData}
          onChange={handleChange}
          select
        >
          {foods &&
            foods.map((item) => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
        </TextField>
      )}
    </Grid>
  );
}

export default FoodSelection;
