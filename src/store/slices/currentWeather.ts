import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentCity, CurrentState } from "@store/types/currentWeatherTypes";

export const initialState: CurrentState = {
  current: null,
  isLoading: false,
};

export const currentWeatherSlice = createSlice({
  name: "current-weather",
  initialState,
  reducers: {
    setCurrentCity(state, { payload }: PayloadAction<CurrentCity>) {
      state.current = payload;
    },

    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload;
    },
  },
});

export const currentActions = currentWeatherSlice.actions;
