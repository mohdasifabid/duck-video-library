import "./VideoCard.css";
import { useVideo } from "../useVideo";
import { postCall } from "./reusableFunctions";
import { getHistory } from "./videoActionTypes";
import { useNavigate } from "react-router-dom";

export const VideoCard = ({ item, type }) => {
  const { dispatch } = useVideo();
  const navigate = useNavigate();
  const postHistory = async (video) => {
    const data = postCall("/api/user/history", { video });
    dispatch({ type: getHistory, payload: data.history });
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
