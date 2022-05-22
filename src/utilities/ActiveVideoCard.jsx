import axios from "axios";
// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useVideo } from "../useVideo";
import "./ActiveVideoCard.css";

export const ActiveVideoCard = ({ item }) => {
  const { state, dispatch } = useVideo();
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState(0);
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const postLikedVideo = async (likedVideo) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      "/api/user/likes",
      {
        video: likedVideo,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 201) {
      setLikes(response.data.likes.length);
    }
  };
  const deleteDislikedVideo = async (dislikedVideo) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.delete(
      `/api/user/likes/${dislikedVideo._id}`,
      {
        headers: {
          authorization: token,
        },
        data: {
          video: dislikedVideo,
        },
      }
    );
  };
  const postWatchlaterVideo = async (watchlaterVideo) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      "/api/user/watchlater",
      {
        video: watchlaterVideo,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  };
  const postPlaylist = async () => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      "/api/user/playlists",
      {
        playlist: {
          title: playlistName,
        },
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 201) {
      const postPlaylistWithId = async (itemId) => {
        const token = localStorage.getItem("encodedToken");
        const response = await axios.post(
          `/api/user/playlists/${itemId}`,
          {
            video: item,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
      };
      postPlaylistWithId(response.data.playlist._id);

      const getPlaylistVideos = async () => {
        const token = localStorage.getItem("encodedToken");
        const response = await axios.get("/api/user/playlists", {
          headers: {
            authorization: token,
          },
        });
        if (response.status === 200) {
          dispatch({ type: "GET_PLAYLISTS", payload: response.data.playlists });
        }
      };
      getPlaylistVideos();
    }
  };
  const postPlaylistWithId = async (itemId) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      `/api/user/playlists/${itemId}`,
      {
        video: item,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    const getPlaylistVideos = async () => {
      const token = localStorage.getItem("encodedToken");
      const response = await axios.get("/api/user/playlists", {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        dispatch({ type: "GET_PLAYLISTS", payload: response.data.playlists });
      }
    };
    getPlaylistVideos();
  };
  return (
    <div className="active-video-card-container">
      <p className="active-video-card-title">
        <strong>{item.title}</strong>
      </p>

      <p className="active-video-card-sub-title">{item.creator}</p>
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
          <span className="active-video-card-icons-and-tags">
            <i
              className="fa-solid fa-thumbs-up"
              onClick={() => {
                postLikedVideo(item);
              }}
            ></i>
            {likes}
          </span>
          <span className="active-video-card-icons-and-tags">
            <i
              className="fa-solid fa-thumbs-down"
              onClick={() => {
                deleteDislikedVideo(item);
                setDislikes(dislikes + 1);
              }}
            ></i>{" "}
            {dislikes}
          </span>
          <span className="active-video-card-icons-and-tags">
            <i
              className="fa-solid fa-heart"
              onClick={() => postWatchlaterVideo(item)}
            ></i>
            Watch Later
          </span>
          {/* <Link to="/create-playlist"> */}
          <span className="active-video-card-icons-and-tags">
            <i
              className="fa-solid fa-list"
              onClick={() => setCreatingPlaylist(true)}
            ></i>{" "}
            Add to Playlist
          </span>
          {/* </Link> */}
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
      {creatingPlaylist ? (
        <div
          className="duck-modal-container"
          style={{
            position: "absolute",
            left: "-12rem",
            bottom: "1rem",
          }}
        >
          <div className="duck-modal">
            {state.playlists.length > 0
              ? state.playlists.map((playlist) => {
                  return (
                    <li onClick={() => postPlaylistWithId(playlist._id)}>
                      {playlist.title}
                    </li>
                  );
                })
              : null}

            <label for="email" className="duck-modal-email-label">
              Create playlist
              <input
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
                postPlaylist();
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
            <label for="email" className="duck-modal-email-label">
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
