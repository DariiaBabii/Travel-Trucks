import css from "./StarRating.module.css";
import yellowStar from "../../images/star.svg";
import grayStar from "../../images/grey-star.svg";

export const StarRating = ({ rating }) => {
  const maxStars = 5;

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = maxStars - fullStars;
    return [
      ...Array(fullStars).fill(yellowStar),
      ...Array(emptyStars).fill(grayStar),
    ];
  };

  const starsArray = generateStars(rating);

  return (
    <div className={css.stars}>
      {starsArray.map((star, index) => (
        <img key={index} src={star} alt="star" />
      ))}
    </div>
  );
};

export default StarRating;
