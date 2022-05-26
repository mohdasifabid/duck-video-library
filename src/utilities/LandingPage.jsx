import "./LandingPage.css";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import { LandscapeResponsiveVisual } from "./LandscapeResponsiveVisual";

export const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="landing-page-body-container">
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
            to="/trending"
            className="landing-page-body-links duck-list-content-type-items"
          >
            <div className="duck-link-avatar-polygon-type">
              <i className="fa-brands fa-gripfire"></i>
            </div>
            Trending
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
        <div className="landing-page-media-container">
          <LandscapeResponsiveVisual />
        </div>
      </div>
    </div>
  );
};
