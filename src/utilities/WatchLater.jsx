import { useEffect } from "react";
import { useVideo } from "../useVideo";
import { Navbar } from "./Navbar";
import { getCall } from "./reusableFunctions";
import { VideoCard } from "./VideoCard";
import "./WatchLater.css";
export const WatchLater = () => {
  const { state, dispatch } = useVideo();
  useEffect(async () => {
    const data = await getCall("/api/user/watchlater");
    dispatch({ type: "GET_WATCH_LATER_VIDEOS", payload: data.watchlater });
  }, []);
  return (
    <div>
      <Navbar />
      <div className="watch-later-videos-body">
        <h1>Watch Later</h1>
        <div className="watch-later-videos-container">
          <div className="watch-later-videos-card-container">
            {state.watchlaterVideos.map((watchLaterVid) => {
              return (
                <VideoCard
                  type="later"
                  item={watchLaterVid}
                  key={watchLaterVid._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
