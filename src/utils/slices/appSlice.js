import { createSlice } from "@reduxjs/toolkit";
import lang from "../languageConstants";

const appSlice = createSlice({
  name: "app",
  initialState: {
    language: "en",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { changeLanguage } = appSlice.actions;
