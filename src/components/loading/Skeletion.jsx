import Loading from "../loading/Loading.gif";

import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

Skeleton.propTypes = {};

function Skeleton(props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="40vh"
    >
      <img src={Loading} alt="Loading..."></img>
    </Box>
  );
}

export default Skeleton;

// const skeleton = () => <img src={Loading} alt="Loading..."></img>;

// export default skeleton;
