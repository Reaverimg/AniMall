import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import App from "../../App";

News.propTypes = {};

function News(props) {
  const history = useHistory();
  const [listNews, setlistNews] = useState([]);
  const url = "http://animall-400708.et.r.appspot.com/api/v1";
  const fetchAllNewsList = async (id) => {
    try {
      if (!id) {
        const response = await fetch(`${url}/news`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const rpData = await response.json();
          if (rpData.message === "OPERATION SUCCESSFUL" && rpData.data) {
            setlistNews(rpData.data);
          }
        }
      } else {
        const response = await fetch(`${url}/categories/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const rpData = await response.json();
          if (rpData.message === "OPERATION SUCCESSFUL" && rpData.data) {
            setlistNews(rpData.data);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchAllNewsList();
  }, []);
  const handleClick = (id) => {
    if (id) {
      const cleanid = encodeURIComponent(id);
      history.push(`/news/${cleanid}`);
      console.log(history)
      console.log(1)
    }
  };
  function limitTextToWords(text, wordCount) {
    const words = text.split(" ");
    if (words.length <= wordCount) {
      return text;
    }
    const limitedText = words.slice(0, wordCount).join(" ");
    return limitedText + " ...";
  }
  return (
    <section>
      <section className="work-section-bottom">
        {listNews.map((data) => (
          <section
            className="work-section-info"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              handleClick(data.idNews);
            }}
          >
            <section className="info-boxes-image-container">
              <img src={data.images[0].url} alt="" />
            </section>
            <h2>{data.title}</h2>
            <p>{limitTextToWords(data.content, 10)}</p>
          </section>
        ))}
      </section>
    </section>
  );
}

export default News;
