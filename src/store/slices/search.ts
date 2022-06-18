import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchState, SuggestionListType } from "@store/types/searchTypes";

const initialSearchState: SearchState = {
  suggestions: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    setSuggestions(state, { payload }: PayloadAction<SuggestionListType>) {
      state.suggestions = payload;
    },

    resetSuggestions(state) {
      state.suggestions = [];
    },
  },
});

export const searchActions = searchSlice.actions;
