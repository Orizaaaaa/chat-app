// Corrected version of your store configuration
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
