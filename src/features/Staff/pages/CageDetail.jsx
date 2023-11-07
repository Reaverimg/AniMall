import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";

function CageDetail({ idCage, handleCloseDetail, fetchCageAPI }) {
  const [cage, setCage] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const url = "https://animall-400708.et.r.appspot.com/api/v1";
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 425,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const fetchCageDetail = async () => {
    try {
      if (idCage) {
        const response = await fetch(`${url}/cages/${idCage}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setCage(data.data);
          })
          .catch((err) => {
            enqueueSnackbar("Fetch fail", {
              variant: "error",
              anchorOrigin: {
                horizontal: "right",
                vertical: "top",
              },
            });
          });
      }
    } catch (err) {
      enqueueSnackbar("Something's wrong", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  useEffect(() => {
    fetchCageDetail();
  }, []);
  const getStatusBackgroundColor = (status) => {
    if (status === true) {
      return { backgroundColor: "green", color: "white", border: "none" };
    } else if (status === false) {
      return { color: "gray", border: "none" };
    }
  };
  const handleOpenDeleteAction = () => {
    setOpenModal(true);
  };
  const handleCloseDeleteAction = () => {
    setOpenModal(false);
  };
  const handleConfirmDelete = async () => {
    console.log("id cage", cage.idCage);
    try {
      const response = await fetch(`${url}/cages?id=${cage.idCage}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ id: cage.idCage }),
      })
        .then((response) => response.json())
        .then(() => {
          enqueueSnackbar("Delete successfully", {
            variant: "success",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
          });
          fetchCageAPI();
          handleCloseDetail();
        })
        .catch((error) => {
          enqueueSnackbar("Delete fail", {
            variant: "error",
            anchorOrigin: {
              horizontal: "right",
              vertical: "top",
            },
          });
        });
    } catch (e) {
      enqueueSnackbar("Something's wrong", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };
  return (
    <Box>
      <div className="p-5">
        <Grid container spacing={2}>
          <div className="flex flex-column">
            <Typography variant="h3" className="pb-4">
              Cage Detail
            </Typography>
            <Typography>
              <strong>Name:</strong> {cage.cageName}
            </Typography>
            <Typography className="pt-2">
              <strong>Quantity:</strong> {cage.quantity}
            </Typography>
            <Typography className="pt-2">
              <strong>Status: </strong>
              <button
                className="p-1"
                style={getStatusBackgroundColor(cage.status)}
              >
                {cage.status ? "Active" : "Unactive"}
              </button>
            </Typography>

            <Typography className="pt-2">
              <strong>Area:</strong>{" "}
              {cage.area ? cage.area.areaName : "No Area"}
            </Typography>
            <div className="pt-5">
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  handleOpenDeleteAction();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Grid>
      </div>
      {/* <TextField 
        id="cageName"
        name="Name"
        value={}
        ></TextField> */}
      <Modal
        open={openModal}
        onClose={() => handleCloseDeleteAction}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you really want to delete this cage ?
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
            className="pt-4"
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => handleCloseDeleteAction()}
            >
              No
            </Button>
            <Button
              variant="outlined"
              color="error"
              className="ms-2"
              onClick={() => handleConfirmDelete()}
            >
              YES
            </Button>
          </div>
        </Box>
      </Modal>
    </Box>
  );
}

export default CageDetail;
