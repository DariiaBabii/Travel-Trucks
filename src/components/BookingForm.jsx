import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { toast } from "react-toastify";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";

import classes from "./CamperDetails.module.css";

const BookingForm = () => {
  const [date, setDate] = useState(null);

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    if (!date) {
      toast.error("Please select a booking date");
      return;
    }
    toast.success("Booking successful!");
  };

  return (
    <div className={classes["booking-form"]}>
      <h3>Book your campervan now</h3>
      <form onSubmit={handleBookingSubmit}>
        <div className={classes["form-group"]}>
          <label htmlFor="name">Name*</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="email">Email*</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="booking-date">Booking date*</label>
          <Calendar
            id="booking-date"
            value={date}
            onChange={(e) => setDate(e.value)}
            dateFormat="dd/mm/yy"
            showIcon
            className={classes["calendar-input"]}
          />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="comment">Comment</label>
          <textarea id="comment" name="comment" rows="4"></textarea>
        </div>
        <button type="submit" className={classes["submit-button"]}>
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
