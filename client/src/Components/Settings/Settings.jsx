import React from "react";
import './Settings.css'
import { NavLink } from "react-router-dom";
const Settings = ({userId}) => {
  console.log('userid',userId);
  return (
    <div className="settings-p">
      <div className="settings-c">
       <NavLink to={`updateProfile/${userId}`}> <button>Update My Profile Information</button></NavLink>
       <NavLink to={`UploadPrfilePic/${userId}`}> <button>Upload New Profile Picture</button></NavLink>
       <NavLink to={`Uploadheader/${userId}`}><button>Upload New Header Image</button></NavLink>
       <NavLink to={`changepassword/${userId}`}><button>Change Password</button></NavLink>
      </div>
    </div>
  );
};

export default Settings;
