import React from "react";

const Contact = () => {
  return (
    <section className="contact-page-wrapper">
      <h1 className="primary-heading">Have Question In Mind?</h1>
      <h2 className="primary-heading">Let Us Help You</h2>
      <section className="contact-form-container">
        <input type="text" placeholder="youremail@gmail.com" />
        <button className="secondary-button">Submit</button>
      </section>
    </section>
  );
};

export default Contact;
