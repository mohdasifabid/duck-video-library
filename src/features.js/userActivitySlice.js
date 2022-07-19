import {createSlice} from "@reduxjs/toolkit"

const initialState = {
   likedVideos: []
}

const userActivitySlice = createSlice({
    name: "userActivity",
    initialState,
    reducers: {
        setLikedVideos: (state,action) => {
            state.likedVideos = action.payload
        }
    }

})

export const {setLikedVideos} = userActivitySlice.actions
export default userActivitySlice.reducer