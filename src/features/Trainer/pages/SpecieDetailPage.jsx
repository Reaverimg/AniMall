import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { specieAnimalsList } from "../../Trainer/components/specieAnimalsList";

SpecieDetailPage.propTypes = {};

const thumbnailUrl = "https://via.placeholder.com/300x250";

function SpecieDetailPage(props) {
  const {
    params: { idSpecie },
  } = useRouteMatch();

  const match = useRouteMatch();

  const [specie, setSpecie] = useState({});

  const [specieAnimals, setSpecieAnimals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://animall-400708.et.r.appspot.com/api/v1/species/${idSpecie}`
        );
        if (response.ok) {
          const data = await response.json();
          setSpecie(data.data);
          setSpecieAnimals(data.data.animalList);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    console.log("specie", specie);
    console.log("specieAnimals", specieAnimals);
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
                  <h5 className="card-title">Loài : {specie.speciesName}</h5>
                  <p className="card-text">Nguồn gốc : {specie.origin}</p>
                  <p className="card-text">
                    Đặc điểm của loài : {specie.description}
                  </p>
                  <p className="card-text">
                    Loài thức ăn : {specie.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Table row */}
        <div className="row">
          <div className="d-flex justify-content-center">
            {specieAnimals.map((animal) => (
              <specieAnimalsList></specieAnimalsList>
            ))}
          </div>
        </div>

        {/* col-2 */}
        <div className="col-2"></div>
      </div>
    </Box>
  );
}

export default SpecieDetailPage;
