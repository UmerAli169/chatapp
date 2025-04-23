// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../userSlice';
import chatReducer from '../../chat/chatSlice';



export const store = configureStore({
  reducer: {
    user: userReducer,
    chat:chatReducer
  },
});

