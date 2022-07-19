
import { createSlice } from "@reduxjs/toolkit/";
import { act } from "react-dom/test-utils";


const initialState = {
    isAuthenticated : false
}

const authSlice = createSlice({
    name: "authenication",
    initialState,
    reducers: {
        setAuthentication: (state, action) => {
            state.isAuthenticated = action.payload
        }
    }
})


export const {setAuthentication} = authSlice.actions

export default authSlice.reducer