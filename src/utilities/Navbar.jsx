import { Link, useNavigate } from "react-router-dom";
import { getLoginStatus } from "../authActionTypes";
import { useAuthProvider } from "./authProvider";
import "./Navbar.css";
export const Navbar = () => {
  const { state, dispatch } = useAuthProvider();
  const navigate = useNavigate();
  return (
    <div className="duck-navbar-container">
      <Link className="duck-navbar-item duck-nav-brand" to="/">
        MyBrand
      </Link>
      {state.isLogin ? (
        <span
          className="duck-navbar-item"
          onClick={() => {
            dispatch({ type: getLoginStatus, payload: false });
            localStorage.removeItem("encodedToken");
            navigate("/login");
          }}
        >
          <i className="fa-solid fa-user"></i>
          <span className="current-user-name-container">
            {state.currentUser.firstName + " " + state.currentUser.lastName}
          </span>
        </span>
      ) : (
        <span
          className="duck-navbar-item user-icon-container"
          onClick={() => navigate("/login")}
        >
          <i className="fa-regular fa-user"></i>
        </span>
      )}
    </div>
  );
};
