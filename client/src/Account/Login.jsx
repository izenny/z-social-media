import React, { useState } from "react";
import "../Account/Login.css";
import { LoginData } from "../Api/LoginApi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const Dispatch = useDispatch();
  const submitData = () => {
    try {
      LoginData(Dispatch, { Email, Password });
    } catch (err) {
      console.log("login submit error", err);
    }
  };
  return (
    <div className="login-p">
      <div className="login-input">
        <h2 className="h2-login">Login</h2>

        <div className="input-name">
          {/* <form > */}
          <div>
            <div className="input-box">
              <input
                type="text"
                className="input-login"
                required
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="label-login">Email </label>
            </div>
            <div className="input-box">
              <input
                type="password"
                className="input-login"
                required
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label className="label-login">Password </label>
            </div>
            <div className="remember-forgot">
              <label className="label-login">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" onClick={submitData}>
              Login
            </button>
            <div className="register-link">
              <p>
                Don't have an account? <Link to={"/signup"}>Register</Link>
              </p>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
