import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const thumbnailUrl = "https://via.placeholder.com/690x366";

AnimalDetail.propTypes = {
  animal: PropTypes.object.isRequired,
};

function AnimalDetail({ animal }) {
  const history = useHistory();

  //   const thumbnailUrl = animal.thumbnail;
  const handleClick = () => {
    const cleanedIdAnimal = encodeURIComponent(animal.idAnimal);
    history.push(`/trainer/animalManage/${cleanedIdAnimal}`);
    console.log(history);
  };
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
            Name :{animal.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Cage : {animal.cage.cageName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sex : {animal.sex ? "male" : "female"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            Take care
          </Button>
          <Button size="small">Species Info</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default AnimalDetail;
