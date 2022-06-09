import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ActiveVideoCard } from "./ActiveVideoCard";
import { Navbar } from "./Navbar";
import { VideoCard } from "./VideoCard";
import "./VideoPage.css";
import { useState } from "react";
import { useVideo } from "../useVideo";
import { getCall } from "./reusableFunctions";

export const VideoPage = () => {
  const [video, setVideo] = useState({});
  const { state } = useVideo();
  const { id } = useParams();
  useEffect(async () => {
    const data = await getCall(`/api/video/${id}`);
    setVideo(data.video);
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
