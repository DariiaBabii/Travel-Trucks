import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    type: "",
    location: "",
    others: [],
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilter(state, action) {
      const { key, value } = action.payload;
      if (key in state.filters) {
        state.filters[key] = value;
      } else {
        console.warn(`Invalid filter key: ${key}`);
      }
    },
    resetFilters(state) {
      state.filters = { type: "", location: "", others: [] };
    },
    addCustomFilter(state, action) {
      const filterName = action.payload;
      if (!state.filters.others.includes(filterName)) {
        state.filters.others.push(filterName);
      }
    },
    removeCustomFilter(state, action) {
      const filterName = action.payload;
      state.filters.others = state.filters.others.filter(
        (filter) => filter !== filterName
      );
    },
  },
});

export const {
  updateFilter,
  resetFilters,
  addCustomFilter,
  removeCustomFilter,
} = filtersSlice.actions;

export const selectFilterByKey = (key) => (state) =>
  state.filters.filters[key] || null;

export const selectAllFilters = (state) => state.filters.filters;

export const selectSelectedFilters = (state) => state.filters.filters;

export default filtersSlice.reducer;
