import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

SpecieAnimalsList.propTypes = {
  animal: PropTypes.object.isRequired,
};

const thumbnailUrl = "https://via.placeholder.com/300x250";

function SpecieAnimalsList({ animal }) {
  return (
    // console.log("specieAnimalList");
    <Box padding={1}>
      <Card sx={{ maxWidth: 333, maxHeight: 333 }}>
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

export default SpecieAnimalsList;
