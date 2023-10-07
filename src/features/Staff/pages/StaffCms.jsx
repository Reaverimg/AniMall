import React from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

StaffCms.propTypes = {};

function StaffCms(props) {
  return <div>
    Staff CMS
    <Box>
      <Button color="inherit">
        <NavLink
          style={{ color: "black", textDecoration: "none" }}
          to="/areas"
          activeClassName="active"
        >
          AREAS
        </NavLink>
      </Button>
      <Button color="inherit">
        <NavLink
          style={{ color: "black", textDecoration: "none" }}
          to="/news"
          activeClassName="active"
        >
          NEWS
        </NavLink>
      </Button>
    </Box>
  </div>;
}

export default StaffCms;
