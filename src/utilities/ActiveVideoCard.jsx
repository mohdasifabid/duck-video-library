import "./ActiveVideoCard.css";
import { useVideo } from "../useVideo";
import { useEffect, useState } from "react";
import { deleteCall, getCall, postCall } from "./reusableFunctions";
import {
  getPlaylists,
  getWatchLaterVideos,
} from "../videoActionTypes";
import {useDispatch,useSelector} from "react-redux"
import { setLikedVideos } from "../features.js/userActivitySlice";

export const ActiveVideoCard = ({ item }) => {
  const { state, dispatch } = useVideo();
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState({});
  const reduxDispatch = useDispatch()
  const likedVideos = useSelector(state=>state.activityState.likedVideos)

  useEffect(async () => {
    const data = await getCall(`/api/user/playlists`);
    dispatch({ type: getPlaylists, payload: data.playlists });
  }, []);

  const postLikedVideo = async (likedVideo) => {
    const data = await postCall("/api/user/likes", {
      video: likedVideo,
    });
    reduxDispatch(setLikedVideos(data.likes))
  };
  const deleteDislikedVideo = async (dislikedVideo) => {
    const data = await deleteCall(`/api/user/likes/${dislikedVideo._id}`);
    reduxDispatch(setLikedVideos(data.likes))
  };

  const postPlaylist = async (item) => {
    const data = await postCall(`/api/user/playlists`, {
      playlist: {
        title: playlistName,
      },
    });

    const foundPlaylist = data.playlists.find(
      (plist) => plist.title === playlistName
    );

    const videoData = await postCall(
      `/api/user/playlists/${foundPlaylist._id}`,
      {
        video: item,
      }
    );
  };

  const postWatchlaterVideo = async (watchlaterVideo) => {
    const data = await postCall("/api/user/watchlater", {
      video: watchlaterVideo,
    });
    dispatch({ type: getWatchLaterVideos, payload: data.watchlater });
  };

  const deleteFromWatchLaterHandler = async (id) => {
    const data = await deleteCall(`/api/user/watchlater/${id}`);
    dispatch({ type: getWatchLaterVideos, payload: data.watchlater });
  };

  const inLikedVideos = likedVideos.some((vid) => vid._id === item._id);
  const inWatchlaterVideos = state.watchlaterVideos.some(
    (vid) => vid._id === item._id
  );
  return (
    <div className="active-video-card-container">
      <iframe
        className="active-video-card-media"
        src={`https://youtube.com/embed/${item.vLink}`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />

      <div
        className="active-video-card-bottom-content"
        style={{ position: "relative" }}
      >
        <div className="activ-video-card-icons-container">
          {inLikedVideos ? (
            <span
              className="active-video-card-icons-and-tags"
              onClick={() => {
                deleteDislikedVideo(item);
              }}
            >
              <i className="fa-regular fa-thumbs-down"></i>
            </span>
          ) : (
            <span
              className="active-video-card-icons-and-tags"
              onClick={() => {
                postLikedVideo(item);
              }}
            >
              <i className="fa-regular fa-thumbs-up"></i>
            </span>
          )}
          {/* watchlater section */}
          {inWatchlaterVideos ? (
            <span
              className="active-video-card-icons-and-tags"
              onClick={() => deleteFromWatchLaterHandler(item._id)}
            >
              <i className="fa-solid fa-heart"></i>
              Watch Later
            </span>
          ) : (
            <span
              className="active-video-card-icons-and-tags"
              onClick={() => {
                postWatchlaterVideo(item);
              }}
            >
              <i className="fa-regular fa-heart"></i>
              Watch Later
            </span>
          )}
          <span className="active-video-card-icons-and-tags">
            <i
              className="fa-solid fa-list"
              onClick={() => setCreatingPlaylist(true)}
            ></i>{" "}
            Add to Playlist
          </span>
        </div>
        <div className="active-video-card-bottom-content-right-side">
          <span className="active-video-card-views">123k Views</span>
          <span className="active-video-card-release-time">7 hour ago</span>
        </div>
      </div>
      <div className="active-video-card-description-container">
        <p className="active-video-card-description-title">
          <strong>Description</strong>
        </p>
        <p className="active-video-card-description-content">
          {" "}
          {item.description}
        </p>
      </div>
      {/* creating playlist */}
      {creatingPlaylist ? (
        <div
          className="duck-modal-container"
          style={{
            position: "absolute",
            left: "-12rem",
            bottom: "1rem",
            backgroundColor: "#fff",
          }}
        >
          <div className="duck-modal">
            {state.playlist.length > 0
              ? state.playlist.map((playlist) => {
                  console.log(playlist);
                  return (
                    <a
                      key={playlist._id}
                      value={playlist._id}
                      onClick={() => {
                        setSelectedPlaylist(playlist);
                        setPlaylistName(playlist.title);
                      }}
                    >
                      {playlist.title}
                    </a>
                  );
                })
              : null}

            <label htmlFor="email" className="duck-modal-email-label">
              Create playlist
              <input
                value={selectedPlaylist.title}
                type="text"
                className="duck-modal-email-input"
                placeholder="create new playlist"
                onChange={(e) => setPlaylistName(e.target.value)}
              />
            </label>
            <button
              className="duck-modal-button"
              onClick={() => {
                setCreatingPlaylist(false);
                postPlaylist(item);
                setPlaylistName("");
              }}
            >
              Create
            </button>
            <span>
              <i
                className="fa-solid fa-xmark"
                onClick={() => setCreatingPlaylist(false)}
              ></i>
            </span>
          </div>
        </div>
      ) : (
        <div
          className="duck-modal-container"
          style={{
            position: "absolute",
            left: "-12rem",
            bottom: "1rem",
            display: "none",
          }}
        >
          <div className="duck-modal">
            <label htmlFor="email" className="duck-modal-email-label">
              Name your playlist
              <input
                type="text"
                className="duck-modal-email-input"
                placeholder="create new playlist"
                onChange={(e) => setPlaylistName(e.target.value)}
              />
            </label>
            <button className="duck-modal-button">Create</button>
            <span>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
