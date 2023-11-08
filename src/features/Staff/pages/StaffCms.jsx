import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

StaffCms.propTypes = {};

function StaffCms(props) {
  const [animalList, setAnimalList] = useState([]);
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch(
          "https://animall-400708.et.r.appspot.com/api/v1/tickets/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          setAnimalList(responseData.data);
        } else {
          throw new Error("Không thể lấy dữ liệu từ API.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };
    fetchAnimals();
    console.log(animalList);
  }, []);

  return <div>Staff CMS</div>;
}

export default StaffCms;
