import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

function CreateDialog({ handleCloseCreateDialog, fetchCageAPI }) {
  const url = "https://animall-400708.et.r.appspot.com/api/v1";
  const [formData, setFormData] = useState({
    cageName: "",
    quantity: 0,
    status: false,
    idArea: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const [areaList, setAreaList] = useState([]);
  const fetchListArea = async () => {
    try {
      // Nếu searchValue không có giá trị, thực hiện API trong fetchAreaList
      const response = await fetch(`${url}/areas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        if (
          responseData.message === "OPERATION SUCCESSFUL" &&
          responseData.data
        ) {
          setAreaList(responseData.data); // Gán dữ liệu vào listArea
        }
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    fetchListArea();
  }, []);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(`${url}/cages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        enqueueSnackbar("Create successful", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        fetchCageAPI();
        handleCloseCreateDialog();
      } else {
        enqueueSnackbar("Create failed", {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  // const handleChangeForm = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };
  return (
    <Box>
      <div className="p-5">
        <Grid container spacing={2}>
          <div className="flex flex-column">
            <Typography variant="h3" className="pb-4">
              Create cage
            </Typography>
            <form onSubmit={handleOnSubmit}>
              <Typography className="pt-2">Cage Name</Typography>
              <TextField
                className="pt-2"
                id="cageName"
                name="cageName"
                fullWidth
                placeholder="Input cage name here"
                required
                value={formData.cageName}
                onChange={handleChangeForm}
              ></TextField>
              <Typography className="pt-2">Cage Quantity</Typography>
              <TextField
                className="pt-2"
                type="number"
                id="quantity"
                name="quantity"
                fullWidth
                required
                value={formData.quantity}
                onChange={handleChangeForm}
              ></TextField>
              <Typography className="pt-2">Status</Typography>
              <Select
                name="status"
                required
                fullWidth
                value={formData.status}
                onChange={handleChangeForm}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Unactive</MenuItem>
              </Select>
              <Typography className="pt-2">Choose Area</Typography>
              <Select
                name="idArea"
                fullWidth
                required
                value={formData.idArea}
                onChange={handleChangeForm}
              >
                {areaList.map((area) => (
                  <MenuItem key={area.idArea} value={area.idArea}>
                    Khu vực {area.areaName}
                  </MenuItem>
                ))}
              </Select>
              <Button
                type="submit"
                variant="contained"
                color="success"
                className="pt-2"
              >
                Submit
              </Button>
            </form>
          </div>
        </Grid>
      </div>
    </Box>
  );
}

export default CreateDialog;
