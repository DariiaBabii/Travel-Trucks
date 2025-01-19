import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import css from "./Reviews.module.css";
import BookingForm from "../BookingForm/BookingForm";
import { StarRating } from "../StarRating/StarRating";

const Reviews = ({ camper }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Form submitted successfully!", {
      position: "top-right",
    });
  };

  const renderReviews = () => {
    return (
      camper &&
      camper.reviews.map((review, index) => (
        <div className={css.review} key={index}>
          <div className={css.titleBlock}>
            <div className={css.comment}>{review.reviewer_name.charAt(0)}</div>
            <div className={css.starsBox}>
              <p className={css.userName}>{review.reviewer_name}</p>
              <StarRating rating={review.reviewer_rating} />
            </div>
          </div>
          <p className={css.reviewText}>{review.comment}</p>
        </div>
      ))
    );
  };

  return (
    <div className={css.container}>
      <div className={css.reviewContainer}>{renderReviews()}</div>

      <div className={css.formContainer}>
        <BookingForm />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Reviews;
