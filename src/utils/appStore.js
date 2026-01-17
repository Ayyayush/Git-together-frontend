import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,   // logged-in user data
    feed: feedReducer,   // feed users list
  },
});

export default appStore;
