// src/app/layout.jsx (or _app.js if you're not using App Directory)
"use client"
import { Provider } from 'react-redux';
import { store } from './auth/store/store';

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
};

export default Providers;