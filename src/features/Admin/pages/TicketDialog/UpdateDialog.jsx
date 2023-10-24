import React from "react";
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
function UpdateDialog({ handleCloseUpdateDialog, updateData, setUpdateData, handleUpdateTicket, updateFail }) {

  return (
    <div>
      <DialogTitle>
        Update Ticket
        <IconButton
          aria-label="close"
          onClick={handleCloseUpdateDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>

          {/* Name */}
          <Grid item xs={12}>
            <TextField style={{ marginTop: '10px' }}
              label="Ticket Name"
              variant="outlined"
              fullWidth
              value={updateData.ticketName}
              onChange={(e) => setUpdateData({ ...updateData, ticketName: e.target.value })}
            />
          </Grid>

          {/* Price */}
          <Grid item xs={12}>
            <TextField
              label="Ticket Price"
              variant="outlined"
              fullWidth
              value={updateData.ticketPrice}
              onChange={(e) => setUpdateData({ ...updateData, ticketPrice: e.target.value })}
            />
          </Grid>

          {/* Type */}
          <Grid item xs={12}>
            <TextField
              label="Ticket Type"
              variant="outlined"
              fullWidth
              select
              value={updateData.ticketType}
              onChange={(e) => setUpdateData({ ...updateData, ticketType: e.target.value })}
            >
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="Adult Premium">Adult Premium</MenuItem>
            </TextField>
          </Grid>

          {/* Status */}
          <Grid item xs={12}>
            <TextField
              label="Ticket Status"
              variant="outlined"
              fullWidth
              select
              value={updateData.status}
              onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Disable</MenuItem>
            </TextField>
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleUpdateTicket}
          color="success"
          variant="contained">
          Confirm
        </Button>
        <Button
          onClick={handleCloseUpdateDialog}
          color="error"
          variant="outlined">Cancel</Button>
      </DialogActions>

      {/* Fail alert */}
      {updateFail && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 20
          }}>
          <Paper>
            <Alert variant="filled" severity="error">
              Error, please try again !!
            </Alert>
          </Paper>
        </div>
      )}
    </div>

  );
}

export default UpdateDialog;