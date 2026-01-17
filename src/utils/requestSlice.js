import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",

  initialState: {
    received: null,   // ✅ NULL = loading
    sent: null,
  },

  reducers: {
    setReceivedRequests: (state, action) => {
      state.received = action.payload;
    },

    setSentRequests: (state, action) => {
      state.sent = action.payload;
    },

    addReceivedRequest: (state, action) => {
      state.received.push(action.payload);
    },

    removeReceivedRequest: (state, action) => {
      state.received = state.received.filter(
        (req) => req._id !== action.payload
      );
    },

    addSentRequest: (state, action) => {
      state.sent.push(action.payload);
    },

    removeSentRequest: (state, action) => {
      state.sent = state.sent.filter(
        (req) => req._id !== action.payload
      );
    },

    clearRequests: (state) => {
      state.received = null;
      state.sent = null;
    },
  },
});

export const {
  setReceivedRequests,
  setSentRequests,
  addReceivedRequest,
  removeReceivedRequest,
  addSentRequest,
  removeSentRequest,
  clearRequests,
} = requestSlice.actions;

export default requestSlice.reducer;
