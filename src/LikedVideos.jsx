import { useEffect } from "react";
import "./utilities/WatchLater.css";
import { Layout } from "./utilities/Layout";
import { useNavigate } from "react-router-dom";
import { deleteCall, getCall } from "./utilities/reusableFunctions";
import { useDispatch, useSelector } from "react-redux";
import { setLikedVideos } from "./features.js/userActivitySlice";

export const LikedVideos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const likedVideos = useSelector((state) => state.activityState.likedVideos);
  useEffect(async () => {
    const data = await getCall("/api/user/likes");
    dispatch(setLikedVideos(data.likes));
  }, []);

  const deleteLikedVideoHandler = async (id) => {
    const data = await deleteCall(`/api/user/likes/${id}`);
    dispatch(setLikedVideos(data.likes));
  };
  return (
    <Layout>
      <h2>Liked videos</h2>
      <div className="watch-later-videos-container">
        {likedVideos?.map((likedV) => {
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
    </Layout>
  );
};
