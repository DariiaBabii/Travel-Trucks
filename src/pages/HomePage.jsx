import { useNavigate } from "react-router-dom";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/campers");
  };

  return (
    <div className={styles["home-container"]}>
      <div className={styles["home-content"]}>
        <h1 className={styles["heading"]}>Campers of your dreams</h1>
        <p className={styles["subheading"]}>
          You can find everything you want in our catalog
        </p>
        <button className={styles["button"]} onClick={handleRedirect}>
          View Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;
