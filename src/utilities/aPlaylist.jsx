import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useVideo } from "../useVideo";
import { Navbar } from "./Navbar";
import "./Playlist.css";
import { VideoCard } from "./VideoCard";

export const Aplaylist = ({ item }) => {
  const { state, dispatch } = useVideo();
  const [playlistData, setPlaylistData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getPlaylistVideosById = async (id) => {
      const token = localStorage.getItem("encodedToken");
      const response = await axios.get(`/api/user/playlists/${id}`, {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        setPlaylistData(response.data.playlist.videos);
      }
    };
    getPlaylistVideosById(id);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="playlist-body">
        <div className="playlist-body-content">
          {playlistData.map((item) => {
            return (
              <p className="playlist-body-content-playlist-name">
                <strong>{item.title}</strong>
                <VideoCard item={item} type="aplaylist" />
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
