import { createContext, useContext, useReducer } from "react";
import {
  getWatchLaterVideos,
  getPlaylists,
  getHistory,
} from "./videoActionTypes";

const VideoContext = createContext();
const useVideo = () => useContext(VideoContext);

const videoReducer = (state, action) => {
  switch (action.type) {
    case getWatchLaterVideos:
      return {
        ...state,
        watchlaterVideos: action.payload,
      };
    case getPlaylists:
      return {
        ...state,
        playlist: action.payload,
      };
    case getHistory:
      return {
        ...state,
        history: action.payload,
      };

    default:
      state;
  }
};
const initialState = {
  watchlaterVideos: [],
  playlist: [],
  history: [],
};
const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

export { VideoProvider, useVideo };
