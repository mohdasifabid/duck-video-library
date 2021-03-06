import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "./authProvider";
import { getSignUpStatus } from "../authActionTypes";

export const Signup = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthProvider();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const saveNewUserInfo = async () => {
    const response = await axios.post("/api/auth/signup", {
      firstName: name,
      lastName: "",
      email: email,
      password: password,
      confirmedPassword: confirmedPassword,
    });
    if (response.status === 200) {
      dispatch({ type: getSignUpStatus, payload: true });
    } else {
      dispatch({ type: getSignUpStatus, payload: true });
    }
    navigate("/login");
  };

  return (
    <div className="login-page-body-content">
      <div className="login-inputs-btn-link-container">
        <div>Name</div>
        <input
          type="text"
          placeholder="enter your name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <div>Confirm Password</div>
        <input
          type="password"
          placeholder="enter your password again"
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        {name.length > 1 ||
        email.length > 1 ||
        password.length > 1 ||
        confirmedPassword.length > 1 ? (
          <button
            onClick={() => {
              saveNewUserInfo();
            }}
          >
            Signup
          </button>
        ) : (
          <button
            disabled
            onClick={() => {
              saveNewUserInfo();
            }}
          >
            Signup
          </button>
        )}
        <p>
          Already a user?
          <a href="" onClick={() => navigate("/login")}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};
