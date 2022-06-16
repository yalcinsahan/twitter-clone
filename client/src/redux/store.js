import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/auth-slice'
import displayReducer from "./display-slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        displays: displayReducer
    }
})