import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import {
  DialogContent,
  Grid,
  Switch,
  TextField,
  Typography,
  Button,
  Input,
  Select,
  MenuItem,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import { useSnackbar } from "notistack";

function UpdateDialog({ idSelectNews }) {
  const [cloudUrl, setCloudUrl] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentQR, setCurrentQR] = useState(null);
  const [newsDetail, setNewsDetail] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);
  const [categories, setCategories] = useState(null);
  const url = "https://animall-400708.et.r.appspot.com/api/v1";
  const fetchNewsDetails = async () => {
    console.log("idNews", idSelectNews);
    try {
      if (idSelectNews) {
        const response = await fetch(`${url}/news/${idSelectNews}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const rpData = await response.json();
          if (rpData.message === "OPERATION SUCCESSFUL" && rpData.data) {
            setNewsDetail(rpData.data);
            setFormData(rpData.data);
            console.log("newsDetail", rpData.data);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  const fetchAllCategories = async () => {
    try {
      // Lấy danh sách danh mục
      const response = await fetch(`${url}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const rpData = await response.json();
        if (rpData.message === "OPERATION SUCCESSFUL" && rpData.data) {
          setCategories(rpData.data);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchNewsDetails();
  }, []);
  useEffect(() => {
    fetchAllCategories();
  }, []);
  const handleUpload = () => {
    console.log(3.1);
    if (selectedFile) {
      console.log(3.2);
      const data = new FormData();
      data.append("file", selectedFile);
      data.append("upload_preset", "my3bwog6");
      data.append("cloud_name", "dw5ucgy1y");
      console.log(3.3);
      fetch("https://api.cloudinary.com/v1_1/dw5ucgy1y/image/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Upload response:", data.secure_url);
          // setUploadedImage(data.secure_url);
          setCloudUrl(data.secure_url);
          setFormData({
            ...formData,
            images: [
              {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                url: data.secure_url,
              },
            ],
          });
        })
        .catch((error) => {
          enqueueSnackbar("Upload image fail", {
            variant: "error",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
          });
          // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo lỗi cho người dùng)
        });
    }
  };
  const handleFileChange = (e) => {
    try {
      setSelectedFile(e.target.files[0]);
      console.log("File", selectedFile);
      handleUpload();
      // setTimeout(() => {
      //   setFormData((formData) => ({
      //     ...formData,
      //     images: [{ url: cloudUrl }],
      //   }));
      // }, 1200);
      console.log("Upload sucessfully");
    } catch (e) {
      console.error(e);
    }
  };
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    // Tạo một bản sao của formData
    const updatedFormData = { ...formData };

    // Cập nhật giá trị cho thuộc tính tương ứng với tên (name) của trường input
    updatedFormData[name] = value;

    // Kiểm tra nếu tên trường là 'images', cập nhật 'url' từ secure_url
    if (name === "images") {
      updatedFormData[name][0].url = cloudUrl;
    }

    // Cập nhật state với formData đã cập nhật
    setFormData(updatedFormData);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${url}/news`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        enqueueSnackbar("Update successfully", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      } else {
        enqueueSnackbar("Update failed", {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ width: 500, padding: 15 }}>
      <form onSubmit={handleFormSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title"
                name="title"
                label="Title"
                variant="outlined"
                fullWidth={true}
                value={formData ? formData.title : ""}
                onChange={handleChangeForm}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="content"
                name="content"
                label="Content"
                variant="outlined"
                value={formData ? formData.content : ""}
                onChange={handleChangeForm}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                id="image"
                name="Image url"
                label="Image"
                variant="outlined"
                value={newsDetail.images ? newsDetail.images[0].url : "No data"}
              ></TextField> */}
              <img
                style={{
                  maxHeight: 300,
                  maxWidth: 300,
                  minHeight: 300,
                  minWidth: 300,
                  borderRadius: 10,
                }}
                src={
                  formData && formData.images && formData.images[0]
                    ? formData.images[0].url
                    : ""
                }
              ></img>
            </Grid>
            <Grid item xs={12}>
              <Button>
                <input
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography className="pt-2">Status</Typography>
              <Select
                name="status"
                required
                value={formData ? formData.status : null}
                onChange={handleChangeForm}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Unactive</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Typography>Select Category</Typography>
              <Select
                name="categoryId"
                fullWidth={true}
                required
                value={formData ? formData.categoryId : null}
                onChange={handleChangeForm}
              >
                {categories &&
                  categories.map((item) => (
                    <MenuItem value={item.idCategory}>
                      {item.categoryName}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit">Update</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </form>
    </div>
  );
}

export default UpdateDialog;
