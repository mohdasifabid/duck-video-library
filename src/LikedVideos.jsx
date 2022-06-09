import axios from "axios";
import { useEffect } from "react";
import { useVideo } from "./useVideo";
import { Navbar } from "./utilities/Navbar";
import { VideoCard } from "./utilities/VideoCard";
import "./utilities/WatchLater.css";
import { Link } from "react-router-dom";
export const LikedVideos = () => {
  const { state, dispatch } = useVideo();
  useEffect(() => {
    const getLikedVideos = async () => {
      const token = localStorage.getItem("encodedToken");
      const response = await axios.get("/api/user/likes", {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        dispatch({ type: "GET_LIKED_VIDEOS", payload: response.data.likes });
      }
    };
    getLikedVideos();
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
          <h1>Liked videos</h1>
          <div className="watch-later-videos-container">
            {state.likedVideos.length > 0 && (
              <div className="watch-later-videos-card-container">
                {state.likedVideos.map((likedV) => {
                  return <VideoCard type="lv" item={likedV} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
