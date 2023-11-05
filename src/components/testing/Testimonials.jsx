import React from "react";
import ProfilePic from "../asset/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";

const Testimonials = () => {
  return (
    <section className="work-section-wrapper">
      <section className="work-section-top">
        <p className="primary-subheading">Testimonials</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
      </section>
      <section className="testimonial-section-bottom">
        <img src={ProfilePic} alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
        <section className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </section>
        <h2>John Doe</h2>
      </section>
    </section>
  );
};

export default Testimonials;
