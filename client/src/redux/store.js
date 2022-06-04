import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/auth-slice'
import displaySlice from "./display-slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        displays: displaySlice
    }
})