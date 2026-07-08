import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import sidebarReducer from "./sidebarSlice";
import themeReducer from "./themeSlice";
import notificationReducer from "./notificationSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
    sideBar: sidebarReducer,
    theme: themeReducer,
    notifications: notificationReducer,
  },
});

export default appStore;