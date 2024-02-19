import React, { useState } from "react";
import "../Account/Signup.css";
import { SignUpData } from "../Api/SignupApi";
import { Link } from "react-router-dom";
const Signup = () => {
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  // const [Dob,setDob] = useState('');
  const [Password, setPassword] = useState("");

  const submitData = () => {
    SignUpData({ Firstname, Lastname, Email, Password });
  };

  return (
    <div className="wra">
      <div className="signup-page">
        <div className="signup-box">
          <form onSubmit={submitData}>
            <div>
              <h2 className="h2-sign">Sign Up</h2>
              <div className="signup-input-box">
                <input
                  type="text"
                  className="input-signup"
                  required
                  value={Firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
                <label className="label-signup">Firstname</label>
              </div>
              <div className="signup-input-box">
                <input
                  type="text"
                  className="input-signup"
                  required
                  value={Lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
                <label className="label-signup">Lastname</label>
              </div>
              <div className="signup-input-box">
                <input
                  type="email"
                  className="input-signup"
                  required
                  value={Email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label className="label-signup">Email</label>
              </div>
              {/* <div className="signup-input-box">
                        <input type="date" id='date-ip' className='input-signup' required value={Dob} onChange={(e)=>{setDob(e.target.value)}}/>
                        <label className='label-signup'>Date of Birth</label>
                    </div> */}
              <div className="signup-input-box">
                <input
                  type="password"
                  className="input-signup"
                  required
                  value={Password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label className="label-signup">Password</label>
              </div>
              <button type="submit" className="signup-button">
                Sign Up
              </button>
              <div className="register-link">
                <p>
                  Already have an account? <Link to={"/"}>Login</Link>
                </p> 
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
