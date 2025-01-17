import { createSlice } from "@reduxjs/toolkit";

export const loadFavoritedCampersFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem("favoritedCampers");
    return savedState ? JSON.parse(savedState) : [];
  } catch (error) {
    console.error("Error loading favorited campers", error);
    return [];
  }
};

export const saveFavoritedCampersToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("favoritedCampers", serializedState);
  } catch (error) {
    console.error("Error saving favorited campers", error);
  }
};

const initialState = {
  favorited: [], // Array of camper IDs
};

const favoritedSlice = createSlice({
  name: "favorited",
  initialState,
  reducers: {
    toggleLike(state, action) {
      const camperId = action.payload;
      if (state.favorited.includes(camperId)) {
        state.favorited = state.favorited.filter((id) => id !== camperId);
      } else {
        state.favorited.push(camperId);
      }
    },
  },
});

export const { toggleLike } = favoritedSlice.actions;
export const selectfavorited = (state) => state.favorited.favorited;
export default favoritedSlice.reducer;
