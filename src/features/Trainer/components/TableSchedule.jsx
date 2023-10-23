import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import UpdateFoodTracking from "../../Trainer/components/dialog/UpdateFoodTracking";

// import { updateFoodTracking } from "../../Trainer/components/dialog/updateFoodTracking";

TableSchedule.propTypes = {};

function TableSchedule(props) {
  function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs };
  }

  //open update dialog
  const [updateDialog, setUpdateDialog] = useState();

  const openUpdateDialog = () => {
    setUpdateDialog(true);
  };

  const closeUpdateDialog = () => {
    setUpdateDialog(false);
  };

  const rows = [
    createData("10/17/2023", 159, "Carrot", "Live "),
    createData("10/17/2023", 237, "Mía", "Sick"),
    createData("10/17/2023", 262, "Bắp cải", "Health Recovery"),
    createData("10/17/2023", 305, "Carrot", "Live"),
    createData("10/17/2023", 356, "Mía", "Sick"),
  ];

  return (
    <Box>
      {/* Table */}
      <Table sx={{ maxWidth: "50vw" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#FFFF" }}>
            <TableCell align="left">Date</TableCell>
            <TableCell align="center">Food Consume</TableCell>
            <TableCell align="center">Food Type</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="right">
                <Grid container justify="center" alignItems="center">
                  <Grid item sx={2}></Grid>
                  <Grid item sx={4} textAlign="center">
                    <Button onClick={openUpdateDialog}>Edit</Button>
                  </Grid>
                  <Grid item sx={4} textAlign="center">
                    <Button color="error">Delete</Button>
                  </Grid>
                  <Grid item sx={2}></Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Update Dialog */}
      <Dialog open={updateDialog}>
        <UpdateFoodTracking onClose={closeUpdateDialog}></UpdateFoodTracking>
      </Dialog>
    </Box>
  );
}

export default TableSchedule;
