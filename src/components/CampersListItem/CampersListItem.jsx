import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCamperById } from "@redux/campersOps";
import { toggleLike, selectfavorited } from "@redux/favoritedSlice";

import css from "./CampersListItem.module.css";
import heartImage from "../../images/heart.svg";
import redHeartImage from "../../images/red-heart.svg";
import starImage from "../../images/star.svg";
import mapImage from "../../images/icon-map.svg";
import automaticImage from "../../images/automatic.png";
import petrolImage from "../../images/petrol.png";
import kitchenImage from "../../images/kitchen.png";
import radioImage from "../../images/radio.png";
import bathImage from "../../images/bathroom.png";
import acImage from "../../images/ac.png";

export const CampersListItem = ({ camper }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritedCampers = useSelector(selectfavorited);
  const isfavorited = favoritedCampers.includes(camper.id);

  const handleGetItemDetail = () => {
    dispatch(fetchCamperById(camper.id));
    navigate(`/campers/${camper.id}`);
  };

  const handleLikeClick = () => {
    dispatch(toggleLike(camper.id));
  };

  const renderSpecifications = () => {
    return (
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
    );
  };

  return (
    <li className={css.container}>
      <div className={css.imageWrapper}>
        <img
          src={camper.gallery[0]?.thumb}
          alt={camper.name}
          className={css.image}
        />
      </div>
      <div className={css.info}>
        <div className={css.header}>
          <p className={css.title}>{camper.name}</p>
          <div className={css.priceBlock}>
            €{camper.price}.00
            <img
              src={isfavorited ? redHeartImage : heartImage}
              alt={isfavorited ? "favorited" : "Not favorited"}
              className={css.heart}
              onClick={handleLikeClick}
            />
          </div>
        </div>
        <div className={css.rateBlock}>
          <img src={starImage} alt="star" />
          <span className={css.rate}>
            {camper.rating}({camper.reviews.length} Reviews)
          </span>
          <span className={css.location}>
            <img src={mapImage} alt="map" />
            {camper.location}
          </span>
        </div>
        <p className={css.description}>{camper.description}</p>
        {renderSpecifications()}
        <button className={css.button} onClick={handleGetItemDetail}>
          Show More
        </button>
      </div>
    </li>
  );
};

export default CampersListItem;
