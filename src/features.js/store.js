import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import videoReducer from "./videoSlice"

export const store = configureStore({
   reducer: {
    authState: authReducer,
    videoState: videoReducer
   }
})