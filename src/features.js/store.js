import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import videoReducer from "./videoSlice"
import categoryReducer from "./categorySlice"

export const store = configureStore({
   reducer: {
    authState: authReducer,
    videoState: videoReducer,
    categoryState: categoryReducer
   }
})