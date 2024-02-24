import React from "react";
import './Settings.css'
import { NavLink } from "react-router-dom";
const Settings = () => {
  return (
    <div className="settings-p">
      <div className="settings-c">
       <NavLink to={'updateProfile'}> <button>Update My Profile Information</button></NavLink>
       <NavLink to={'UploadPrfilePic'}> <button>Upload New Profile Picture</button></NavLink>
       <NavLink to={'Uploadheader'}><button>Upload New Header Image</button></NavLink>
       <NavLink to={'changepassword'}><button>Change Password</button></NavLink>
      </div>
    </div>
  );
};

export default Settings;
