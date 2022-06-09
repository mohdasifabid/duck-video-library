import "./History.css";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { VideoCard } from "./VideoCard";
import { useVideo } from "../useVideo";
import { Link } from "react-router-dom";
import { deleteCall, getCall } from "./reusableFunctions";

export const History = () => {
  const { state, dispatch } = useVideo();

  useEffect(async () => {
    const data = await getCall("/api/user/history");
    dispatch({ type: "GET_HISTORY", payload: data.history });
  }, []);

  const deleteHistory = async () => {
    const data = await deleteCall("/api/user/history/all");
    dispatch({ type: "GET_HISTORY", payload: data.history });
  };

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
        <div className="history-videos-body">
          <div className="history-videos-heading-clear-btn-container">
            <h1>History</h1>
            <button
              className=" history-videos-clear-btn duck-primary-btn-s duck-primary-btn"
              onClick={deleteHistory}
            >
              Clear History
            </button>
          </div>
          <div className="history-videos-container">
            <div className="history-videos-card-container">
              {state.history &&
                state.history.map((hvideo) => {
                  return <VideoCard item={hvideo} type="history" />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
