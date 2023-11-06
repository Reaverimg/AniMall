import React from "react";
import AboutBackground from "../asset/about-background.png";
import AboutBackgroundImage from "../asset/about.svg";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <section className="about-section-container">
      <section className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </section>
      <section className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </section>
      <section className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Explore the Fascinating World of Wildlife
        </h1>
        <p className="primary-text">
          Our wildlife sanctuary offers
          a unique opportunity to witness the incredible diversity of animal
          life in their natural habitats.
        </p>
        <p className="primary-text">
          Join us on a journey to learn, discover, and appreciate the wonders
          of the animal kingdom.
        </p>
        <section className="about-buttons-container">
          <button className="secondary-button">Buy ticket</button>
          {/* <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button> */}
        </section>
      </section>
    </section>
  );
};

export default About;
