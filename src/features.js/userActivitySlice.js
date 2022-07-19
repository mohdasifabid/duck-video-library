import {createSlice} from "@reduxjs/toolkit"

const initialState = {
   likedVideos: [],
   watchLater: []
}

const userActivitySlice = createSlice({
    name: "userActivity",
    initialState,
    reducers: {
        setLikedVideos: (state,action) => {
            state.likedVideos = action.payload
        },
        setWatchLater: (state,action)=>{
            state.watchLater = action.payload
        }
    }

})

export const {setLikedVideos, setWatchLater} = userActivitySlice.actions
export default userActivitySlice.reducer