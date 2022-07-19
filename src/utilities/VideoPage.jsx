import "./VideoPage.css";
import { Layout } from "./Layout";
import { VideoCard } from "./VideoCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCall } from "./reusableFunctions";
import { ActiveVideoCard } from "./ActiveVideoCard";
import { useSelector } from "react-redux";

export const VideoPage = () => {
  const [video, setVideo] = useState({});
  const { id } = useParams();
  const videos = useSelector((state) => state.videoState.videos);
  useEffect(async () => {
    const data = await getCall(`/api/video/${id}`);
    setVideo(data.video);
  }, [id]);

  const excludePlayingVideoFromVideos = videos.filter(
    (vid) => vid.vLink !== video.vLink
  );

  return (
    <Layout>
      <div className="vPage-container">
        <div className="video-page-body-content-left-side">
          <ActiveVideoCard item={video} />
        </div>
        <div className="video-page-body-content-right-side">
          {excludePlayingVideoFromVideos.map((item) => {
            return <VideoCard item={item} key={item._id} />;
          })}
        </div>
      </div>
    </Layout>
  );
};
