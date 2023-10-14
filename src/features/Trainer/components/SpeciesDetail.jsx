import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

SpeciesDetail.propTypes = {
  specie: PropTypes.object.isRequired,
};

function SpeciesDetail({ specie }) {
  const history = useHistory();

  //Redirect to Species Detail
  const handleClick = () => {
    const cleanedIdSpecie = encodeURIComponent(specie.idSpecie);
    history.push(`/trainer/speciesManage/${cleanedIdSpecie}`);
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 250, maxWidth: 350 }}>
        <CardContent>
          <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
            Loài : {specie.speciesName}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Nguồn gốc : {specie.origin}
          </Typography>
          {/* <Typography variant="body2">
            Đặc điểm : {specie.description}
          </Typography> */}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            More Detail
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default SpeciesDetail;
