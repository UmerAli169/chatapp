// src/store/chat/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentUser: null,
    messages: [],
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.messages = [];    // reset messages when switching chats
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const { setCurrentUser, setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
