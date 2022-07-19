import "./Playlist.css";
import { Layout } from "./Layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCall, getCall } from "./reusableFunctions";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "../features.js/userActivitySlice";

export const Playlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.activityState.playlist);
  useEffect(async () => {
    const data = await getCall("/api/user/playlists");
    dispatch(setPlaylist(data.playlists));
  }, []);

  const deletePlaylistHandler = async (id) => {
    const data = await deleteCall(`/api/user/playlists/${id}`);
    dispatch(setPlaylist(data.playlists));
  };
  return (
    <Layout>
      <div className="playlist-heading-clear-btn-container">
        <h2>Playlist</h2>
      </div>
      {playlist?.map((item) => {
        return (
          <div className="list" key={item._id}>
            <li onClick={() => navigate(`/playlist/${item._id}`)}>
              {item.title}
            </li>
            <span>
              <i
                className="fa-solid fa-trash"
                onClick={() => deletePlaylistHandler(item._id)}
              ></i>
            </span>
          </div>
        );
      })}
    </Layout>
  );
};
