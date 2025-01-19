import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "./campersOps";
import { selectAllFilters, selectFilterByKey } from "./filtersSlice";

const handleRequest = (state) => {
  state.loading = true;
  state.error = null;
};

const handleError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const initialState = {
  items: { total: 0, items: [] },
  displayedItems: { total: 0, items: [] },
  loading: false,
  error: null,
  selectedItem: null,
  currentPage: 1,
  itemsPerPage: 4,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      if (action.payload === 1) {
        state.items = { total: 0, items: [] };
        state.displayedItems = { total: 0, items: [] };
        state.currentPage = 1;
      }
      state.currentPage = action.payload;
    },
    clearCampers(state) {
      state.items = { total: 0, items: [] };
      state.displayedItems = { total: 0, items: [] };
      state.currentPage = 1;
      state.selectedItem = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, handleRequest)
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
        const displayedItems = state.items.items.slice(0, state.itemsPerPage);
        state.displayedItems = {
          total: displayedItems.length,
          items: displayedItems,
        };
      })
      .addCase(fetchCampers.rejected, handleError)
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
      })
      .addCase(fetchCamperById.pending, handleRequest)
      .addCase(fetchCamperById.rejected, handleError);
  },
});

export const { setCurrentPage, clearCampers } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;

export const selectCampers = (state) => state.campers.items;
export const selectLoading = (state) => state.campers.loading;
export const selectError = (state) => state.campers.error;
export const selectFilter = (state) => state.filters;
export const selectCampersById = (state) => state.campers.selectedItem;
export const selectDisplayedItems = (state) => state.campers.displayedItems;
export const selectCurrentPage = (state) => state.campers.currentPage;
export const selectSelectedItem = (state) => state.campers.selectedItem;

export const selectFilteredCampers = createSelector(
  [
    selectCampers,
    selectAllFilters,
    selectFilterByKey("type"),
    selectFilterByKey("location"),
  ],
  (campers, filters, type, location) => {
    if (campers.items.length === 0) return campers;
    let filteredCampers = campers.items;

    if (filters.others.length > 0) {
      filteredCampers = filteredCampers.filter((camper) =>
        filters.others.every((filter) =>
          filter !== "automatic"
            ? camper[filter]
            : camper.transmission === "automatic"
        )
      );
    }

    if (type)
      filteredCampers = filteredCampers.filter(
        (camper) => camper.form === type
      );
    if (location && location !== "City")
      filteredCampers = filteredCampers.filter(
        (camper) => camper.location === location
      );

    return { total: filteredCampers.length, items: filteredCampers };
  }
);

export const selectUniqueLocations = createSelector(
  [selectCampers],
  (campers) => [...new Set(campers.items.map((item) => item.location))]
);

export default campersSlice.reducer;
