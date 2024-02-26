import React, { useState } from "react";

const Changepassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const submitNewPassword = () => {
    console.log("password", password);
    console.log("password", newPassword);
    if(password == newPassword){
        try{
            console.log('new password sent');
        }catch(err){
            console.log('new pass err',err);
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
      </div>
    </div>
  );
};

export default Changepassword;
