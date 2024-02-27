import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { newPasswordApi } from "../../Api/LoginApi";

const Changepassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  // const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const Email = searchParams.get("email");
    setEmail(Email);
    const Token = searchParams.get("token");
    setToken(Token);
  }, [location.search]);

  const submitNewPassword = async () => {
    if (password === newPassword) {
      try {
        await newPasswordApi({ email, token, newPassword });
        setMessage("Password updated successfully");
        setTimeout(() => {
          // history.push("/");
        }, 2000); // Redirect to login page after 2 seconds
      } catch (err) {
        console.log("new pass err", err);
      }
    }
  };

  return (
    <div className="reset-password-p">
      <div className="reset-password-c">
        <form onSubmit={submitNewPassword}>
          <div>
            <h2>Reset Password</h2>
            <div className="newpass">
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Changepassword;
