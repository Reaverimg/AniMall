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
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

function DeleteDialog({  handleCloseDeleteDialog, handleDeleteAnimal }) {

  return (
    <div>
      <DialogTitle sx={{color:'red'}}>Kill or fire this animal <WarningAmberOutlinedIcon/></DialogTitle>
      <DialogContent>
        <Typography

        >Are you sure you want to kill or fire this animal?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error"
          onClick={handleDeleteAnimal} >
          Delete
        </Button>
        <Button variant="outlined" color="success" onClick={handleCloseDeleteDialog}>Cancel</Button>
      </DialogActions>
    </div>

  );
}

export default DeleteDialog;