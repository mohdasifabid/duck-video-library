import axios from "axios";
import { Link } from "react-router-dom";
import { useVideo } from "../useVideo";
import "./VideoCard.css";

export const VideoCard = ({ item, type }) => {
  const { state, dispatch } = useVideo();
  const postHistory = async (video) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      "/api/user/history",
      {
        video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 201) {
      dispatch({ type: "GET_HISTORY", payload: response.data.history });
    }
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

      <i className="video-card-like-icon fa-solid fa-heart"></i>
    </div>
  );
};
