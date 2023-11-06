import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

function UnbanDialog({  handleCloseUnbanDialog, handleUnbanAnimal }) {

  return (
    <div>
      <DialogTitle sx={{color:'Blue'}}>Reborn this animal </DialogTitle>
      <DialogContent>
        <Typography

        >Are you sure you want to reborn this animal?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" 
          onClick={handleUnbanAnimal} >
          Reborn
        </Button>
        <Button variant="outlined" color="success" onClick={handleCloseUnbanDialog}>Cancel</Button>
      </DialogActions>
    </div>

  );
}

export default UnbanDialog;