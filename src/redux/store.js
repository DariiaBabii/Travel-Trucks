import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { campersReducer } from "./campersSlice";
import filtersReducer from "./filtersSlice";
import favoritedSlice from "./favoritesSlice";

const persistConfig = {
  key: "favorited", // Unique key for likedReducer persistence
  storage,
};

const persistedLikedReducer = persistReducer(persistConfig, favoritedSlice);

const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    liked: persistedLikedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
