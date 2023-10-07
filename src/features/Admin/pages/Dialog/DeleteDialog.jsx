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

function DeleteDialog({ deleteData, setDeleteData, handleCloseDeleteDialog, handleDeleteAccount }) {

  return (
    <div>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent>
        <Typography

        >Are you sure you want to delete this account?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
        <TextField
          hidden
          value={deleteData.status}
          onChange={(e) => setDeleteData({ ...deleteData, status: false })}
        >
          <MenuItem value="false">Admin</MenuItem>
        </TextField>
        <Button color="error"


          onClick={handleDeleteAccount} >
          Delete
        </Button>
      </DialogActions>
    </div>

  );
}

export default DeleteDialog;