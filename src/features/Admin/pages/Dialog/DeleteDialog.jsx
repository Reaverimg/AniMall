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
function DeleteDialog({  handleCloseDeleteDialog, handleDeleteAccount }) {

  return (
    <div>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent>
        <Typography

        >Are you sure you want to delete this account?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error"
          onClick={handleDeleteAccount} >
          Delete
        </Button>
        <Button variant="outlined" color="success" onClick={handleCloseDeleteDialog}>Cancel</Button>
      </DialogActions>
    </div>

  );
}

export default DeleteDialog;