import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { Box, createTheme } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import TableSchedule from "../components/TableSchedule";
AnimalDetailPage.propTypes = {};

const thumbnailUrl = "https://via.placeholder.com/300x250";

function AnimalDetailPage(props) {
  const {
    params: { idAnimal },
  } = useRouteMatch();

  const match = useRouteMatch();

  const [animal, setAnimal] = useState({});

  useEffect(() => {
    async function fetchData() {
      console.log(idAnimal);
      try {
        const response = await fetch(
          `http://animall-400708.et.r.appspot.com/api/v1/animals/${idAnimal}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setAnimal(responseData.data);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [match]);

  return (
    <Box>
      <div className="row pt-5">
        {/* col-2 */}
        <div className="col-2"></div>
        {/* col-8 */}
        <div className="col-8">
          <div
            className="card mb-3 "
            style={{ maxWidth: "100vw", maxHeight: "250px" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={thumbnailUrl}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Tên : {animal.name}</h5>
                  <p className="card-text">
                    Giới tính : {animal.sex ? "male" : "female"}
                  </p>
                  <p className="card-text">
                    Đặc điểm nhận dạng : {animal.description}
                  </p>
                  <p className="card-text">
                    Được nhập về sở thú vào ngày : {animal.dob}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Tình trạng : {animal.status}
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
            <TableSchedule></TableSchedule>
          </div>
        </div>

        {/* col-2 */}
        <div className="col-2"></div>
      </div>
    </Box>
  );
}

export default AnimalDetailPage;
