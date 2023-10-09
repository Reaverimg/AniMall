import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

TrainerCms.propTypes = {};

const ANIMAL_API_GET = "http://animall-400708.et.r.appspot.com/api/v1/animals";

function TrainerCms(props) {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch("http://animall-400708.et.r.appspot.com/api/v1/animals", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setAnimals(responseData.data);
          console.log(animals);
        } else {
          throw new Error("Không thể lấy dữ liệu từ API.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };
    fetchAnimals();
  }, []);

  return (
    <Box>
      <Grid container spacing={1}>
        {animals.map((animal) => (
          <Grid item key={animal.idAnimal} xs={12} sm={6} md={4} lg={3}>
            {/* <Animal animals={animal}></Animal> */}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TrainerCms;
