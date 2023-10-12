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
//deleteData, setDeleteData,
function DeleteDialog({  handleCloseDeleteDialog, handleDeleteTicket }) {

  return (
    <div>
      <DialogTitle>Delete Ticket</DialogTitle>
      <DialogContent>
        <Typography

        >Are you sure you want to delete this ticket?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error"
          onClick={handleDeleteTicket} >
          Delete
        </Button>
        <Button variant="outlined" color="success" onClick={handleCloseDeleteDialog}>Cancel</Button>
      </DialogActions>
    </div>

  );
}

export default DeleteDialog;