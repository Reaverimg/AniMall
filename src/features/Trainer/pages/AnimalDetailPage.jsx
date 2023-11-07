import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { Box, Stack, Typography, createTheme } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import TableSchedule from "../components/TableSchedule";
import "../../Trainer/styles/animalDetailPage.css";

AnimalDetailPage.propTypes = {};

const thumbnailUrl =
  "https://www.chromethemer.com/download/hd-wallpapers/wild-deer-4k-3840x2160.jpg";

function AnimalDetailPage(props) {
  const {
    params: { idAnimal },
  } = useRouteMatch();

  const match = useRouteMatch();

  const [animal, setAnimal] = useState();

  const [foodtrackings, setFoodTrackings] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://animall-400708.et.r.appspot.com/api/v1/animals/${idAnimal}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setAnimal(responseData.data);
          setFoodTrackings(responseData.data.foodTrackings);
          console.log(responseData.data.foodTrackings);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Box>
      <div className="row pt-5">
        <div className="title">
          <Stack direction="row" className="my-3">
            <div className="d-flex">
              <div className="title-shape"></div>
              {/* <Chip label="Animals Manage" color="success" /> */}
              <Typography className="title-typo" variant="h6" gutterBottom>
                Animal Detail
              </Typography>
            </div>
          </Stack>
        </div>
        {/* col-2 */}
        <div className="col-2"></div>
        {/* col-8 */}
        <div className="col-8">
          <div
            className="card mb-3 "
            style={{ maxWidth: "100vw", maxHeight: "250px" }}
          >
            <div className="row g-0 animal-detail">
              <div className="col-md-4">
                <img
                  src={thumbnailUrl}
                  className="img-fluid"
                  alt="Animal Image"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    Tên :{" "}
                    <span className="text-name">{animal && animal.name}</span>
                  </h5>
                  <p className="card-text">
                    Sex : {animal && animal.sex ? "male" : "female"}
                  </p>
                  <p className="card-text text-characteristic">
                    Đặc điểm nhận dạng : {animal && animal.description}
                  </p>
                  <p className="card-text">
                    Được nhập về sở thú vào ngày : {animal && animal.dob}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Tình trạng :
                      <span className="text-live">
                        {animal && animal.status}
                      </span>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Table row */}
        <div className="row">
          <div className="d-flex justify-content-center">
            <TableSchedule foodtracking={foodtrackings}></TableSchedule>
          </div>
        </div>

        {/* col-2 */}
        <div className="col-2"></div>
      </div>
    </Box>
  );
}

export default AnimalDetailPage;
