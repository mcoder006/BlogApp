import authSlice from './AuthSlice';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        authSlice: authSlice,
    }
});

export default store;