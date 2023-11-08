import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { Box, Stack, Typography, createTheme } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import TableSchedule from "../components/TableSchedule";
import dayjs from "dayjs";
import "../../Trainer/styles/animalDetailPage.css";
import axios from "axios";
import Skeleton from "../../../components/loading/Skeletion";

AnimalDetailPage.propTypes = {};

const thumbnailUrl =
  "https://www.chromethemer.com/download/hd-wallpapers/wild-deer-4k-3840x2160.jpg";

function AnimalDetailPage(props) {
  const {
    params: { idAnimal },
  } = useRouteMatch();

  const currentDate = new Date();

  const [dateValue, setDateValue] = useState(
    dayjs(currentDate).format("DD/MM/YYYY")
  );

  const match = useRouteMatch();

  const [animal, setAnimal] = useState();

  const [foodtrackings, setFoodTrackings] = useState();

  const [loading, setLoading] = useState();

  const [health, setHealth] = useState();

  async function fetchAnimalById() {
    try {
      const response = await fetch(
        `https://animall-400708.et.r.appspot.com/api/v1/animals/${idAnimal}`
      );
      if (response.ok) {
        const responseData = await response.json();
        setAnimal(responseData.data);
        setFoodTrackings(responseData.data.foodTrackings);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const updateStatusByDate = () => {
    if (foodtrackings) {
      const matchingDate = foodtrackings.find(
        (data) => data.date === dateValue
      );
      if (matchingDate) {
        setHealth(matchingDate.animalHealth);
      }
    }
  };

  useEffect(() => {
    fetchAnimalById();
  }, []);

  useEffect(() => {
    updateStatusByDate();
  }, [foodtrackings]);

  const renderPage = () =>{
    fetchAnimalById();
  }

  return (
    <Box>
      {loading ? (
        <Skeleton></Skeleton>
      ) : (
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
                      Name :{" "}
                      <span className="text-name">{animal && animal.name}</span>
                    </h5>
                    <p className="card-text">
                      Sex : {animal && animal.sex ? "male" : "female"}
                    </p>
                    <p className="card-text text-characteristic">
                      Identify characteristic : {animal && animal.description}
                    </p>
                    <p className="card-text">
                      Entered Zoo on date : {animal && animal.dob}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Health status :
                        <span className="text-live">
                          {/* {animal && animal.status} */}
                          {(foodtrackings) => {
                            if (foodtrackings) {
                              const matchingDate = foodtrackings.find(
                                (data) => data.date === dateValue
                              );
                              if (matchingDate) {
                                setHealth(matchingDate.animalHealth);
                              }
                            }
                          }}
                          {health && health}
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
              <TableSchedule foodtracking={foodtrackings} Render={renderPage}></TableSchedule>
            </div>
          </div>

          {/* col-2 */}
          <div className="col-2"></div>
        </div>
      )}
    </Box>
  );
}

export default AnimalDetailPage;
