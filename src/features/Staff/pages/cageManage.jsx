import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CageDetail from "./CageDetail";
import CreateDialog from "./Dialog/CageDialog/CreateDialog";
export const CageManage = () => {
  const [cageList, setCageList] = useState([]);
  const [selectId, setSelectId] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const url = "https://animall-400708.et.r.appspot.com/api/v1";
  const fetchCageAPI = async () => {
    try {
      const response = await fetch(`${url}/cages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCageList(data.data);
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
    fetchCageAPI();
  }, []);
  const handleCloseDetail = () => {
    setDetailDialogOpen(false);
  };
  const handelOpenDetail = (id) => {
    setDetailDialogOpen(true);
    setSelectId(id);
  };
  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };
  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };
  return (
    <Container>
      <div className="col-12">
        <Button
          variant="contained"
          color="success"
          className="mt-5"
          onClick={handleOpenCreateDialog}
        >
          Create new cage
        </Button>
        <div className="d-flex flex-row">
          <div className="pt-5">
            <div className="title">
              <Grid container spacing={2}>
                {cageList
                  ? cageList.map((cage) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        key={cage.idCage}
                        className="p-2"
                      >
                        <Card>
                          {/* <CardMedia
                            sx={{ height: 140 }}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="green iguana"
                          /> */}
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {cage.cageName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Số lượng thú: {cage.quantity}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            {/* <Button size="small">Share</Button> */}
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => {
                                handelOpenDetail(cage.idCage);
                              }}
                            >
                              Detail
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  : ""}
              </Grid>
            </div>
          </div>
        </div>
        <Dialog open={detailDialogOpen} onClose={handleCloseDetail}>
          <CageDetail
            idCage={selectId}
            handleCloseDetail={handleCloseDetail}
            fetchCageAPI={fetchCageAPI}
          ></CageDetail>
        </Dialog>
        <Dialog open={createDialogOpen} onClose={handleCloseCreateDialog}>
          <CreateDialog
            handleCloseCreateDialog={handleCloseCreateDialog}
            fetchCageAPI={fetchCageAPI}
          ></CreateDialog>
        </Dialog>
      </div>
    </Container>
  );
};
