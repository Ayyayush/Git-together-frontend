// feedSlice.js
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    list: null,
    search: "",
    page: 0,
    hasMore: true,
  },
  reducers: {
    // Full replace — used only for the very first page load (or a hard refresh).
    addFeed: (state, action) => {
      const { data, hasMore, page } = action.payload;
      state.list = data;
      state.hasMore = hasMore ?? true;
      state.page = page ?? 1;
    },
    // Appends the next page onto the existing list without touching what's
    // already there (so cards already removed via Collaborate/Ignore stay gone).
    appendFeed: (state, action) => {
      const { data, hasMore, page } = action.payload;
      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const existingIds = new Set(state.list.map((user) => user._id));
      const newUsers = (data || []).filter((user) => !existingIds.has(user._id));
      state.list = [...state.list, ...newUsers];
      state.hasMore = hasMore ?? false;
      if (page) state.page = page;
    },
    updateFeed: (state, action) => {
      if (Array.isArray(state.list)) {
        state.list = state.list.filter(
          (user) => user._id !== action.payload
        );
      }
    },
    rollbackFeedItem: (state, action) => {
      if (Array.isArray(state.list)) {
        // Prevent accidental duplication layout states
        const exists = state.list.some((user) => user._id === action.payload._id);
        if (!exists) {
          state.list = [action.payload, ...state.list];
        }
      }
    },
    setSearch: (state, action) => {
      state.search = action.payload.toLowerCase();
    },
  },
});

export const { addFeed, appendFeed, updateFeed, rollbackFeedItem, setSearch } = feedSlice.actions;
export default feedSlice.reducer;