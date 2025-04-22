// src/store/chat/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentGroup: null,
    messages: [],
  },
  reducers: {
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setCurrentGroup, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
