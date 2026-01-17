import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    updateFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
    clearFeed: () => {
      return [];
    },
  },
});

export const { addFeed, updateFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
