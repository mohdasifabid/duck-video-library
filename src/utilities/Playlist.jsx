import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useVideo } from "../useVideo";
import { Navbar } from "./Navbar";
import "./Playlist.css";
import { getCall } from "./reusableFunctions";

export const Playlist = () => {
  const { state, dispatch } = useVideo();
  useEffect(async () => {
    const data = await getCall("/api/user/playlists");
    dispatch({ type: "GET_PLAYLISTS", payload: data.playlists });
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
        <div className="playlist-body">
          <div className="playlist-heading-clear-btn-container">
            <h2>Playlist</h2>
            <button className=" playlist-clear-btn duck-primary-btn-s duck-primary-btn">
              Clear Playlist
            </button>
          </div>
          {state.playlist.map((item) => {
            return (
              <div className="playlist-body-content" key={item._id}>
                <Link to={`/playlist/${item._id}`}>
                  <p className="playlist-body-content-playlist-name">
                    <strong>{item.title}</strong>
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
