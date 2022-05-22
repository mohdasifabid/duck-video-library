import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ActiveVideoCard } from "./ActiveVideoCard";
import { Navbar } from "./Navbar";
import { VideoCard } from "./VideoCard";
import "./VideoPage.css";
import axios from "axios";
import { useState } from "react";
import { useVideo } from "../useVideo";

export const VideoPage = () => {
  const [video, setVideo] = useState({});
  const { state } = useVideo();
  const { id } = useParams();
  useEffect(() => {
    const getVideo = async (id) => {
      const token = localStorage.getItem("encodedToken");
      const response = await axios.get(`/api/video/${id}`, {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        setVideo(response.data.video);
      }
    };
    getVideo(id);
  }, [id]);

  const excludePlayingVideoFromVideos = state.videos.filter(
    (vid) => vid.vLink !== video.vLink
  );

  return (
    <div>
      <Navbar />
      <div className="video-page-body">
        <div className="video-page-body-content-left-side">
          <ActiveVideoCard item={video} />
        </div>
        <div className="video-page-body-content-right-side">
          {excludePlayingVideoFromVideos.map((item) => {
            return <VideoCard item={item} key={item._id} />;
          })}
        </div>
      </div>
    </div>
  );
};
