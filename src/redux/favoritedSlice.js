import { createSlice } from "@reduxjs/toolkit";

export const loadfavoritedCampersFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem("favoritedCampers");
    return savedState ? JSON.parse(savedState) : [];
  } catch (error) {
    console.error("Error loading campers from localStorage", error);
    return [];
  }
};

export const savefavoritedCampersToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("favoritedCampers", serializedState);
  } catch (error) {
    console.error("Error saving campers to localStorage", error);
  }
};

const initialState = {
  favorited: loadfavoritedCampersFromLocalStorage(),
};

const favoritedSlice = createSlice({
  name: "favorited",
  initialState,
  reducers: {
    toggleLike(state, action) {
      const camperId = action.payload;
      const index = state.favorited.indexOf(camperId);
      if (index > -1) {
        state.favorited.splice(index, 1);
      } else {
        state.favorited.push(camperId);
      }
      savefavoritedCampersToLocalStorage(state.favorited);
    },
  },
});

export const { toggleLike } = favoritedSlice.actions;
export const selectfavorited = (state) => state.favorited.favorited;
export default favoritedSlice.reducer;
