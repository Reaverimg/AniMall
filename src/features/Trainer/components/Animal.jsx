import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

Animal.propTypes = {
  animal: PropTypes.object.isRequired,
};

function Animal({ animal }) {
  const history = useHistory();

  //   const thumbnailUrl = animal.thumbnail;

  const handleClick = () => {
    history.push(`/animals/${animal.idAnimal}`);
  };
  return (
    <Box padding={1} onClick={handleClick}>
      {/* <Box padding={1} minHeight="115px">
        <img src={thumbnailUrl} alt={animal.name} width="100%"></img>
      </Box> */}
      <Typography variant="body2">{animal.description}</Typography>
      <Typography variant="body2"></Typography>
    </Box>
  );
}

export default Animal;
