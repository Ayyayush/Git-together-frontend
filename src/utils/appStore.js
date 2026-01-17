import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";     // connections page
import requestReducer from "./requestSlice";           // requests (sent/received)

const appStore = configureStore({
  reducer: {
    user: userReducer,               // logged-in user data
    feed: feedReducer,               // feed users list
    connections: connectionReducer,  // accepted connections
    requests: requestReducer,        // pending requests (sent & received)
  },
});

export default appStore;
