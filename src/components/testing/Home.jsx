import React from "react";
import Navbar from "./Navbar";
// import BannerBackground from "../asset/Untitled (Medium Banner (US) (Landscape)).svg";
import BannerImage from "../asset/Untitled (Medium Banner (US) (Landscape)) (Logo).svg";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <section className="home-container">
      {/* <Navbar /> */}
      <section className="home-banner-container">
        {/* <section className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </section> */}
        <section className="home-text-section">
          <h1 className="primary-heading">
            Discover the Fascinating World of Wildlife
          </h1>
          <p className="primary-text">
            Our dedicated team of experts takes you on a journey to explore the
            incredible diversity of animal life in our wildlife sanctuary.
          </p>
          <button className="secondary-button">
            Explore Now <FiArrowRight />{" "}
          </button>
        </section>
        <section className="home-image-container">
          <img src={BannerImage} alt="" />
        </section>
      </section>
    </section>
  );
};

export default Home;
