import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

SpeciesDetail.propTypes = {
  specie: PropTypes.object,
  getId: PropTypes.func,
};

function SpeciesDetail({ specie, getId }) {
  const history = useHistory();
  //Redirect to Species Detail
  const handleClick = () => {
    if (specie) {
      const cleanedIdSpecie = encodeURIComponent(specie.idSpecie);
      history.push(`/trainer/speciesManage/${cleanedIdSpecie}`);
    }
  };

  const setDeleteForm = (id) => {
    if (getId) {
      getId(id);
    }
  };

  return (
    <Box>
      <CardContent>
        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
          Specie : {specie.specieName}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Origin : {specie.origin}
        </Typography>
        {/* <Typography variant="body2">
            Đặc điểm : {specie.description}
          </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>
          More Detail
        </Button>
        <Button
          color="warning"
          size="small"
          onClick={() => {
            setDeleteForm(specie.idSpecie);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Box>
  );
}

export default SpeciesDetail;
