import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    unreadCount: 0,
  },
  reducers: {
    setNotificationsData: (state, action) => {
      state.notifications = action.payload.notifications;
      state.unreadCount = action.payload.unreadCount;
    },
    addNotificationItem: (state, action) => {
      // Avoid adding explicit identical duplicates instantly
      const holdsMatch = state.notifications.some(
        (n) => n._id === action.payload._id
      );
      if (!holdsMatch) {
        state.notifications.unshift(action.payload);
        state.unreadCount += 1;
      }
    },
    markItemAsRead: (state, action) => {
      const item = state.notifications.find((n) => n._id === action.payload);
      if (item && !item.isRead) {
        item.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllItemsAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.isRead = true;
      });
      state.unreadCount = 0;
    },
    clearNotificationsStore: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  setNotificationsData,
  addNotificationItem,
  markItemAsRead,
  markAllItemsAsRead,
  clearNotificationsStore,
} = notificationSlice.actions;

export default notificationSlice.reducer;