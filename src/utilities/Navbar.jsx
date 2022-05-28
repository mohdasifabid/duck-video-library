import { Link } from "react-router-dom";
import { useAuthProvider } from "./authProvider";
import "./Navbar.css";
export const Navbar = () => {
  const { state, dispatch } = useAuthProvider();
  return (
    <div className="duck-navbar-container">
      <Link className="duck-navbar-item duck-nav-brand" to="/">
        MyBrand
      </Link>
      {state.isLogin ? (
        <Link
          to="/landing-page"
          className="duck-navbar-item"
          onClick={() => {
            dispatch({ type: "LOGIN_STATUS", payload: false });
            localStorage.removeItem("encodedToken");
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
