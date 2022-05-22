import { Navbar } from "./Navbar";
import { VideoCard } from "./VideoCard";
import "./TrendingVideos.css";
import { useVideo } from "../useVideo";
import axios from "axios";
import { useEffect, useState } from "react";

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
            >
              {cat.categoryName}
            </p>
          );
        })}
      </div>
      <div className="trending-videos-body">
        <div className="trending-videos-card-container">
          {updatedData.map((item) => {
            return <VideoCard item={item} key={item._id} />;
          })}
        </div>
      </div>
    </div>
  );
};
