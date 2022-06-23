import "./Playlist.css";
import { Layout } from "./Layout";
import { useEffect } from "react";
import { useVideo } from "../useVideo";
import { useNavigate } from "react-router-dom";
import { deleteCall, getCall } from "./reusableFunctions";
import { getPlaylists } from "../videoActionTypes";

export const Playlist = () => {
  const { state, dispatch } = useVideo();
  const navigate = useNavigate();
  useEffect(async () => {
    const data = await getCall("/api/user/playlists");
    dispatch({ type: getPlaylists, payload: data.playlists });
  }, []);

  const deletePlaylistHandler = async (id) => {
    const data = await deleteCall(`/api/user/playlists/${id}`);
    dispatch({ type: getPlaylists, payload: data.playlists });
  };
  return (
    <Layout>
      <div className="playlist-heading-clear-btn-container">
        <h2>Playlist</h2>
        <button className=" playlist-clear-btn duck-primary-btn-s duck-primary-btn">
          Clear Playlist
        </button>
      </div>
      {state.playlist.map((item) => {
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
