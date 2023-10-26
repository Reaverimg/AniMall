import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GET_ALL_SPECIES } from "../../../api/SwaggerAPI";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import SpeciesDetail from "../components/SpeciesDetail";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

SpeciesManage.propTypes = {};

function SpeciesManage(props) {
  const [specieslList, setSpeciesList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterByName, setFilterByName] = useState([]);

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
  }, [searchValue, specieslList]);

  function handleFilterByName() {
    const filterdValues = specieslList.filter((specie) =>
      specie.speciesName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterByName(filterdValues);
  }

  return (
    <Box>
      <div className="row">
        <div className="col-1">
          <Box></Box>
        </div>
        <div className="col-10 pt-5">
          <div className="d-flex flex-row">
            <Stack direction="row" className="my-3">
              <Chip label="Species Manage" color="success" />
            </Stack>
          </div>
          <div className="d-flex justify-content-evenly my-3">
            <Box>
              <Button>
                <AddCircleOutlineIcon
                  sx={{ fontSize: 40 }}
                ></AddCircleOutlineIcon>
              </Button>
            </Box>
            <Box>
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
            </Box>
          </div>
          {filterByName.length === 0 ? (
            <div className="d-flex justify-content-end">
              <Typography align="inherit" color="red">
                No results found
              </Typography>
            </div>
          ) : (
            <Grid container spacing={5}>
              {filterByName.map((specie) => (
                <Grid item key={specie.idSpecie} xs={12} sm={6} md={6} lg={4}>
                  <SpeciesDetail specie={specie}></SpeciesDetail>
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

export default SpeciesManage;
