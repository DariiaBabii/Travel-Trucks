import { useSelector } from "react-redux";
import { selectCampersById } from "@redux/campersSlice";
import { lazy, Suspense, useEffect } from "react";
import {
  NavLink,
  Routes,
  Route,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import css from "./CatalogDetailsPage.module.css";
import icons from "../../images/icons.svg";
import mapImage from "../../images/icon-map.svg";

const Feature = lazy(() => import("@components/Feature/Feature"));
const Reviews = lazy(() => import("@components/Reviews/Reviews"));
const ItemPhoto = lazy(() => import("@components/ItemPhoto/ItemPhoto"));

const CatalogDetailsPage = () => {
  const camper = useSelector(selectCampersById);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (camper && location.pathname === `/campers/${id}`) {
      navigate(`/campers/${camper.id}/feature`);
    }
  }, [camper, navigate, id, location.pathname]);

  const renderCamperDetails = () => (
    <div className={css.containerDetails}>
      <div className={css.contentTitle}>
        <p className={css.title}>{camper.name}</p>
        <div className={css.info}>
          <svg className={css.icon}>
            <use href={`${icons}#icon-star-pressed`} />
          </svg>
          <span className={css.rate}>
            {camper.rating}({camper.reviews.length} Reviews)
          </span>

          <div className={css.infoLocation}>
            <span className={css.location}>
              <img src={mapImage} alt="map" />
              {camper.location}
            </span>
          </div>
        </div>
      </div>
      <div className={css.price}>€{camper.price}.00</div>
      <Suspense fallback={<div>Loading Photos...</div>}>
        <ItemPhoto gallery={camper.gallery} showAll={true} />
      </Suspense>
      <p className={css.descriptionDetails}>{camper.description}</p>
    </div>
  );

  const renderNavLinks = () => (
    <div className={css.containerDetails}>
      <nav className={css.subNav}>
        <NavLink
          to={`/campers/${camper.id}/feature`}
          className={({ isActive }) =>
            isActive ? `${css.subLink} ${css.subLinkActive}` : css.subLink
          }
        >
          Feature
        </NavLink>
        <NavLink
          to={`/campers/${camper.id}/review`}
          className={({ isActive }) =>
            isActive ? `${css.subLink} ${css.subLinkActive}` : css.subLink
          }
        >
          Reviews
        </NavLink>
      </nav>
    </div>
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={css.container}>
        {camper && (
          <>
            {renderCamperDetails()}
            {renderNavLinks()}
          </>
        )}
      </div>
      <Routes>
        <Route path="feature" element={<Feature camper={camper} />} />
        <Route path="review" element={<Reviews camper={camper} />} />
      </Routes>
    </Suspense>
  );
};

export default CatalogDetailsPage;
