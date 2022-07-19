import "./Login.css";
import { useState } from "react";
import { postCall } from "./reusableFunctions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthentication } from "../features.js/authSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const saveEmailPassword = async () => {
    const data = await postCall("/api/auth/login", {
      email: email,
      password: password,
    });
    dispatch(setAuthentication(true))
    localStorage.setItem("encodedToken", data.encodedToken);
    localStorage.setItem("currentUser", JSON.stringify(data.foundUser));
    navigate("/");
  };
  const guestLoginHandler = async () => {
    const data = await postCall("/api/auth/login", {
      email: "ducktube@gmail.com",
      password: "duckTube123",
    });
    dispatch(setAuthentication(true))
    localStorage.setItem("encodedToken", data.encodedToken);
    localStorage.setItem("currentUser", JSON.stringify(data.foundUser));
    navigate("/");
  };
  return (
    <div className="login-page-body-content">
      <div className="login-inputs-btn-link-container">
        <div>Email</div>
        <input
          type="email"
          placeholder="enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>Password</div>
        <input
          type="password"
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {email.length > 1 && password.length > 1 ? (
          <button className="loginBtn" onClick={saveEmailPassword}>
            Login
          </button>
        ) : (
          <button className="loginBtn" onClick={saveEmailPassword} disabled>
            Login
          </button>
        )}
        <button onClick={guestLoginHandler}>Login as Guest</button>
        <p>
          Not a user?
          <a onClick={() => navigate("/signup")}>create account</a>
        </p>
      </div>
    </div>
  );
};
