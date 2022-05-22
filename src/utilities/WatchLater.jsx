import axios from "axios";
import { useEffect } from "react";
import { useVideo } from "../useVideo";
import { Navbar } from "./Navbar";
import { VideoCard } from "./VideoCard";
import "./WatchLater.css";
export const WatchLater = () => {
  const { state, dispatch } = useVideo();
  useEffect(() => {
    const getWatchLaterVideos = async () => {
      const token = localStorage.getItem("encodedToken");
      const response = await axios.get("/api/user/watchlater", {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        dispatch({
          type: "GET_WATCH_LATER_VIDEOS",
          payload: response.data.watchlater,
        });
      }
    };
    getWatchLaterVideos();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="watch-later-videos-body">
        <h1>Watch Later</h1>
        <div className="watch-later-videos-container">
          <div className="watch-later-videos-card-container">
            {state.watchlaterVideos.map((watchLaterVid) => {
              return <VideoCard type="later" item={watchLaterVid} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
