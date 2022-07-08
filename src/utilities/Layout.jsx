import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <ol className="mobile-navigation">
        <Link
          to="/"
          className="landing-page-body-links duck-list-content-type-items"
        >
          <div className="duck-link-avatar-polygon-type">
            <i className="fa-solid fa-house-chimney"></i>
          </div>
        </Link>
        <Link
          to="/playlist"
          className="landing-page-body-links duck-list-content-type-items"
        >
          <div className="duck-link-avatar-polygon-type">
            <i className="fa-solid fa-list"></i>
          </div>
        </Link>
        <Link
          to="/liked"
          className="landing-page-body-links duck-list-content-type-items"
        >
          <div className="duck-link-avatar-polygon-type">
            <i className="fa-solid fa-thumbs-up"></i>
          </div>
        </Link>
        <Link
          to="/watch-later"
          className="landing-page-body-links duck-list-content-type-items"
        >
          <div className="duck-link-avatar-polygon-type">
            <i className="fa-regular fa-clock"></i>
          </div>
        </Link>
        <Link
          to="/history"
          className="landing-page-body-links duck-list-content-type-items"
        >
          <div className="duck-link-avatar-polygon-type">
            <i className="fa-solid fa-rotate-left"></i>
          </div>
        </Link>
      </ol>
      <div className="common-container">
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
        <div className="child-container">{children}</div>
      </div>
    </div>
  );
};
