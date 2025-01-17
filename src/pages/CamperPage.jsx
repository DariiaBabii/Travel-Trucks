import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  useParams,
  NavLink,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { fetchCampersId } from "../api";

import css from "./CamperPage.module.css";
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const Feature = lazy(() => import("../components/Features"));
const Reviews = lazy(() => import("../components/Reviews"));

const CamperPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCamper = async () => {
      try {
        const response = await fetchCampersId(id);
        setCamper(response.data);
      } catch (error) {
        setError("Error fetching camper details.");
      } finally {
        setLoading(false);
      }
    };
    loadCamper();
  }, [id]);

  useEffect(() => {
    if (camper && location.pathname === `/campers/${id}`) {
      navigate(`/campers/${id}/feature`);
    }
  }, [camper, navigate, id, location.pathname]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!camper) return <p>No camper found.</p>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={css["camper-page"]}>
        <div className={css["info"]}>
          <h2>{camper.name}</h2>
          <div className={css["camper-main-info"]}>
            <div className={css["camper-rating"]}>
              <FaStar className={css["star-icon"]} />
              <span>
                {camper.rating} ({camper.reviews.length} Reviews)
              </span>
            </div>
            <div className={css["camper-location"]}>
              <MdLocationOn className={css["location-icon"]} />
              <span>{camper.location}</span>
            </div>
            <div className={css["camper-price"]}>
              <span>€{camper.price.toFixed(2)}</span>
            </div>
          </div>

          <div className={css["camper-gallery"]}>
            {camper.images?.map((image, index) => (
              <img key={index} src={image} alt={`Camper ${index + 1}`} />
            ))}
          </div>
          <p className={css["description"]}>{camper.description}</p>
        </div>

        <nav className={css["subNav"]}>
          <NavLink
            to={`/campers/${camper.id}/feature`}
            className={({ isActive }) =>
              isActive
                ? `${css["subLink"]} ${css["subLinkActive"]}`
                : css["subLink"]
            }
          >
            Feature
          </NavLink>
          <NavLink
            to={`/campers/${camper.id}/review`}
            className={({ isActive }) =>
              isActive
                ? `${css["subLink"]} ${css["subLinkActive"]}`
                : css["subLink"]
            }
          >
            Reviews
          </NavLink>
        </nav>

        <Routes>
          <Route path="feature" element={<Feature camper={camper} />} />
          <Route path="review" element={<Reviews camper={camper} />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default CamperPage;
