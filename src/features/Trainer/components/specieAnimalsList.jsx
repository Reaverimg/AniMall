import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Button } from "bootstrap";

specieAnimalList.propTypes = {
  animals: PropTypes.object.isRequired,
};

const thumbnailUrl = "https://via.placeholder.com/300x250";

function specieAnimalList({ animal }) {
  return (
    <Box padding={1}>
      <Card sx={{ maxWidth: 400, maxHeight: 500 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={thumbnailUrl}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name :{animal.name} - Cage : {animal.cage.cageName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* Description : {animal.description} */}
            Sex : {animal.sex ? "male" : "female"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default specieAnimalList;
