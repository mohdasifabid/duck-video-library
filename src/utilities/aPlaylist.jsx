import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./Navbar";
import "./Playlist.css";
import { VideoCard } from "./VideoCard";
import { getCall } from "./reusableFunctions";

export const Aplaylist = ({ item }) => {
  const [playlistData, setPlaylistData] = useState([]);
  const { id } = useParams();
  useEffect(async() => {
    const newdata = await getCall(`/api/user/playlists/${id}`)
    setPlaylistData(newdata.playlist.videos)
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
