// store.js (or redux/store.js)
import { configureStore } from '@reduxjs/toolkit';
import tierReducer from './tierSlice';  // Assuming you have a slice

const store = configureStore({
  reducer: {
    tier: tierReducer,  // Add your reducers here
  },
});

export default store;
