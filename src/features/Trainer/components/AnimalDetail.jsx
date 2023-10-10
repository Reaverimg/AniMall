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
    history.push(`/tranier/animalManage/${animal.idAnimal}`);
  };
  return (
    <Box padding={1}>
      {/* <Typography variant="body2">Name :{animal.name}</Typography>
      <Typography variant="body2">Cage :{animal.cage.cageName}</Typography>
      <Typography variant="body2">Quantity :{animal.cage.quantity}</Typography>
      <Typography variant="body2">
        {`${animal.sex}` === true ? "male" : "female"}
      </Typography>
      <Typography variant="body2">{animal.dob}</Typography>
      <Typography variant="body2">{animal.status}</Typography>
      <Typography variant="body2">{animal.description}</Typography>
      <Typography variant="body2"></Typography> */}
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
            Description : {animal.description}
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
