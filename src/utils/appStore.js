import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import sidebarReducer from "./sidebarSlice";
import themeReducer from "./themeSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
    sideBar: sidebarReducer,
    theme: themeReducer,
  },
});

export default appStore;
