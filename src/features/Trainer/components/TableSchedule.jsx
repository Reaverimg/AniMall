import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import * as React from "react";

TableSchedule.propTypes = {};

function TableSchedule(props) {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24),
    createData("Ice cream sandwich", 237, 9.0, 37),
    createData("Eclair", 262, 16.0, 24),
    createData("Cupcake", 305, 3.7, 67),
    createData("Gingerbread", 356, 16.0, 49),
  ];

  return (
    <Table sx={{ maxWidth: "50vw" }}>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#FFFF" }}>
          <TableCell align="left">Date</TableCell>
          <TableCell align="center">Food Consume</TableCell>
          <TableCell align="center">Food Type</TableCell>
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
            <TableCell align="center">{row.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableSchedule;
