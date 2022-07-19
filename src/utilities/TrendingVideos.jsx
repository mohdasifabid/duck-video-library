import "./TrendingVideos.css";
import { Navbar } from "./Navbar";
import { VideoCard } from "./VideoCard";
import { useVideo } from "../useVideo";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCall } from "./reusableFunctions";
import { getCategories, getVideos } from "../videoActionTypes";
import { useDispatch, useSelector } from "react-redux";
import { setVideos } from "../features.js/videoSlice";

export const TrendingVideos = () => {
  const { state, dispatch: contextDispatch } = useVideo();
  const [categoryChecker, setCategoryCheck] = useState("");
  const dispatch = useDispatch()
  const videosData = useSelector((state)=>state.videoState.videos)

  useEffect(async () => {
    const data = await getCall("/api/categories");
    contextDispatch({ type: getCategories, payload: data.categories });
    const videoData = await getCall("api/videos");
    // contextDispatch({ type: getVideos, payload: videoData.videos });
    dispatch(setVideos(videoData.videos))
  }, []);

  const filterCategory = (data, checker) => {
    let newData = data;
    if (checker === "all") {
      newData = data;
    }
    if (checker === "music") {
      newData = data.filter((vid) => vid.category === checker);
    }
    if (checker === "tech") {
      newData = data.filter((vid) => vid.category === checker);
    }
    return newData;
  };
  const updatedData = filterCategory(videosData, categoryChecker);
  return (
    <div>
      <Navbar />
      <ol className="mobile-navigation">
        <Link
          to="/"
          className="landing-page-body-links duck-list-content-type-items"
        >
          <div className="duck-link-avatar-polygon-type">
            <i className="fa-solid fa-house-chimney"></i>
          </div>
        </Link>
        <Link
          to="/playlist"
          className="landing-page-body-links duck-list-content-type-items"
        >
          <div className="duck-link-avatar-polygon-type">
            <i className="fa-solid fa-list"></i>
          </div>
        </Link>
        <Link
          to="/liked"
          className="landing-page-body-links duck-list-content-type-items"
        >
          <div className="duck-link-avatar-polygon-type">
            <i className="fa-solid fa-thumbs-up"></i>
          </div>
        </Link>
        <Link
          to="/watch-later"
          className="landing-page-body-links duck-list-content-type-items"
        >
          <div className="duck-link-avatar-polygon-type">
            <i className="fa-regular fa-clock"></i>
          </div>
        </Link>
        <Link
          to="/history"
          className="landing-page-body-links duck-list-content-type-items"
        >
          <div className="duck-link-avatar-polygon-type">
            <i className="fa-solid fa-rotate-left"></i>
          </div>
        </Link>
      </ol>
      <div className="category-container">
        {state.categories.map((cat) => {
          return (
            <button
              className="category-box"
              onClick={() => setCategoryCheck(cat.categoryName)}
              key={cat._id}
            >
              {cat.categoryName}
            </button>
          );
        })}
      </div>
      <div className="landing-page-body-container trending-page-body">
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
        <div className="trending-videos-body">
          <div className="trending-videos-card-container">
            {updatedData.map((item) => {
              return <VideoCard item={item} key={item._id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
