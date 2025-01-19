import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "@redux/campersOps";
import {
  selectFilteredCampers,
  selectUniqueLocations,
  selectLoading,
  selectError,
} from "@redux/campersSlice";
import {
  updateFilter,
  removeCustomFilter,
  addCustomFilter,
  selectAllFilters,
} from "@redux/filtersSlice";
import { CampersList } from "@components/CampersList/CampersList";
import css from "./CatalogPage.module.css";
import icons from "../../images/icons.svg";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(4);

  const campers = useSelector(selectFilteredCampers);
  const locations = useSelector(selectUniqueLocations);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filters = useSelector(selectAllFilters);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const updateVisibleCount = () => setVisibleCount((prev) => prev + 4);

  const toggleFilter = (filterName) => {
    filters.others.includes(filterName)
      ? dispatch(removeCustomFilter(filterName))
      : dispatch(addCustomFilter(filterName));
  };

  const selectType = (typeName) => {
    dispatch(
      updateFilter({
        key: "type",
        value: filters.type === typeName ? "" : typeName,
      })
    );
  };

  const handleLocationChange = (e) => {
    dispatch(updateFilter({ key: "location", value: e.target.value }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const visibleCampers = campers.items.slice(0, visibleCount);

  return (
    <div className={css.container}>
      <FilterPanel
        locations={locations}
        filters={filters}
        onLocationChange={handleLocationChange}
        onFilterToggle={toggleFilter}
        onTypeSelect={selectType}
      />

      <div className={css.Catalogcontainer}>
        <CampersList campers={{ items: visibleCampers, total: visibleCount }} />

        {campers.items.length > visibleCount && !loading && (
          <div className={css.buttonMoreContainer}>
            <button className={css.buttonMore} onClick={updateVisibleCount}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterPanel = ({
  locations,
  filters,
  onLocationChange,
  onFilterToggle,
  onTypeSelect,
}) => (
  <form className={css.form}>
    <LocationFilter
      locations={locations}
      selectedLocation={filters.location}
      onLocationChange={onLocationChange}
    />
    <h3 className={css.filter}>Filters</h3>

    <EquipmentFilters
      filters={filters.others}
      onFilterToggle={onFilterToggle}
    />
    <VehicleTypeFilters
      selectedType={filters.type}
      onTypeSelect={onTypeSelect}
    />
    <button type="button" className={css.button} onClick={onLocationChange}>
      Search
    </button>
  </form>
);

const LocationFilter = ({ locations, selectedLocation, onLocationChange }) => (
  <div>
    <label htmlFor="location-select" className={css.label}>
      Location
    </label>
    <select
      id="location-select"
      className={css.select}
      value={selectedLocation}
      onChange={onLocationChange}
    >
      <option value="">City</option>
      {locations.map((location, index) => (
        <option key={index} value={location}>
          {location}
        </option>
      ))}
    </select>
  </div>
);

const EquipmentFilters = ({ filters, onFilterToggle }) => (
  <div>
    <h2 className={css.filterTitle}>Vehicle Equipment</h2>
    <div className={css.filterContainer}>
      {[
        { name: "AC", icon: `${icons}#icon-AC` },
        { name: "automatic", icon: `${icons}#icon-Automatic` },
        { name: "kitchen", icon: `${icons}#icon-Kitchen` },
        { name: "TV", icon: `${icons}#icon-TV` },
        { name: "bathroom", icon: `${icons}#icon-Bathroom` },
      ].map(({ name, icon }) => (
        <div
          key={name}
          className={`${css.filterItem} ${
            filters.includes(name) ? css.active : ""
          }`}
          onClick={() => onFilterToggle(name)}
        >
          <svg className={css.filterImage}>
            <use xlinkHref={icon}></use>
          </svg>
          <p className={css.filterName}>{name}</p>
        </div>
      ))}
    </div>
  </div>
);

const VehicleTypeFilters = ({ selectedType, onTypeSelect }) => (
  <div>
    <h2 className={css.filterTitle}>Vehicle Type</h2>
    <div className={css.filterContainer}>
      {[
        { name: "panelTruck", label: "Van", icon: `${icons}#icon-Van` },
        {
          name: "fullyIntegrated",
          label: "Fully Integrated",
          icon: `${icons}#icon-Fully Integrated`,
        },
        { name: "alcove", label: "Alcove", icon: `${icons}#icon-Alcove` },
      ].map(({ name, label, icon }) => (
        <div
          key={name}
          className={`${css.filterItem} ${
            selectedType === name ? css.active : ""
          }`}
          onClick={() => onTypeSelect(name)}
        >
          <svg className={css.filterImage}>
            <use xlinkHref={icon}></use>
          </svg>
          <p className={css.filterName}>{label}</p>
        </div>
      ))}
    </div>
  </div>
);

export default CatalogPage;
