import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ActiveVideoCard } from "./ActiveVideoCard";
import { Navbar } from "./Navbar";
import { VideoCard } from "./VideoCard";
import "./VideoPage.css";
import { useState } from "react";
import { useVideo } from "../useVideo";
import { Link } from "react-router-dom";
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
        <ol className="duck-list-content-type">
          <Link
            to="/"
            className="landing-page-body-links duck-list-content-type-items"
          >
            <div className="duck-link-avatar-polygon-type">
              <i className="fa-solid fa-house-chimney"></i>
            </div>
            Home
          </Link>
          <Link
            to="/playlist"
            className="landing-page-body-links duck-list-content-type-items"
          >
            <div className="duck-link-avatar-polygon-type">
              <i className="fa-solid fa-list"></i>
            </div>
            Playlist
          </Link>
          <Link
            to="/liked"
            className="landing-page-body-links duck-list-content-type-items"
          >
            <div className="duck-link-avatar-polygon-type">
              <i className="fa-solid fa-thumbs-up"></i>
            </div>
            Liked
          </Link>
          <Link
            to="/watch-later"
            className="landing-page-body-links duck-list-content-type-items"
          >
            <div className="duck-link-avatar-polygon-type">
              <i className="fa-regular fa-clock"></i>
            </div>
            Later
          </Link>
          <Link
            to="/history"
            className="landing-page-body-links duck-list-content-type-items"
          >
            <div className="duck-link-avatar-polygon-type">
              <i className="fa-solid fa-rotate-left"></i>
            </div>
            History
          </Link>
        </ol>
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
