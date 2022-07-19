import "./VideoCard.css";
import { postCall } from "./reusableFunctions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { setHistory } from "../features.js/userActivitySlice";

export const VideoCard = ({ item, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const postHistory = async (video) => {
    const data = postCall("/api/user/history", { video });
    dispatch(setHistory(data.history))
    navigate(`/videos/${item._id}`);
  };

  return (
    <div className="video-card-container">
      <img className="video-card-media" src={item.thumbnail_url} alt="" />
      <p className="video-card-title">
        <strong>{item.title}</strong>
      </p>
      <p className="video-card-sub-title">{item.creator}</p>
      <button
        className="video-card-btn duck-primary-btn-s duck-primary-btn"
        onClick={() => postHistory(item)}
      >
        Watch Now
      </button>
    </div>
  );
};
