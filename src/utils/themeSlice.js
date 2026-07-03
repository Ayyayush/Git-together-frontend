import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",

  initialState: {
    theme: localStorage.getItem("theme") || "dark",
  },

  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;