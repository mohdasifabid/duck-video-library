import { createContext, useContext, useReducer } from "react";
const VideoContext = createContext();
const useVideo = () => useContext(VideoContext);

const videoReducer = (state, action) => {
  switch (action.type) {
    case "GET_VIDEOS":
      return {
        ...state,
        videos: action.payload,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "GET_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: action.payload,
      };
    case "GET_WATCH_LATER_VIDEOS":
      return {
        ...state,
        watchlaterVideos: action.payload,
      };
    case "GET_PLAYLISTS":
      return {
        ...state,
        playlists: action.payload,
      };
    case "GET_HISTORY":
      return {
        ...state,
        history: action.payload,
      };

    default:
      state;
  }
};

const initialState = {
  videos: [],
  categories: [],
  likedVideos: [],
  watchlaterVideos: [],
  playlists: [],
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
