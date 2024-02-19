import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../Notifications/Notifications.css";
import { MdOutlineDeleteOutline } from "react-icons/md";
// import Friendreq from '../Friendrequests/Friendreq';
import {
  deleteNotificationApi,
  notificationData,
} from "../../Api/NotificationApi";
const Notifications = () => {
  const [notification, setNotification] = useState();
  const userData = useSelector((state) => state.userDetails.userInfo[0]);
  if (userData) {
    var userId = userData._id;
  }

  const deleteNoti = async (notiId) => {
    try {
      await deleteNotificationApi(notiId);
      console.log("notification deleted");
      window.location.reload();
    } catch (err) {
      console.log("err in delete notification jsx", err);
    }
  };

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        var fetchedN = await notificationData(userId);
        setNotification(fetchedN);
        console.log("notification data fetched", fetchedN);
      } catch (err) {
        console.log("error in notification fetching", err);
      }
    };
    fetchNotification();
  }, []);

  return (
    <div className="notifiction-p">
      {notification ? (
        notification.map((noti) => (
          <div className="notification" key={noti._id}>
            <div
              className="noti-delete-icon"
              onClick={() => deleteNoti(noti._id)}
            >
              <MdOutlineDeleteOutline />
            </div>
            <h6>{noti.content} </h6>
          </div>
        ))
      ) : (
        <h2>loading notifications</h2>
      )}
    </div>
  );
};

export default Notifications;
