import axios from "axios";
import { useEffect } from "react";
import "./utilities/WatchLater.css";
import { useVideo } from "./useVideo";
import { Layout } from "./utilities/Layout";
import { useNavigate } from "react-router-dom";
import { deleteCall } from "./utilities/reusableFunctions";
import { getLikedVideos } from "./videoActionTypes";

export const LikedVideos = () => {
  const { state, dispatch } = useVideo();
  const navigate = useNavigate();
  useEffect(() => {
    const getLikedVideosHandler = async () => {
      const token = localStorage.getItem("encodedToken");
      const response = await axios.get("/api/user/likes", {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        dispatch({ type: getLikedVideos, payload: response.data.likes });
      }
    };
    getLikedVideosHandler();
  }, []);

  const deleteLikedVideoHandler = async (id) => {
    const data = await deleteCall(`/api/user/likes/${id}`);
    dispatch({ type: getLikedVideos, payload: data.likes });
  };
  return (
    <Layout>
      <h1>Liked videos</h1>
      <div className="watch-later-videos-container">
        {state.likedVideos.length > 0 && (
          <div>
            {state.likedVideos.map((likedV) => {
              return (
                <div className="list" key={likedV._id}>
                  <li onClick={() => navigate(`/videos/${likedV._id}`)}>
                    {likedV.title}
                  </li>
                  <span>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteLikedVideoHandler(likedV._id)}
                    ></i>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};
