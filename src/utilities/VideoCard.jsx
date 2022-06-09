import { Link } from "react-router-dom";
import { useVideo } from "../useVideo";
import { postCall } from "./reusableFunctions";
import "./VideoCard.css";

export const VideoCard = ({ item, type }) => {
  const { dispatch } = useVideo();
  const postHistory = async (video) => {
    const data = postCall("/api/user/history", { video });
    dispatch({ type: "GET_HISTORY", payload: data.history });
  };

  return (
    <div className="video-card-container">
      <iframe
        className="video-card-media"
        src={`https://youtube.com/embed/${item.vLink}`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />
      <p className="video-card-title">
        <strong>{item.title}</strong>
      </p>
      <p className="video-card-sub-title">{item.creator}</p>
      <Link to={`/videos/${item._id}`}>
        <button
          className="video-card-btn duck-primary-btn-s duck-primary-btn"
          onClick={() => postHistory(item)}
        >
          Watch Now
        </button>
      </Link>
    </div>
  );
};
