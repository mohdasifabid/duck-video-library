import { Navbar } from "./Navbar";
import { VideoCard } from "./VideoCard";
import "./TrendingVideos.css";
import { useVideo } from "../useVideo";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const TrendingVideos = () => {
  const { state, dispatch } = useVideo();
  const [categoryChecker, setCategoryCheck] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("encodedToken");
    const getCategoryData = async () => {
      const response = await axios.get("/api/categories", {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        dispatch({ type: "GET_CATEGORIES", payload: response.data.categories });
      }
    };
    getCategoryData();
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

  const updatedData = filterCategory(state.videos, categoryChecker);
  return (
    <div>
      <Navbar />
      <div className="category-container">
        {state.categories.map((cat) => {
          return (
            <p
              className="category-box"
              onClick={() => setCategoryCheck(cat.categoryName)}
              key={cat._id}
            >
              {cat.categoryName}
            </p>
          );
        })}
      </div>
      <div className="landing-page-body-container">
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
            to="/trending"
            className="landing-page-body-links duck-list-content-type-items"
          >
            <div className="duck-link-avatar-polygon-type">
              <i className="fa-brands fa-gripfire"></i>
            </div>
            Trending
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
