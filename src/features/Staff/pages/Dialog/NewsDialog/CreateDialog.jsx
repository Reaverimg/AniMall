import {
  Button,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar, useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

function CreateDialog({ fetchAllNewsList, handleCloseCreateDialog }) {
  const { enqueueSnackbar } = useSnackbar();
  const [formNewData, setFormNewData] = useState({
    title: "",
    content: "",
    categoryId: "",
    idAccount: "739a753d-c23a-4b7b-ace6-a3544a5acf48",
    imageList: [
      {
        url: "",
      },
    ],
  });
  const [categoryList, setCategoryList] = useState([]);
  const apiUrl = "https://animall-400708.et.r.appspot.com/api/v1";

  const handleTextFieldChange = (e, fieldName) => {
    const updatedForm = { ...formNewData };
    updatedForm[fieldName] = e.target.value;
    setFormNewData(updatedForm);
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${apiUrl}/categories`, {
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
          setCategoryList(responseData.data);
          console.log("Fetch successfully");
        }
      }
    } catch (err) {
      console.log("Lỗi: " + err);
    }
  };
  useEffect(() => {
    fetchCategory();
    console.log(formNewData);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/news`, {
        method: "POST",
        body: JSON.stringify(formNewData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        enqueueSnackbar("Create succesfully", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
        fetchAllNewsList("");
        setTimeout(() => {
          handleCloseCreateDialog(true);
        }, 1000);
      } else {
        alert("Update failed");
        console.log("Update failed");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = () => {
    console.log(formNewData);
  };
  const handleImageUrlChange = (e) => {
    const updatedImageList = [{ url: e.target.value }];
    const updatedForm = { ...formNewData, imageList: updatedImageList };
    setFormNewData(updatedForm);
  };

  return (
    <div style={{ width: 500, padding: 15 }}>
      <Typography>Create New</Typography>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <Grid container sx={{ p: 1 }}>
          <Grid item xs={12}>
            <TextField
              id="title"
              name="Title"
              label="News Title"
              variant="outlined"
              fullWidth={true}
              onChange={(e) => {
                setFormNewData({ ...formNewData, title: e.target.value });
              }}
              value={formNewData.title}
            ></TextField>
          </Grid>
        </Grid>
        <Grid container sx={{ p: 1 }}>
          <Grid item xs={12}>
            <TextField
              id="content"
              name="Content"
              label="News Content"
              variant="outlined"
              fullWidth={true}
              onChange={(e) => {
                setFormNewData({ ...formNewData, content: e.target.value });
              }}
              value={formNewData.content}
            ></TextField>
          </Grid>
        </Grid>
        <Grid container sx={{ p: 1 }}>
          <Grid item xs={12}>
            <TextField
              id="imgUrl"
              name="Image Url"
              label="News Url"
              variant="outlined"
              fullWidth={true}
              onChange={handleImageUrlChange}
              value={formNewData.imageList[0].url}
            ></TextField>
          </Grid>
        </Grid>
        <Grid container sx={{ p: 1 }}>
          <Grid item xs={12}>
            {/* <InputLabel>Category</InputLabel>
                        <Select
                            label="Choose a category"
                        >
                            {categoryList.map((item) => (
                                <MenuItem value={item.idCategory}>{item.categoryName}</MenuItem>
                            ))}
                        </Select> */}
            <TextField
              select
              label="Select one category"
              required
              defaultValue={""}
              sx={{ width: 100 + "%" }}
              onChange={(e) => {
                setFormNewData({ ...formNewData, categoryId: e.target.value });
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categoryList.map((item) => (
                <MenuItem key={item.idCategory} value={item.idCategory}>
                  {item.categoryName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="success" fullWidth>
            Create
          </Button>
        </Grid>
      </form>
    </div>
  );
}

export default CreateDialog;
