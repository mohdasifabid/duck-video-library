import { useEffect } from "react";
import { useVideo } from "../useVideo";
import { Navbar } from "./Navbar";
import { getCall } from "./reusableFunctions";
import { VideoCard } from "./VideoCard";
import "./WatchLater.css";
import { Link } from "react-router-dom";
export const WatchLater = () => {
  const { state, dispatch } = useVideo();
  useEffect(async () => {
    const data = await getCall("/api/user/watchlater");
    dispatch({ type: "GET_WATCH_LATER_VIDEOS", payload: data.watchlater });
  }, []);
  return (
    <div>
      <Navbar />
      <div className="common-container">
        <ol className="duck-list-content-type">
          <Link
            to="/"
            className="landing-page-body-links duck-list-content-type-items"
          >
            <div className="duck-link-avatar-polygon-type">
              <i className="fa-solid fa-house-chimney"></i>
            </div>
            Home
          </Link>
          <Link
            to="/playlist"
            className="landing-page-body-links duck-list-content-type-items"
          >
            <div className="duck-link-avatar-polygon-type">
              <i className="fa-solid fa-list"></i>
            </div>
            Playlist
          </Link>
          <Link
            to="/liked"
            className="landing-page-body-links duck-list-content-type-items"
          >
            <div className="duck-link-avatar-polygon-type">
              <i className="fa-solid fa-thumbs-up"></i>
            </div>
            Liked
          </Link>
          <Link
            to="/watch-later"
            className="landing-page-body-links duck-list-content-type-items"
          >
            <div className="duck-link-avatar-polygon-type">
              <i className="fa-regular fa-clock"></i>
            </div>
            Later
          </Link>
          <Link
            to="/history"
            className="landing-page-body-links duck-list-content-type-items"
          >
            <div className="duck-link-avatar-polygon-type">
              <i className="fa-solid fa-rotate-left"></i>
            </div>
            History
          </Link>
        </ol>
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
    </div>
  );
};
