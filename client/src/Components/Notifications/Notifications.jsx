import React from "react";
import '../Notifications/Notifications.css'
import { MdOutlineDeleteOutline } from "react-icons/md";
const Notifications = () => {
  return (
    <div className="notifiction-p">
      <div className="notification">
        <div className="noti-delete-icon">
          <MdOutlineDeleteOutline />
        </div>
        <h6>content </h6>
      </div>
    </div>
  );
};

export default Notifications;
