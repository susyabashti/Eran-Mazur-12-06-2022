import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FavoriteData,
  FavoriteState,
  UpdateProps,
} from "@store/types/favoritesTypes";

const initialState: FavoriteState = { list: [], isLoading: false };

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, { payload }: PayloadAction<FavoriteData>) {
      state.list = [...state.list, payload];
    },

    removeFavorite(state, { payload }: PayloadAction<string>) {
      state.list = state.list.filter((item) => item.key !== payload);
    },

    updateFavorite(state, { payload }: PayloadAction<UpdateProps>) {
      const item = state.list.findIndex((item) => item.key === payload.key);

      if (item !== -1) {
        state.list[item].current = payload.data;
      }
    },

    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload;
    },
  },
});

export const favoriteActions = favoriteSlice.actions;
