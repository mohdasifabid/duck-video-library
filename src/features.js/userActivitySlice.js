import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedVideos: [],
  watchLater: [],
  playlist: [],
  history: [],
};

const userActivitySlice = createSlice({
  name: "userActivity",
  initialState,
  reducers: {
    setLikedVideos: (state, action) => {
      state.likedVideos = action.payload;
    },
    setWatchLater: (state, action) => {
      state.watchLater = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { setLikedVideos, setWatchLater, setPlaylist, setHistory } =
  userActivitySlice.actions;
export default userActivitySlice.reducer;
