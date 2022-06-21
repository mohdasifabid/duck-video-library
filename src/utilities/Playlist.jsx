import "./Playlist.css";
import { Layout } from "./Layout";
import { useEffect } from "react";
import { useVideo } from "../useVideo";
import { Link } from "react-router-dom";
import { getCall } from "./reusableFunctions";
import { getPlaylists } from "./videoActionTypes";

export const Playlist = () => {
  const { state, dispatch } = useVideo();
  useEffect(async () => {
    const data = await getCall("/api/user/playlists");
    dispatch({ type: getPlaylists, payload: data.playlists });
  }, []);

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
          <div className="playlist-body-content" key={item._id}>
            <Link to={`/playlist/${item._id}`}>
              <p className="playlist-body-content-playlist-name">
                <strong>{item.title}</strong>
              </p>
            </Link>
          </div>
        );
      })}
    </Layout>
  );
};
