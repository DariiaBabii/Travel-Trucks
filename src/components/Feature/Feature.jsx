import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import css from "./Feature.module.css";
import BookingForm from "../BookingForm/BookingForm";

import automaticImage from "../../images/automatic.png";
import petrolImage from "../../images/petrol.png";
import kitchenImage from "../../images/kitchen.png";
import radioImage from "../../images/radio.png";
import bathImage from "../../images/bathroom.png";
import acImage from "../../images/ac.png";

const Feature = ({ camper }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={css.container}>
      <div className={css.specContainer}>
        <div className={css.specification}>
          {camper.engine === "petrol" && <img src={petrolImage} alt="Petrol" />}
          {camper.transmission === "automatic" && (
            <img src={automaticImage} alt="Automatic Transmission" />
          )}
          {camper.kitchen && <img src={kitchenImage} alt="Kitchen" />}
          {camper.radio && <img src={radioImage} alt="Radio" />}
          {camper.bathroom && <img src={bathImage} alt="Bathroom" />}
          {camper.AC && <img src={acImage} alt="AC" className={css.engine} />}
        </div>
        <h3 className={css.sectionTitle}>Vehicle details</h3>
        <div className={css.row}>
          <p>Form</p>
          <p>{camper.form}</p>
        </div>
        <div className={css.row}>
          <p>Length</p>
          <p>{camper.length}</p>
        </div>
        <div className={css.row}>
          <p>Width</p>
          <p>{camper.width}</p>
        </div>
        <div className={css.row}>
          <p>Height</p>
          <p>{camper.height}</p>
        </div>
        <div className={css.row}>
          <p>Tank</p>
          <p>{camper.tank}</p>
        </div>
        <div className={css.row}>
          <p>Consumption</p>
          <p>{camper.consumption}</p>
        </div>
      </div>

      <div className={css.formContainer}>
        <BookingForm />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Feature;
