import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    list: null,
    search: "",
  },
  reducers: {
    addFeed: (state, action) => {
      state.list = action.payload;
    },
    updateFeed: (state, action) => {
      state.list = state.list.filter(
        (user) => user._id !== action.payload
      );
    },
    setSearch: (state, action) => {
      state.search = action.payload.toLowerCase();
    },
  },
});

export const { addFeed, updateFeed, setSearch } = feedSlice.actions;
export default feedSlice.reducer;
