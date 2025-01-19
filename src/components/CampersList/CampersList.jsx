import CampersListItem from "../CampersListItem/CampersListItem";
import css from "./CampersList.module.css";

export const CampersList = ({ campers }) => {
  const items = campers?.items;
  return (
    <ul className={css.camperBox}>
      {items?.length > 0 ? (
        items.map((camper) => (
          <CampersListItem key={camper.id} camper={camper} />
        ))
      ) : (
        <p>No campers found</p>
      )}
    </ul>
  );
};

export default CampersList;
