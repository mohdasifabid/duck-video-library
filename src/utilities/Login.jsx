import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthProvider } from "./authProvider";
import "./Login.css";
import { Navbar } from "./Navbar";

export const Login = () => {
  const { state, dispatch } = useAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const saveEmailPassword = async () => {
    const response = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      dispatch({ type: "LOGIN_STATUS", payload: true });
      localStorage.setItem("encodedToken", response.data.encodedToken);
      navigate("/trending");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="login-page-body-content">
        <div className="login-inputs-btn-link-container">
          <label for="duck-email-input-label input-and-labels">
            <div>Email</div>
            <input
              type="email"
              className="duck-email-input duck-inputs"
              placeholder="enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label for="duck-password-input-label input-and-labels">
            <div>Password</div>
            <input
              type="password"
              className="duck-password-input duck-inputs"
              placeholder="enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="duck-primary-btn-s duck-primary-btn"
            onClick={saveEmailPassword}
          >
            Login
          </button>
          <p>
            Not a user?
            <Link to="/signup">
              <a href="">
                <strong>create account</strong>
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
