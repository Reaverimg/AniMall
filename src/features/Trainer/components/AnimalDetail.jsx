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

const thumbnailUrl = "https://shorturl.at/atQTY";

AnimalDetail.propTypes = {
  animal: PropTypes.object.isRequired,
};

function AnimalDetail({ animal }) {
  const history = useHistory();

  const styles = {
    card: {
      maxWidth: 350,
      maxHeight: 500,
      boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)", // Change the last parameter for the opacity level
    },
    cardMedia: {
      height: 180,
      borderRadius: "0 0 4% 4%",
    },
    btnInfor: {
      border: "1px solid green",
      padding: "1% 2%",
      color: "#006B3E",
      borderRadius: "6px",
    },
  };

  //   const thumbnailUrl = animal.thumbnail;
  const handleClick = () => {
    const cleanedIdAnimal = encodeURIComponent(animal.idAnimal);
    history.push(`/trainer/animalManage/${cleanedIdAnimal}`);
    console.log(history);
  };

  return (
    <Box padding={1}>
      <Card sx={styles.card}>
        <CardMedia
          sx={styles.cardMedia}
          image={thumbnailUrl}
          title="green iguana"
        />

        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            {animal.name}
          </Typography>
          {/* <Typography gutterBottom variant="h5" component="div">
            Cage : {animal.cage.cageName}
          </Typography> */}
          <Typography
            sx={{
              backgroundColor: "#006B3E",
              padding: "1% 2%",
              color: "white",
              borderRadius: "6px",
            }}
            variant="body2"
            color="text.secondary"
          >
            {animal.sex ? "Male" : "Female"}
          </Typography>
        </CardContent>

        <CardActions sx={{ margin: 1 }}>
          <Button
            sx={{
              padding: "1% 2%",
              color: "white",
              borderRadius: "6px",
              backgroundColor: "#006B3E",
            }}
            size="small"
            onClick={handleClick}
          >
            Take care
          </Button>
          <Button sx={styles.btnInfor} size="small">
            Species Info
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default AnimalDetail;
