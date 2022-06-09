import { Link, useNavigate } from "react-router-dom";
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
        <Link
          to="/login"
          className="duck-navbar-item"
          onClick={() => {
            dispatch({ type: "LOGIN_STATUS", payload: false });
            localStorage.removeItem("encodedToken");
            navigate("/login");
          }}
        >
          Logout
        </Link>
      ) : (
        <Link to="/login" className="duck-navbar-item">
          Login
        </Link>
      )}
    </div>
  );
};
