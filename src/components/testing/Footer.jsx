import React from "react";
import Logo from "../asset/ANIMALL.svg";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="footer-wrapper">
      <section className="footer-section-one">
        <section className="footer-logo-container">
          <img src={Logo} alt="" />
        </section>
        <section className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </section>
      </section>
      <section className="footer-section-two">
        <section className="footer-section-columns">
          <span>Home</span>
          <span>About us</span>
          <span>News</span>
        </section>
        <section className="footer-section-columns">
          <span>0343279745</span>
          <span>animal@gmail.com</span>
        </section>
        <section className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </section>
      </section>
    </section>
  );
};

export default Footer;
