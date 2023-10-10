import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect } from "react";
import { GET_ALL_SPECIES, GET_ALL_ANIMALS } from "../../../api/SwaggerAPI";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

SpeciesManage.propTypes = {};

function SpeciesManage(props) {
  const [specieslList, setSpeciesList] = useState([]);

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

  return (
    <Box>
      <Grid container spacing={1}>
        {specieslList.map((specie) => (
          <Grid item key={specie.idSpecie} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 250, maxWidth: 350 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 25 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {specie.speciesName}
                </Typography>
                <Typography variant="h5" component="div"></Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Nguồn gốc : {specie.origin}
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SpeciesManage;
