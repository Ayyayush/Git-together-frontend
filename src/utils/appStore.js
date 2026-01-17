import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";   // adjust path if needed

const appStore = configureStore({
  reducer: {
    user: userReducer,   // ✅ CONNECT user slice to store
  },
});

export default appStore;
