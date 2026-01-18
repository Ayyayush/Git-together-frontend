import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "request",
  initialState: {
    sidebar: false,
  },
  reducers: {
    toggleSibeBar: (state, action) => {
      state.sidebar = action.payload;
    },
  },
});

export const { toggleSibeBar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
