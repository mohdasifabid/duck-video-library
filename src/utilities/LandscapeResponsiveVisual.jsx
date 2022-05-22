import { Link } from "react-router-dom";
import "./LandscapeResponsiveVisual.css";

export const LandscapeResponsiveVisual = () => {
  return (
    <div className="lrv-container">
      <img
        className="lrv-media"
        src="https://images.unsplash.com/photo-1501883425835-ec109bee0a61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt=""
      />
      <div className="lrv-text-content">
        <p>
          <strong> Hurre! Videos</strong>{" "}
        </p>
        <p className="lrv-text-content-bold">Explore unlimited cool videos</p>
      </div>

      <Link to="/trending">
        <button
          style={{
            height: ".75rem",
            margin: ".4rem 1rem ",
            border: "none",
          }}
          className="lrv-btn duck-primary-btn-s duck-primary-btn"
        >
          Watch Now
        </button>
      </Link>
    </div>
  );
};
