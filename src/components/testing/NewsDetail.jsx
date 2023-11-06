import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import { Image } from "@mui/icons-material";

NewsDetail.propTypes = {};

function NewsDetail(props) {
  const {
    params: { idNews },
  } = useRouteMatch();
  const [news, setNews] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://animall-400708.et.r.appspot.com/api/v1/news/${idNews}`
        );
        if (response.ok) {
          const rpData = await response.json();
          setNews(rpData.data);
          console.log("News", rpData.data);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    }

    fetchData(); // Gọi hàm fetchData trong useEffect
  }, [idNews]); // Thêm idNews vào dependency array để useEffect chạy lại khi idNews thay đổi

  return (
    <Container>
      <Grid xs={12}>
        <Typography
          variant="h3"
          sx={{ paddingTop: 5, paddingBottom: 5, textAlign: "center" }}
        >
          {news.title}
        </Typography>
        <Grid
          xs={12}
          sx={{ display: "flex", width: "100%" }}
          className="d-flex justify-content-between"
        >
          <Grid xs={7}>
            <Typography sx={{ fontWeight: 700, fontSize: 24 }}>
              Thể loại: {news.category?.categoryName || ""}
            </Typography>
          </Grid>
          <Grid xs={5}>{news.createAt}</Grid>
        </Grid>
        <img
          className="img-fluid"
          src={news.images ? `${news.images[0].url}` : ""}
        ></img>
        <Typography sx={{ paddingTop: 5 }}>
          {news.content ? news.content : "No data"}
        </Typography>
      </Grid>
    </Container>
  );
}

export default NewsDetail;
