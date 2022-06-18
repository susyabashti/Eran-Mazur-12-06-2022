import { DEFAULT_CITY } from "@global/vars";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Suggestion } from "@store/types/searchTypes";
import { UserState, MessageValues } from "@store/types/userTypes";

const initialState: UserState = {
  notification: null,
  isMetric: true,
  isDark: false,
  userLocation: DEFAULT_CITY,
  firstLoad: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMessage(state, { payload }: PayloadAction<MessageValues>) {
      state.notification = payload;
    },
    resetMessage(state) {
      state.notification = null;
    },
    toggleMetric(state) {
      state.isMetric = !state.isMetric;
    },
    toggleDark(state) {
      state.isDark = !state.isDark;
    },
    setUserLocation(state, { payload }: PayloadAction<Suggestion>) {
      state.userLocation = payload;
    },
    setFirstLoadState(state, { payload }: PayloadAction<boolean>) {
      state.firstLoad = payload;
    },
  },
});

export const userActions = userSlice.actions;
