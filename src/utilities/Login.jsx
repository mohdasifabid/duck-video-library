import "./Login.css";
import { useState } from "react";
import { postCall } from "./reusableFunctions";
import { useAuthProvider } from "./authProvider";
import { getCurrentUser, getLoginStatus } from "../authActionTypes";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { dispatch: authDispatch } = useAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const saveEmailPassword = async () => {
    const data = await postCall("/api/auth/login", {
      email: email,
      password: password,
    });
    authDispatch({ type: getLoginStatus, payload: true });
    localStorage.setItem("encodedToken", data.encodedToken);
    navigate("/");
  };
  const guestLoginHandler = async () => {
    const data = await postCall("/api/auth/login", {
      email: "ducktube@gmail.com",
      password: "duckTube123",
    });
    authDispatch({ type: getLoginStatus, payload: true });
    localStorage.setItem("encodedToken", data.encodedToken);
    navigate("/");
    authDispatch({ type: getCurrentUser, payload: data.foundUser });
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
