import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampers,
  selectFilteredCampers,
  selectUniqueLocations,
  selectLoading,
  selectError,
} from "../../redux/campersSlice";
import {
  setSelectedFilters,
  setSelectedType,
  setSelectedLocation,
  clearFilters,
} from "../../redux/filtersSlice";
import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();

  const campers = useSelector(selectFilteredCampers);
  const locations = useSelector(selectUniqueLocations);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [filters, setFilters] = useState([]);
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchCampers({ page, itemsPerPage }));
  }, [dispatch, page, filters, type, location]);

  const handleFilterClick = (filterName) => {
    setFilters((prevFilters) =>
      prevFilters.includes(filterName)
        ? prevFilters.filter((filter) => filter !== filterName)
        : [...prevFilters, filterName]
    );
  };

  const handleTypeClick = (typeName) => {
    setType((prevType) => (prevType === typeName ? "" : typeName));
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const applyFilters = () => {
    dispatch(clearFilters());
    dispatch(setSelectedFilters(filters));
    dispatch(setSelectedType(type));
    dispatch(setSelectedLocation(location));
    setPage(1); // Reseting to first page when applying new filters
    dispatch(fetchCampers({ page: 1, itemsPerPage }));
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && page === 1) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={css.container}>
      <form className={css.form}>
        <label htmlFor="location-select" className={css.label}>
          Location
        </label>
        <select
          id="location-select"
          name="location"
          className={css.select}
          value={location}
          onChange={handleLocationChange}
        >
          <option value="">City</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>

        <h3 className={css.filter}>Filters</h3>
        <div className={css.filterContainer}>
          {["AC", "automatic", "kitchen", "TV", "bathroom"].map((filter) => (
            <div
              key={filter}
              className={`${css.filterItem} ${
                filters.includes(filter) ? css.active : ""
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              <p className={css.filterName}>{filter}</p>
            </div>
          ))}
        </div>

        <h3 className={css.filterTitle}>Vehicle Type</h3>
        <div className={css.filterContainer}>
          {["panelTruck", "fullyIntegrated", "alcove"].map((typeOption) => (
            <div
              key={typeOption}
              className={`${css.filterItem} ${
                type === typeOption ? css.active : ""
              }`}
              onClick={() => handleTypeClick(typeOption)}
            >
              <p className={css.filterName}>{typeOption}</p>
            </div>
          ))}
        </div>

        <button type="button" className={css.button} onClick={applyFilters}>
          Apply Filters
        </button>
      </form>

      <div>
        {campers.items.map((camper) => (
          <div key={camper.id} className={css.camperCard}>
            <h4>{camper.title}</h4>
          </div>
        ))}

        {loading && <p>Loading...</p>}
        {campers.items.length > 0 &&
          campers.items.length < campers.totalItems && (
            <button onClick={handleLoadMore} className={css.buttonMore}>
              Load More
            </button>
          )}
      </div>
    </div>
  );
};

export default CatalogPage;
