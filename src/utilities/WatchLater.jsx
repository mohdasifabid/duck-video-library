import { useEffect } from "react";
import { useVideo } from "../useVideo";
import { deleteCall, getCall } from "./reusableFunctions";
import "./WatchLater.css";
import { useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import { getWatchLaterVideos } from "../videoActionTypes";

export const WatchLater = () => {
  const { state, dispatch } = useVideo();
  const navigate = useNavigate();
  useEffect(async () => {
    const data = await getCall("/api/user/watchlater");
    dispatch({ type: getWatchLaterVideos, payload: data.watchlater });
  }, []);
  const deleteWatchedlaterVideoHandler = async (id) => {
    const data = await deleteCall(`/api/user/watchlater/${id}`);
    dispatch({ type: getWatchLaterVideos, payload: data.watchlater });
  };

  return (
    <Layout>
      <h1>Watch Later</h1>
      <div className="watch-later-videos-container">
        <div>
          {state.watchlaterVideos.map((watchLaterVid) => {
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
