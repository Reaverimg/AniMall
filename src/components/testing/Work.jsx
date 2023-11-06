import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PickMeals from "../asset/pick-meals-image.png";
import ChooseMeals from "../asset/choose-image.png";
import DeliveryMeals from "../asset/delivery-image.png";

const Work = () => {
  const [listNews, setlistNews] = useState([]);
  const history = useHistory();
  const url = "https://animall-400708.et.r.appspot.com/api/v1";
  const fetchAllNewsList = async (id) => {
    try {
      console.log(1);
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
            // Sắp xếp danh sách tin tức theo thời gian đăng bài giảm dần
            rpData.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            // Chọn ra 3 tin tức mới nhất
            const latestNews = rpData.data.slice(0, 3);

            setlistNews(latestNews);
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
            // Sắp xếp danh sách tin tức của danh mục theo thời gian đăng bài giảm dần
            rpData.data.newsList.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            // Chọn ra 3 tin tức mới nhất
            const latestNews = rpData.data.newsList.slice(0, 3);

            setlistNews(latestNews);
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
  // const toNewsPage = () => {
  //   history.pushState()
  // }
  const limitTextToWords = (text, wordCount) => {
    const words = text.split(" ");
    if (words.length <= wordCount) {
      return text;
    }
    const limitedText = words.slice(0, wordCount).join(" ");
    return limitedText + " ...";
  };
  return (
    <section className="work-section-wrapper">
      <section className="work-section-top">
        <p className="primary-subheading">NEWS</p>
        <h1 className="primary-heading">Explore Wildlife News</h1>
        <p className="primary-text">
          Dive into the captivating world of wildlife with our latest news
          updates. Discover the extraordinary stories of the animal kingdom.
        </p>
      </section>
      <section className="work-section-bottom">
        {listNews.map((data) => (
          <section className="work-section-info">
            <section className="info-boxes-image-container">
              <img src={data.images[0].url} alt="" />
            </section>
            <div className="content-news">
              <h2>{data.title}</h2>
              <p>{limitTextToWords(data.content, 10)}</p>
            </div>
          </section>
        ))}
      </section>
      <section className="work-section-bottom">
        <button
          className="secondary-button"
          style={{ marginTop: 0 }}
          onClick={() => history.push("/news")}
        >
          See more news
        </button>
      </section>
    </section>
  );
};

export default Work;
