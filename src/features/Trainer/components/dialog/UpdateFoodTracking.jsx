import { Grid, InputAdornment, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import React from "react";

UpdateFoodTracking.propTypes = {
  onClose: PropTypes.func.isRequired,
};

function UpdateFoodTracking({ onClose }) {
  return (
    <div>
      <DialogTitle>Update Feeding Plan</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ paddingTop: "20px" }}>
          <Grid item xs={12}>
            <TextField
              label="Food amount"
              variant="outlined"
              value={"7"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Kg</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Status"
              value={1}
              variant="outlined"
              fullWidth
              select
            >
              <MenuItem value="1">Sick</MenuItem>
              <MenuItem value="2">Live</MenuItem>
              <MenuItem value="3">Trainer</MenuItem>
              <MenuItem value="4">Dead</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </div>
  );
}

export default UpdateFoodTracking;
