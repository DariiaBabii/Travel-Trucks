// import React, { useState, useId } from "react";
// import {
//   FaFan,
//   FaCog,
//   FaCoffee,
//   FaTv,
//   FaShower,
//   FaCaravan,
// } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { changeFilter } from "../store/filtersSlice";
// import classes from "./FilterForm.module.css";

// const FilterForm = ({ onSubmit }) => {
//   const locationId = useId();
//   const dispatch = useDispatch();

//   // Стан для фільтрів
//   const [filters, setFilters] = useState({
//     ac: false,
//     automatic: false,
//     kitchen: false,
//     tv: false,
//     bathroom: false,
//     type: "",
//   });

//   const handleFilterChange = (name, value) => {
//     dispatch(changeFilter({ [name]: value }));
//   };

//   // Обробка зміни типу транспортного засобу
//   const handleTypeChange = (type) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       type,
//     }));
//   };
//   const handleLocationChange = (e) => {
//     setFilters({ ...filters, location: e.target.value });
//   };

//   // Обробка форми на натискання кнопки "Search"
//   const handleSubmit = (event) => {
//     event.preventDefault(); // Зупиняємо перезавантаження сторінки

//     const selectedEquipments = [];
//     if (filters.ac) selectedEquipments.push("AC");
//     if (filters.automatic) selectedEquipments.push("Automatic");
//     if (filters.kitchen) selectedEquipments.push("Kitchen");
//     if (filters.tv) selectedEquipments.push("TV");
//     if (filters.bathroom) selectedEquipments.push("Bathroom");

//     const filterData = {
//       city: event.target.elements.location?.value || "",
//       equipments: selectedEquipments,
//       type: filters.type,
//     };

//     // Викликаємо action dispatch з Redux (якщо є відповідний екшен)
//     dispatch(
//       changeFilter(filterData) // Передаємо відфільтровані дані
//     );

//     if (onSubmit) {
//       onSubmit(filterData); // Викликаємо колбек для відправки фільтрів (мож передати цей колбек через пропси)
//     }
//   };

//   return (
//     <div className={classes["filter-form"]}>
//       <div className={classes["form-group"]}>
//         <label htmlFor="location">Location</label>
//         <input
//           type="text"
//           id="location"
//           name="location"
//           value={filters.location}
//           onChange={handleLocationChange}
//         />
//       </div>

//       <form onSubmit={handleSubmit}>
//         <h4>Vehicle equipment</h4>
//         <div className={classes["filter-grid"]}>
//           <div
//             className={`${classes["filter-item"]} ${
//               filters.ac ? classes["selected"] : ""
//             }`}
//             onClick={() => handleFilterChange("ac")}
//           >
//             <FaFan />
//             <span>AC</span>
//           </div>
//           <div
//             className={`${classes["filter-item"]} ${
//               filters.automatic ? classes["selected"] : ""
//             }`}
//             onClick={() => handleFilterChange("automatic")}
//           >
//             <FaCog />
//             <span>Automatic</span>
//           </div>
//           <div
//             className={`${classes["filter-item"]} ${
//               filters.kitchen ? classes["selected"] : ""
//             }`}
//             onClick={() => handleFilterChange("kitchen")}
//           >
//             <FaCoffee />
//             <span>Kitchen</span>
//           </div>
//           <div
//             className={`${classes["filter-item"]} ${
//               filters.tv ? classes["selected"] : ""
//             }`}
//             onClick={() => handleFilterChange("tv")}
//           >
//             <FaTv />
//             <span>TV</span>
//           </div>
//           <div
//             className={`${classes["filter-item"]} ${
//               filters.bathroom ? classes["selected"] : ""
//             }`}
//             onClick={() => handleFilterChange("bathroom")}
//           >
//             <FaShower />
//             <span>Bathroom</span>
//           </div>
//         </div>

//         <h4>Vehicle type</h4>
//         <div className={classes["filter-grid"]}>
//           <div
//             className={`${classes["filter-item"]} ${
//               filters.type === "van" ? classes["selected"] : ""
//             }`}
//             onClick={() => handleTypeChange("van")}
//           >
//             <FaCaravan />
//             <span>Van</span>
//           </div>
//           <div
//             className={`${classes["filter-item"]} ${
//               filters.type === "fully-integrated" ? classes["selected"] : ""
//             }`}
//             onClick={() => handleTypeChange("fully-integrated")}
//           >
//             <FaCaravan />
//             <span>Fully Integrated</span>
//           </div>
//           <div
//             className={`${classes["filter-item"]} ${
//               filters.type === "alcove" ? classes["selected"] : ""
//             }`}
//             onClick={() => handleTypeChange("alcove")}
//           >
//             <FaCaravan />
//             <span>Alcove</span>
//           </div>
//         </div>

//         <button type="submit" className={classes["search-button"]}>
//           Search
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FilterForm;
