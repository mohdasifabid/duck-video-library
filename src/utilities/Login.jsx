import { getDefaultNormalizer } from "@testing-library/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthProvider } from "./authProvider";
import "./Login.css";
import { Navbar } from "./Navbar";
import { postCall } from "./reusableFunctions";

export const Login = () => {
  const { state, dispatch } = useAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const saveEmailPassword = async () => {
    const data = await postCall("/api/auth/login", {
      email: email,
      password: password,
    });
    dispatch({ type: "LOGIN_STATUS", payload: true });
    localStorage.setItem("encodedToken", data.encodedToken);
    navigate("/");
  };
  const guestLoginHandler = async () => {
    const data = await postCall("/api/auth/login", {
      email: "ducktube@gmail.com",
      password: "duckTube123",
    });
    dispatch({ type: "LOGIN_STATUS", payload: true });
    localStorage.setItem("encodedToken", data.encodedToken);
    navigate("/");
  };
  return (
    <div>
      <Navbar />
      <div className="login-page-body-content">
        <div className="login-inputs-btn-link-container">
          <label htmlFor="duck-email-input-label input-and-labels">
            <div>Email</div>
            <input
              type="email"
              className="duck-email-input duck-inputs"
              placeholder="enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="duck-password-input-label input-and-labels">
            <div>Password</div>
            <input
              type="password"
              className="duck-password-input duck-inputs"
              placeholder="enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="duck-primary-btn-xl duck-primary-btn"
            onClick={saveEmailPassword}
          >
            Login
          </button>
          <button
            className="duck-primary-btn-xl duck-primary-btn"
            onClick={guestLoginHandler}
          >
            Login as Guest
          </button>
          <p>
            Not a user?
            <Link to="/signup">
              <strong>create account</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
