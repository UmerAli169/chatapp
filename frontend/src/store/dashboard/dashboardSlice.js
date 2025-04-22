import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: {
    messages: 145,
    contacts: 38,
    groups: 7,
  },
  recentMessages: [
    { from: "Ayesha", msg: "Ready for the meeting?" },
    { from: "Bilal", msg: "Let’s hang out!" },
  ],
  notifications: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateStats: (state, action) => {
      state.stats = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { updateStats, addNotification, clearNotifications } = dashboardSlice.actions;
export default dashboardSlice.reducer;
