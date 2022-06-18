import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

export const selectFavoriteList = (state: RootState) => state.favorites.list;
export const selectMetricState = (state: RootState) => state.user.isMetric;
export const selectFavoriteLoading = (state: RootState) =>
  state.favorites.isLoading;
export const selectCurrentCity = (state: RootState) => state.city.current;
export const selectCurrentLoading = (state: RootState) => state.city.isLoading;
export const selectNotification = (state: RootState) => state.user.notification;
export const selectSuggestions = (state: RootState) => state.search.suggestions;
export const selectUserLocationCity = (state: RootState) =>
  state.user.userLocation;
export const selectFirstLoadState = (state: RootState) => state.user.firstLoad;

export const isFavoriteSelector = createSelector(
  selectFavoriteList,
  (_: RootState, key: string) => key,
  (list, key) => list.some((item) => item.key === key)
);
