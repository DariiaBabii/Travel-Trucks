import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  const redirectToCampers = () => navigate("/campers");

  return (
    <section className={css.heroSection}>
      <div className={css.heroContent}>
        <h1 className={css.heroTitle}>Campers of your dreams</h1>
        <p className={css.herosubTitle}>
          You can find everything you want in our catalog
        </p>
        <button className={css.heroButton} onClick={redirectToCampers}>
          View Now
        </button>
      </div>
    </section>
  );
};

export default HomePage;
