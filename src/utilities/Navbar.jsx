import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import "./Navbar.css";
import { setAuthentication } from "../features.js/authSlice";

export const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state)=> state.authState.isAuthenticated)
  const dispatch = useDispatch()

  return (
    <div className="duck-navbar-container">
      <Link className="duck-navbar-item duck-nav-brand" to="/">
        MyBrand
      </Link>
      {isAuthenticated ? (
        <span
          className="duck-navbar-item"
          onClick={() => {
            dispatch(setAuthentication(false));
            localStorage.removeItem("encodedToken");
            navigate("/login");
          }}
        >
         Logout
        </span>
      ) : (
        <span
          className="duck-navbar-item user-icon-container"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      )}
    </div>
  );
};
