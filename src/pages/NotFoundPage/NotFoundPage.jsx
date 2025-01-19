import React from "react";
import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => (
  <div className={css.container}>
    <h1 className={css.title}>404 - Page Not Found</h1>
    <p className={css.message}>
      The page you are looking for doesn’t exist or has been moved.
    </p>
    <Link to="/" className={css.homeLink}>
      Go to Homepage
    </Link>
  </div>
);

export default NotFoundPage;
