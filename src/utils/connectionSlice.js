import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null, // null = loading state

  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    clearConnections: () => {
      return null;
    },
  },
});

export const { addConnections, clearConnections } =
  connectionSlice.actions;

export default connectionSlice.reducer;
