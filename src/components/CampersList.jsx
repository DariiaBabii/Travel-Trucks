// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import classes from "./CampersList.module.css";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { addToFavorites } from "../store/favoritesSlice";

// const CampersList = ({ camper }) => {
//   const [filter, setFilter] = useState({ ac: false, kitchen: false });
//   const campers = useSelector((state) => state.campers.items);
//   const filters = useSelector((state) => state.filters);
//   const dispatch = useDispatch();

//   const filteredCampers = campers.filter((camper) => {
//     return (
//       (!filters.ac || camper.AC) &&
//       (!filters.kitchen || camper.kitchen) &&
//       (!filters.type || camper.type === filters.type) &&
//       (!filters.location || camper.location.includes(filters.location))
//     );
//   });

//   const handleFilterChange = (e) => {
//     const { name, checked } = e.target;
//     setFilter({ ...filter, [name]: checked });
//   };

//   const handleFavorite = (camper) => {
//     dispatch(addToFavorites(camper));
//   };

//   return (
//     <div>
//       <div>
//         {filteredCampers.map((camper) => (
//           <div key={camper.id}>{camper.title}</div>
//         ))}
//       </div>
//       <div>
//         <h5>{camper.title}</h5>
//         <button onClick={() => handleFavorite(camper)}>Add to Favorites</button>
//       </div>
//       <div className={classes["filters"]}>
//         <label>
//           <input
//             type="checkbox"
//             name="ac"
//             checked={filter.ac}
//             onChange={handleFilterChange}
//           />
//           Кондиціонер
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="kitchen"
//             checked={filter.kitchen}
//             onChange={handleFilterChange}
//           />
//           Кухня
//         </label>
//       </div>

//       <div className={classes["campers-container"]}>
//         <div className={classes["campers-row"]}>
//           {filteredCampers.map((camper) => (
//             <div key={camper.id} className={classes["camper-card-wrapper"]}>
//               <div className={classes["camper-card"]}>
//                 <Link to={`/catalog/${camper.id}`}>
//                   <img
//                     src={
//                       camper.image ||
//                       "https://via.placeholder.com/500x750?text=No+Image"
//                     }
//                     alt={camper.title}
//                     onError={(e) => {
//                       e.target.src =
//                         "https://via.placeholder.com/500x750?text=No+Image";
//                     }}
//                   />
//                 </Link>
//                 <div className={classes["camper-card-body"]}>
//                   <h5 className={classes["camper-title"]}>{camper.title}</h5>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CampersList;
