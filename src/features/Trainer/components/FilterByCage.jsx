import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { GET_ALL_ANIMALS } from "../../../api/SwaggerAPI";

FilterByCage.propTypes = {};

function FilterByCage(props) {
  const [animalList, setAnimalList] = useState([]);

  const [cages, setCages] = useState([
    {
      value: "",
      label: "",
    },
  ]);

  //Fetch API get all Species
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://animall-400708.et.r.appspot.com/api/v1/animals"
        );
        const animalData = response.data.data;
        setAnimalList(animalData);
        const filterCages = animalData.map((obj) => ({
          value: obj.cage.idCage,
          label: obj.cage.cageName,
        }));
        const FilterDuplicate = filterCages.filter((item, index, self) => {
          return (
            index ===
            self.findIndex(
              (t) => t.value === item.value && t.label === item.label
            )
          );
        });
        setCages(FilterDuplicate);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="pe-3">
      <TextField
        select
        label="Select"
        defaultValue="99b13ab9-ecf4-4196-991d-a0826fd988a8"
        onChange={(e) => e.target.value}
      >
        {cages.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export default FilterByCage;
