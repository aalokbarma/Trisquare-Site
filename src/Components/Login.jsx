import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/Login.css";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import reducer from '../reducer'

function Login() {
  const dispatch = useDispatch(reducer)
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      }).then(() => {
        dispatch({
          type: "login Success",
        })
      })
      .catch((error) => alert(error.message));
    setEmail("");
    setPassword("");
  };
  return (
    <div className="login">
      <p id="timers">
        <span className="spans" id="timer-days"></span>
        <span className="spans" id="timer-hours"></span>
        <span className="spans" id="timer-mins"></span>
        <span className="spans" id="timer-secs"></span>
      </p>
      <div className="login__container">
        <h1 className="login__heading">Log in with Trisquare</h1>
        <form className="login__form">
          <input
            className="login__input"
            type="email"
            placeholder="Type your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login__input"
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login__SubmitButton"
            type="submit"
            onClick={signin}
          >
            Log In
          </button>
        </form>
        <div className = "resetButtonContainer">
          <p className="login__para">
            Trouble Logging in?{" "}
            <Link className="login__resetPassword" to="/forgotPassword">
              Reset Password
            </Link>
          </p>
        </div>
        <div className="login__emptyDiv"></div>
        <h5 className="login__bottom">
          Not a user?
          <Link className="login__resetPassword link" to="/signup">
            Sign Up
          </Link>
        </h5>
      </div>
    </div>
  );
}
export default Login;