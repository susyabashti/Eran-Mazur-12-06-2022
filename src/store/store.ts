import { configureStore } from "@reduxjs/toolkit";
import { currentWeatherSlice } from "@store/slices/currentWeather";
import { favoriteSlice } from "@store/slices/favorites";
import { userSlice } from "@store/slices/user";
import { searchSlice } from "@store/slices/search";

export const store = configureStore({
  reducer: {
    city: currentWeatherSlice.reducer,
    search: searchSlice.reducer,
    user: userSlice.reducer,
    favorites: favoriteSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
