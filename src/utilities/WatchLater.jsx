import { useEffect } from "react";
import { deleteCall, getCall } from "./reusableFunctions";
import "./WatchLater.css";
import { useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { setWatchLater } from "../features.js/userActivitySlice";

export const WatchLater = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const watchlaterVideos = useSelector(
    (state) => state.activityState.watchLater
  );
  useEffect(async () => {
    const data = await getCall("/api/user/watchlater");
    dispatch(setWatchLater(data.watchlater));
  }, []);
  const deleteWatchedlaterVideoHandler = async (id) => {
    const data = await deleteCall(`/api/user/watchlater/${id}`);
    dispatch(setWatchLater(data.watchlater));
  };

  return (
    <Layout>
      <h2>Watch Later</h2>
      <div className="watch-later-videos-container">
        <div>
          {watchlaterVideos?.map((watchLaterVid) => {
            return (
              <div className="list" key={watchLaterVid._id}>
                <li onClick={() => navigate(`/videos/${watchLaterVid._id}`)}>
                  {watchLaterVid.title}
                </li>
                <span>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() =>
                      deleteWatchedlaterVideoHandler(watchLaterVid._id)
                    }
                  ></i>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
